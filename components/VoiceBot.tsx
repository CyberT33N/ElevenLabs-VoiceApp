/*
████████████████████████████████████████████████████████████████████████
██ 🎙️ VoiceBot Component                                             ██
██ A React component that provides text-to-speech functionality      ██
██ using the ElevenLabs API                                         ██
████████████████████████████████████████████████████████████████████████
*/

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { MicrophoneIcon } from './icons';

import axiosRequestWrapper from '@/utils/axiosRequestWrapper';
import { BaseError } from 'error-manager-helper';
import { HttpClientError } from 'error-manager-helper';

/**
 * 📋 Interface for Voice data structure
 * @interface Voice
 * @property {string} voice_id - Unique identifier for the voice
 * @property {string} name - Display name of the voice
 * @property {string} preview_url - URL to preview the voice
 * @property {string} category - Category the voice belongs to
 */
interface Voice {
    voice_id: string;
    name: string;
    preview_url: string;
    category: string;
}

/**
 * 🤖 VoiceBot Component
 * @component
 * @description A component that enables text-to-speech conversion using ElevenLabs API
 * 
 * Features:
 * - 🎯 Voice selection from available options
 * - ✍️ Text input for conversion
 * - 🔊 Audio playback of generated speech
 * - 🌓 Theme-aware styling (dark/light mode)
 * - ✨ Smooth animations and transitions
 * 
 * @example
 * ```tsx
 * <VoiceBot />
 * ```
 */
export default function VoiceBot() {
    // 📊 State Management
    const [voices, setVoices] = useState<Voice[]>([]);
    const [text, setText] = useState('');
    const [selectedVoice, setSelectedVoice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAudio, setShowAudio] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { theme } = useTheme();

    // 🔄 Lifecycle Management
    useEffect(() => {
        fetchVoices();
    }, []);

    /**
     * 🎤 Fetches available voices from the API
     * @async
     * @function fetchVoices
     * @throws {BaseError} When API request fails
     */
    const fetchVoices = async () => {
        try {
            const response = await axiosRequestWrapper({
                url: '/api/voice',
                method: 'GET',
                errorMessage: 'Error fetching voices',
            });
    
            if (response.data.error) {
                throw new BaseError(response.data.error);
            }
    
            setVoices(response.data.voices);
        } catch (error) {
            let errorMessage = 'Unknown error';
    
            if (error instanceof HttpClientError) {
                errorMessage = error.data.errorMessage;
            } else if (error instanceof BaseError) {
                errorMessage = error.message;
            }
    
            setError(`Error fetching voices: ${errorMessage}`);
            console.error('Error fetching voices:', error);
        }
    };

    /**
     * 📝 Handles form submission to generate speech
     * @async
     * @function handleSubmit
     * @throws {Error} When API request or audio playback fails
     */
    const handleSubmit = async () => {
        if (!text || !selectedVoice) {
            setError('Please enter text and select a voice');
            return;
        }
    
        setError(null);
        setIsLoading(true);
        
        try {
            const response = await axiosRequestWrapper({
                method: 'POST',
                url: '/api/voice',
                headers: { 'Content-Type': 'application/json' },
                payload: { text, voice_id: selectedVoice },
                responseType: 'arraybuffer',
                errorMessage: 'Failed to generate speech',
            });
    
            const contentType = response.headers['content-type'];
    
            if (!contentType?.includes('audio/mpeg')) {
                throw new Error(`Invalid response type: ${contentType}`);
            }
    
            const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
            if (audioBlob.size === 0) {
                throw new Error('Received empty audio response');
            }
    
            const audioUrl = URL.createObjectURL(audioBlob);
            console.log('Audio URL created:', audioUrl); // Debug log
            
            if (audioRef.current) {
                audioRef.current.src = audioUrl;
                console.log('Setting showAudio to true'); // Debug log
                setShowAudio(true);

                try {
                    await audioRef.current.play();
                } catch (playError) {
                    throw new Error(`Failed to play audio: ${playError instanceof Error ? playError.message : 'Unknown error'}`);
                }
            }
        } catch (error) {
            let errorMessage = 'Unknown error';
    
            if (error instanceof HttpClientError) {
                errorMessage = error.data.errorMessage || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
    
            setError(`Error: ${errorMessage}`);
            console.error('Error generating speech:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const glassStyle = {
        backdropFilter: 'blur(10px)',
        boxShadow: '0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(236, 72, 153, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
        opacity: 0,
        transform: 'translateY(50px) translateZ(0)'
    };

    return (
        <motion.div
            initial={{ ...glassStyle }}
            animate={{
                ...glassStyle,
                opacity: 1,
                transform: 'translateY(0) translateZ(0)'
            }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 1 }}
            className="relative w-full max-w-md mx-auto p-6 rounded-xl"
        >
            <style jsx>{`
                @keyframes draw {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                .draw-animation {
                    stroke-dasharray: 100;
                    stroke-dashoffset: 100;
                    animation: draw 2s ease-in-out forwards;
                }
            `}</style>
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 flex items-center justify-center gap-3">
                AI Voice Generator
                <MicrophoneIcon />
            </h2>

            <div className="space-y-4">
                {/* 🎤 Voice Selection Dropdown */}
                <Select
                    label="Select Voice"
                    placeholder="Choose a voice"
                    value={selectedVoice}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => setSelectedVoice(e.target.value)
                    }
                    className="w-full"
                >
                    {voices.map((voice) => (
                        <SelectItem key={voice.voice_id} value={voice.voice_id}>
                            {voice.name}
                        </SelectItem>
                    ))}
                </Select>

                {/* 📝 Text Input Field */}
                <Input
                    label="Enter Text"
                    placeholder="Type something to convert to speech..."
                    value={text}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)
                    }
                    className="w-full"
                />

                {/* ⚠️ Error Display */}
                {error && (
                    <div className="text-red-500 text-sm mt-2 p-2 rounded bg-red-100/10">
                        {error}
                    </div>
                )}

                {/* 🔄 Submit Button */}
                <Button
                    color="primary"
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                    {isLoading ? 'Generating...' : 'Generate Speech'}
                </Button>

                {/* 🔊 Audio Player */}
                <div className={`transition-all duration-500 ${showAudio ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 hidden'}`}>
                    <audio ref={audioRef} className="w-full mt-4" controls />
                </div>
            </div>
        </motion.div>
    );
}
