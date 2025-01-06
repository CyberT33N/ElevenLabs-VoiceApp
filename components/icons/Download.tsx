/**
 * @fileoverview 🎨 Download Icon Component
 * @module icons/Download
 * @requires react
 * 
 * @copyright t33n Software 2025
 */

import * as React from 'react'
import { IconSvgProps } from '@/types'

/**
 * 🎨 Download Icon Component
 * 
 * @component
 * @description Download icon for the application
 * 
 * @param {IconSvgProps} props - Icon properties
 * @param {number} [props.size=24] - Icon size in pixels
 * @param {number} [props.width] - Custom width (overrides size)
 * @param {number} [props.height] - Custom height (overrides size)
 * 
 * @returns {JSX.Element} Download icon SVG
 */
const Download: React.FC<IconSvgProps> = ({
    size = 24,
    width,
    height,
    ...props
}) => (
    <svg
        width={size || width}
        height={size || height}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
)

export default Download
