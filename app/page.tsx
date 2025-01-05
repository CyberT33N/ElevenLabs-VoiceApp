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
'use client'

/**
 * @fileoverview Main page component for the ElevenLabs Voice App
 * @module HomePage
 */

// ==== COMPONENTS ====
import VoiceBot from '@/components/VoiceBot'
import Script from 'next/script'
import { useState, useEffect } from 'react';
import anime from 'animejs';
import './animation.css'

/**
 * @function Home
 * @description Root page component that renders the main voice generation interface
 * @returns {JSX.Element} The rendered page containing the VoiceBot component
 * @example
 * // Usage in _app.tsx or similar:
 * <Home />
 */
export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const checkLoading = () => {
            const loadingState = document.body.classList.contains('app-loaded');
            if (loadingState) {
                setIsLoaded(true);
                // Add a small delay before starting the animation
                setTimeout(() => {
                    const textWrapper = document.querySelector('.ml2');
                    if (textWrapper) {
                        textWrapper.innerHTML = textWrapper.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");
                        
                        // First make the wrapper visible
                        textWrapper.classList.add('visible');
                        
                        // Then start the letter animation
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
                }, 100); // Reduced delay to make it more responsive
            } else {
                setTimeout(checkLoading, 100);
            }
        };
        
        checkLoading();
    }, []);

    return (
        <div className="min-h-screen w-full relative">
            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-4xl mx-auto">
                    <div className="flex items-center justify-center overflow-visible h-32">
                        <h1 className="ml2 text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                            ElevenLabs Voice App
                        </h1>
                    </div>
                    <VoiceBot />
                </div>
            </main>
        </div>
    )
}

// Animation initialization
const initAnimation = () => {
    if (typeof window !== 'undefined') {
        const textWrapper = document.querySelector('.ml2');
        if (textWrapper) {
            textWrapper.innerHTML = textWrapper.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");

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
    }
};
