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

/**
 * @fileoverview ElevenLabs Voice API Route Handler
 * This module provides REST API endpoints for voice-related operations using the ElevenLabs API.
 * 🎙️ Handles voice listing and text-to-speech conversion
 * 
 * @author t33n Software
 */

import { NextRequest, NextResponse } from 'next/server';

import {
    ElevenLabsAPI,
    type Voice, type TextToSpeechRequest
} from '@/app/services/elevenlabs';

// 🚀 Initialize the ElevenLabs API client
const elevenlabs = new ElevenLabsAPI();

/**
 * @typedef {Object} VoicesResponse
 * @property {Voice[]} voices - Array of available voice objects
 */
type VoicesResponse = {
    voices: Voice[];
};

/**
 * @typedef {Object} ErrorResponse
 * @property {string} error - Error message describing what went wrong
 */
type ErrorResponse = {
    error: string;
};

/**
 * GET endpoint to retrieve available voices from ElevenLabs
 * 📋 Returns a list of all available voices for text-to-speech conversion
 * 
 * @async
 * @function GET
 * @returns {Promise<NextResponse<VoicesResponse | ErrorResponse>>} JSON response containing voices or error
 */
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

/**
 * POST endpoint to convert text to speech using ElevenLabs
 * 🔊 Generates audio from provided text using specified voice and settings
 * 
 * @async
 * @function POST
 * @param {NextRequest} request - The incoming request object containing text and voice settings
 * @returns {Promise<NextResponse<Buffer | ErrorResponse>>} Audio buffer or error response
 * 
 * @example
 * // Request body format:
 * {
 *   "text": "Hello, world!",
 *   "voice_id": "voice-id-here",
 *   "model_id": "optional-model-id",
 *   "voice_settings": { optional voice settings }
 * }
 */
export async function POST(
    request: NextRequest
): Promise<NextResponse<Buffer | ErrorResponse>> {
    try {
        // 📝 Parse the request body
        const body: TextToSpeechRequest = await request.json();
        const { text, voice_id, model_id, voice_settings } = body;

        // ✅ Validate required fields
        if (!text || !voice_id) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 🎵 Generate audio from text
        const audioBuffer = await elevenlabs.textToSpeech({
            text,
            voice_id,
            model_id,
            voice_settings
        });

        // 📦 Create response with proper headers for audio data
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
