/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

import { NextRequest, NextResponse } from 'next/server';

import {
    ElevenLabsAPI,
    type Voice, type TextToSpeechRequest
} from '@/app/services/elevenlabs';

const elevenlabs = new ElevenLabsAPI();

type VoicesResponse = {
    voices: Voice[];
};

type ErrorResponse = {
    error: string;
};

export async function GET(): Promise<NextResponse<VoicesResponse | ErrorResponse>> {
    try {
        const voices = await elevenlabs.getVoices();
        return NextResponse.json({ voices });
    } catch (error) {
        console.error('Error fetching voices:', error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'Failed to fetch voices' 
        }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest
): Promise<NextResponse<Buffer | ErrorResponse>> {
    try {
        const body: TextToSpeechRequest = await request.json();
        const { text, voice_id, model_id, voice_settings } = body;

        if (!text || !voice_id) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const audioBuffer = await elevenlabs.textToSpeech({
            text,
            voice_id,
            model_id,
            voice_settings
        });

        // Create response with proper headers for audio data
        const response = new NextResponse<Buffer>(audioBuffer);
        response.headers.set('Content-Type', 'audio/mpeg');
        response.headers.set('Content-Length', audioBuffer.length.toString());
        
        return response;
    } catch (error) {
        console.error('Speech generation error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to generate speech' },
            { status: 500 }
        );
    }
}
