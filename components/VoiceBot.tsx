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
import { Textarea } from "@nextui-org/input";
import { Select, SelectItem } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { MicrophoneIcon, DownloadIcon } from './icons';

import axiosRequestWrapper from '@/utils/axiosRequestWrapper';
import { BaseError } from 'error-manager-helper';
import { HttpClientError } from 'error-manager-helper';
import { useLoading } from '@/app/loadingContext';

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
    const [showAnimation, setShowAnimation] = useState(false);
    const [showShadowAnimation, setShowShadowAnimation] = useState(false);
    const [showPulsingAnimation, setShowPulsingAnimation] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [audioData, setAudioData] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { theme } = useTheme();
    const { loading } = useLoading();

    // 🔄 Lifecycle Management
    useEffect(() => {
        if (!loading) {
            // Start animation after loading is complete with a small delay
            const motionTimer = setTimeout(() => {
                setShowAnimation(true);
            }, 100);
            return () => clearTimeout(motionTimer);
        }
    }, [loading]);

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
        setShowAudio(false); // Reset audio state
        
        try {
            console.log('Generating speech...'); // Debug log
            const response = await axiosRequestWrapper({
                method: 'POST',
                url: '/api/voice',
                headers: { 'Content-Type': 'application/json' },
                payload: { text, voice_id: selectedVoice },
                responseType: 'arraybuffer',
                errorMessage: 'Failed to generate speech',
            });
    
            const contentType = response.headers['content-type'];
            console.log('Response content type:', contentType); // Debug log
    
            if (!contentType?.includes('audio/mpeg')) {
                throw new Error(`Invalid response type: ${contentType}`);
            }
    
            const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
            console.log('Audio blob size:', audioBlob.size); // Debug log
            
            if (audioBlob.size === 0) {
                throw new Error('Received empty audio response');
            }
    
            const audioUrl = URL.createObjectURL(audioBlob);
            console.log('Audio URL created:', audioUrl); // Debug log
            
            setAudioData(audioUrl);
            setShowAudio(true);
            console.log('Audio state updated'); // Debug log

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

    const handleDownload = async () => {
        if (!audioData) return;
        
        setIsDownloading(true);
        try {
            const response = await fetch(audioData);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `voice-message-${Date.now()}.mp3`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download failed:', error);
        }
        setIsDownloading(false);
    };

    const glassStyle = {
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
        opacity: 0,
        transform: 'translateY(50px) translateZ(0)'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() => {
                // First add base shadows
                setShowShadowAnimation(true);
                // Then after a short delay, start pulsing
                setTimeout(() => {
                    setShowPulsingAnimation(true);
                }, 300);
            }}
            className={`relative w-full max-w-md mx-auto p-6 rounded-xl base-card-shadow ${
                showShadowAnimation ? 'shadow-ready' : ''
            } ${showPulsingAnimation ? 'ai-card-shadow' : ''}`}
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
                    classNames={{
                        listbox: "max-h-[200px] overflow-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-100 dark:scrollbar-thumb-pink-500 dark:scrollbar-track-pink-100/20"
                    }}
                >
                    {voices.map((voice) => (
                        <SelectItem key={voice.voice_id} value={voice.voice_id}>
                            {voice.name}
                        </SelectItem>
                    ))}
                </Select>

                {/* 📝 Text Input Field */}
                <Textarea
                    label="Enter Text"
                    placeholder="Type something to convert to speech..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full"
                    minRows={1}
                    maxRows={8}
                    classNames={{
                        input: "resize-none",
                        base: "max-h-[300px]"
                    }}
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
                {showAudio && audioData && (
                    <div className="flex items-center gap-4 mt-4">
                        <audio
                            ref={audioRef}
                            controls
                            src={audioData}
                            className="w-full max-w-md"
                        />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <Button
                                isIconOnly
                                className={`bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 ${isDownloading ? 'animate-pulse shadow-ready' : ''}`}
                                onClick={handleDownload}
                                disabled={isDownloading}
                            >
                                <DownloadIcon />
                            </Button>
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
