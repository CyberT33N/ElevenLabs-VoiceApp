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

/**
 * @function Home
 * @description Root page component that renders the main voice generation interface
 * @returns {JSX.Element} The rendered page containing the VoiceBot component
 * @example
 * // Usage in _app.tsx or similar:
 * <Home />
 */
export default function Home() {
    return (
        <div className="min-h-screen w-full relative">
            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        ElevenLabs Voice App
                    </h1>
                    <VoiceBot />
                </div>
            </main>
        </div>
    )
}
