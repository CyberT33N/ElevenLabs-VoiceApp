/**
 * @fileoverview 🌙 Moon Filled Icon Component
 * @module icons/MoonFilled
 * @requires react
 * 
 * @copyright t33n Software 2025
 */

import * as React from 'react'
import { IconSvgProps } from '@/types'

/**
 * Moon Filled Icon Component
 * 
 * @component
 * @description A filled moon icon used for dark mode toggle and night-time indicators
 * 
 * @param {IconSvgProps} props - Icon properties
 * @param {number} [props.size=24] - Icon size in pixels
 * @param {number} [props.width] - Custom width (overrides size)
 * @param {number} [props.height] - Custom height (overrides size)
 * 
 * @returns {JSX.Element} Moon filled icon SVG
 */
const MoonFilledIcon: React.FC<IconSvgProps> = ({
    size = 24,
    width,
    height,
    ...props
}: IconSvgProps) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 24 24"
        width={size || width}
        {...props}
    >
        <path
            // eslint-disable-next-line max-len
            d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
            fill="currentColor"
        />
    </svg>
)

export default MoonFilledIcon
