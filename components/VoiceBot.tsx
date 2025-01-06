/*
████████████████████████████████████████████████████████████████████████
██ 🎙️ VoiceBot Component                                             ██
██ A React component that provides text-to-speech functionality      ██
██ using the ElevenLabs API                                         ██
████████████████████████████████████████████████████████████████████████
*/

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@nextui-org/button';
import { Textarea } from "@nextui-org/input";
import { Select, SelectItem } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Microphone, Download } from './icons';

import axiosRequestWrapper from '@/utils/axiosRequestWrapper';
import { BaseError } from 'error-manager-helper';
import { HttpClientError } from 'error-manager-helper';
import { useLoading } from '@/app/loadingContext';

/**
 * 📋 Interface for Voice data structure
 * @interface Voice
 * @description Defines the structure for voice data received from the ElevenLabs API
 * 
 * @property {string} voice_id - Unique identifier for the voice model
 * @property {string} name - Human-readable name of the voice
 * @property {string} preview_url - URL to preview the voice sample
 * @property {string} category - Classification category of the voice (e.g., "premade", "cloned")
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
 * @description A sophisticated text-to-speech component utilizing ElevenLabs API
 * 
 * Key Features:
 * - 🎯 Dynamic voice selection from ElevenLabs' voice models
 * - ✍️ Text input with multi-line support
 * - 🔊 Built-in audio player with download capability
 * - 🌓 Theme-aware styling (dark/light mode compatibility)
 * - ✨ Smooth animations and glass-morphism effects
 * - 🔄 Loading states and error handling
 * 
 * @example
 * ```tsx
 * <VoiceBot />
 * ```
 */
export default function VoiceBot() {
    // 📊 State Management
    const [voices, setVoices] = useState<Voice[]>([]); // Available voice models
    const [text, setText] = useState(''); // Input text for conversion
    const [selectedVoice, setSelectedVoice] = useState(''); // Selected voice ID
    const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
    const [error, setError] = useState<string | null>(null); // Error message state
    const [showAudio, setShowAudio] = useState(false); // Audio player visibility
    const [showAnimation, setShowAnimation] = useState(false); // Component animation state
    const [showShadowAnimation, setShowShadowAnimation] = useState(false); // Shadow effect state
    const [showPulsingAnimation, setShowPulsingAnimation] = useState(false); // Pulse animation state
    const [isDownloading, setIsDownloading] = useState(false); // Download state
    const [audioData, setAudioData] = useState<string | null>(null); // Generated audio data
    const audioRef = useRef<HTMLAudioElement>(null); // Reference to audio element
    const { theme } = useTheme(); // Current theme context
    const { loading } = useLoading(); // Global loading state

    // 🔄 Lifecycle Management
    useEffect(() => {
        if (!loading) {
            // ⏱️ Delayed animation start for smooth entry
            const motionTimer = setTimeout(() => {
                setShowAnimation(true);
            }, 100);
            return () => clearTimeout(motionTimer);
        }
    }, [loading]);

    useEffect(() => {
        fetchVoices(); // 🎤 Initialize available voices on mount
    }, []);

    /**
     * 🎤 Fetches available voices from the ElevenLabs API
     * @async
     * @function fetchVoices
     * @throws {BaseError} When API request fails
     * @throws {HttpClientError} When HTTP request fails
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
            console.error('🚨 Error fetching voices:', error);
        }
    };

    /**
     * 🔊 Handles form submission to generate speech from text
     * @async
     * @function handleSubmit
     * @throws {Error} When API request fails or audio processing fails
     */
    const handleSubmit = async () => {
        // ✅ Input validation
        if (!text || !selectedVoice) {
            setError('Please enter text and select a voice');
            return;
        }
    
        setError(null);
        setIsLoading(true);
        setShowAudio(false); // 🔄 Reset audio state
        
        try {
            console.log('🎯 Generating speech...'); // Debug log
            const response = await axiosRequestWrapper({
                method: 'POST',
                url: '/api/voice',
                headers: { 'Content-Type': 'application/json' },
                payload: { text, voice_id: selectedVoice },
                responseType: 'arraybuffer',
                errorMessage: 'Failed to generate speech',
            });
    
            // 🔍 Validate response type
            const contentType = response.headers['content-type'];
            console.log('📝 Response content type:', contentType);
    
            if (!contentType?.includes('audio/mpeg')) {
                throw new Error(`Invalid response type: ${contentType}`);
            }
    
            // 🎵 Process audio data
            const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
            console.log('📦 Audio blob size:', audioBlob.size);
            
            if (audioBlob.size === 0) {
                throw new Error('Received empty audio response');
            }
    
            const audioUrl = URL.createObjectURL(audioBlob);
            console.log('🔗 Audio URL created:', audioUrl);
            
            setAudioData(audioUrl);
            setShowAudio(true);
            console.log('✨ Audio state updated');

        } catch (error) {
            let errorMessage = 'Unknown error';
    
            if (error instanceof HttpClientError) {
                errorMessage = error.data.errorMessage || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
    
            setError(`Error: ${errorMessage}`);
            console.error('🚨 Error generating speech:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * 💾 Handles downloading of generated audio file
     * @async
     * @function handleDownload
     */
    const handleDownload = async () => {
        if (!audioData) return;
        
        setIsDownloading(true);

        try {
            // 📥 Process download
            const response = await fetch(audioData);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `voice-message-${Date.now()}.mp3`;
            document.body.appendChild(a);
            a.click();
            
            // 🧹 Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('🚨 Download failed:', error);
        }

        setIsDownloading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() => {
                // 🎭 Animation sequence
                setShowShadowAnimation(true); // Base shadows
                setTimeout(() => {
                    setShowPulsingAnimation(true); // Pulsing effect
                }, 300);
            }}
            className={`relative w-full max-w-md mx-auto p-6 rounded-xl base-card-shadow ${
                showShadowAnimation ? 'shadow-ready' : ''
            } ${showPulsingAnimation ? 'ai-card-shadow' : ''}`}
        >

            {/* 📝 Component Title */}
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center flex flex-col sm:flex-row items-center justify-center sm:gap-3 text-white dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-600">
                <span className="mb-2 sm:mb-0">AI Voice Generator</span>
                <Microphone className="w-6 h-6" />
            </h2>

            <div className="space-y-4">
                {/* 🎤 Voice Selection Dropdown */}
                <Select
                    label="Select Voice"
                    placeholder="Choose a voice"
                    value={selectedVoice}
                    onChange={
                        (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedVoice(e.target.value)
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

                {/* 📝 Text Input Area */}
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

                {/* 🔄 Generate Speech Button */}
                <Button
                    color="primary"
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                    {isLoading ? 'Generating...' : 'Generate Speech'}
                </Button>

                {/* 🔊 Audio Player with Download */}
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
                                className={`bg-white dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 ${isDownloading ? 'animate-pulse shadow-ready' : ''}`}
                                onClick={handleDownload}
                                disabled={isDownloading}
                            >
                                <Download />
                            </Button>
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
