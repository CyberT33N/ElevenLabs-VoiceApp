import * as React from 'react'
import { IconSvgProps } from '@/types'

const MicrophoneIcon: React.FC = () => {
    return (
        <>
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
            <svg 
                className="w-6 h-6 text-pink-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path 
                    className="draw-animation"
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
            </svg>
        </>
    );
};

export default MicrophoneIcon
