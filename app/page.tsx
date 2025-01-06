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
 * @fileoverview 🏠 Home Page Component
 * @description Main landing page for the ElevenLabs Voice App featuring animated text and voice generation interface
 * @module HomePage
 * @requires react
 * @requires animejs
 * @requires @/components/VoiceBot
 * 
 * @copyright t33n Software 2025
 * ═══════════════════════════════════════════
 */

'use client'

// ==== DEPENDENCIES ====
import VoiceBot from '@/components/VoiceBot'
import { useState, useEffect } from 'react';
import anime from 'animejs';
import './animation.css'

/**
 * 🏠 Home Page Component
 * 
 * @component
 * @description Root page component that renders the main voice generation interface with animated title
 * 
 * @example
 * // Usage in app structure:
 * <Home />
 * 
 * @returns {JSX.Element} The rendered page containing the animated title and VoiceBot component
 */
export default function Home() {
    // 🔄 Loading state management
    const [isLoaded, setIsLoaded] = useState(false);

    /**
     * 🎭 Animation Setup Effect
     * @description Sets up and manages the text animation sequence
     */
    useEffect(() => {
        /**
         * 📊 Loading State Check
         * @description Recursively checks if the app has finished loading
         * @inner
         */
        const checkLoading = () => {
            // Check if app has finished loading
            const loadingState = document.body.classList.contains('app-loaded');

            if (loadingState) {
                // ✅ App has loaded
                setIsLoaded(true);

                // 🎬 Initialize animation sequence
                setTimeout(() => {
                    const textWrapper = document.querySelector('.ml2');

                    if (textWrapper) {
                        // 📝 Text processing: Split into words and letters
                        const words = textWrapper.textContent!.split(' ');
                        
                        // 🔤 Create HTML structure for animation
                        textWrapper.innerHTML = words.map(word => 
                            `<span class='word'>${word.split('').map(char => 
                                `<span class='letter'>${char}</span>`
                            ).join('')}</span>`
                        ).join(' ');
                        
                        // 👁️ Make text visible
                        textWrapper.classList.add('visible');
                        
                        // ✨ Animate letters
                        anime.timeline({loop: false})
                        .add({
                            targets: '.ml2 .letter',
                            scale: [4,1],
                            opacity: [0,1],
                            translateZ: 0,
                            easing: "easeOutExpo",
                            duration: 950,
                            delay: (el, i) => 70*i
                        });
                    }
                }, 100); // Reduced delay for responsiveness
            } else {
                // 🔄 Check again if not loaded
                setTimeout(checkLoading, 100);
            }
        };
        
        // 🚀 Start initial loading check
        checkLoading();
    }, []);

    return (
        // 📱 Main container with full viewport height
        <div className="min-h-screen w-full relative">
            {/* 📄 Content wrapper with centered layout */}
            <main className="container mx-auto max-w-7xl pt-2 px-6 flex-grow flex items-center justify-center min-h-screen">
                {/* 📦 Content container with max width */}
                <div className="w-full max-w-4xl -mt-32">
                    {/* 🎯 Animated title container */}
                    <div className="flex items-center justify-center overflow-visible h-72 md:h-64">
                        <h1 className="ml2 text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                            ElevenLabs Voice App
                        </h1>
                    </div>
                    {/* 🎤 Voice generation interface */}
                    <VoiceBot />
                </div>
            </main>
        </div>
    )
}