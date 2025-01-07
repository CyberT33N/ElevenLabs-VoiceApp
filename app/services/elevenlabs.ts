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
 * 🎯 ElevenLabs API Service
 * This module provides a TypeScript interface for the ElevenLabs Text-to-Speech API.
 * @module ElevenLabsAPI
 */

import axiosRequestWrapper from '@/utils/axiosRequestWrapper'

/**
 * 🎤 Voice Interface
 * Represents a voice model from ElevenLabs API
 * @interface Voice
 */
export interface Voice {
    /** Unique identifier for the voice */
    voice_id: string;
    /** Display name of the voice */
    name: string;
    /** URL to preview the voice */
    preview_url: string;
    /** Category/type of the voice */
    category: string;
}

/**
 * 🔊 Text-to-Speech Request Parameters
 * Configuration options for text-to-speech conversion
 * @interface TextToSpeechRequest
 */
export interface TextToSpeechRequest {
    /** Text content to convert to speech */
    text: string;
    /** ID of the voice to use */
    voice_id: string;
    /** Optional model ID (defaults to eleven_monolingual_v1) */
    model_id?: string;
    /** Optional voice settings for fine-tuning */
    voice_settings?: {
        /** Voice stability (0-1). Higher values make voice more consistent */
        stability: number;
        /** Similarity boost (0-1). Higher values make voice more expressive */
        similarity_boost: number;
    };
}

/**
 * 🔑 API Headers Interface
 * Represents the structure of API request headers
 * @interface ElevenLabsHeaders
 */
export interface ElevenLabsHeaders {
    Accept: 'application/json';
    'xi-api-key': string;
    'Content-Type': 'application/json';
    [key: string]: string;
}

/**
 * 🔧 ElevenLabs API Client
 * Provides methods to interact with the ElevenLabs Text-to-Speech API
 * @class ElevenLabsAPI
 */
export class ElevenLabsAPI {
    private readonly apiKey: string
    private readonly baseURL: string

    /**
     * Creates an instance of ElevenLabsAPI
     */
    constructor() {
        this.apiKey = process.env.ELEVENLABS_API_KEY
        this.baseURL = process.env.ELEVENLABS_API_URL
    }

    /**
     * 🔑 Get default headers for API requests
     * @private
     * @returns {ElevenLabsHeaders} Headers object with API key and content type
     */
    private get headers(): ElevenLabsHeaders {
        return {
            'Accept': 'application/json',
            'xi-api-key': this.apiKey,
            'Content-Type': 'application/json'
        }
    }

    /**
     * 📋 Fetch Available Voices
     * Retrieves a list of all available voices from ElevenLabs
     * @async
     * @returns {Promise<Voice[]>} Array of available voices
     * @throws {HttpClientError} If the API request fails
     */
    async getVoices(): Promise<Voice[]> {
        // Make GET request to voices endpoint
        const response = await axiosRequestWrapper({
            url: `${this.baseURL}/voices`,
            method: 'GET',
            headers: this.headers,
            errorMessage: 'Failed to fetch voices from ElevenLabs API'
        })

        return response.data.voices
    }

    /**
     * 🔄 Convert Text to Speech
     * Converts provided text to speech using specified voice
     * @async
     * @param {TextToSpeechRequest} request - Text and voice configuration
     * @returns {Promise<Buffer>} Audio data as Buffer
     * @throws {HttpClientError} If text-to-speech conversion fails
     */
    async textToSpeech(request: TextToSpeechRequest): Promise<Buffer> {
        const url = `${this.baseURL}/text-to-speech/${request.voice_id}`
        
        // Make POST request to text-to-speech endpoint
        const response = await axiosRequestWrapper({
            url,
            method: 'POST',
            headers: {
                ...this.headers,
                'Accept': 'audio/mpeg'
            },
            payload: {
                text: request.text,
                model_id: request.model_id || 'eleven_monolingual_v1',
                voice_settings: request.voice_settings || {
                    stability: 0.5,
                    similarity_boost: 0.75
                }
            },
            responseType: 'arraybuffer',
            errorMessage: 'Failed to generate speech from ElevenLabs API'
        })

        return Buffer.from(response.data)
    }
}
