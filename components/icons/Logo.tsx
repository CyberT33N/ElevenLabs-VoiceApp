/**
 * @fileoverview 🎨 Logo Icon Component
 * @module icons/Logo
 * @requires react
 * 
 * @copyright t33n Software © 2025
 */

import * as React from 'react'
import { IconSvgProps } from '@/types'

/**
 * 🎨 Logo Icon Component
 * 
 * @component
 * @description Application logo icon
 * 
 * @param {IconSvgProps} props - Icon properties
 * @param {number} [props.size=36] - Icon size in pixels
 * @param {number} [props.width] - Custom width (overrides size)
 * @param {number} [props.height] - Custom height (overrides size)
 * 
 * @returns {JSX.Element} Logo icon SVG
 */
const Logo: React.FC<IconSvgProps> = ({
    size = 36,
    width,
    height,
    ...props
}) => (
    <svg
        fill="none"
        height={size || height}
        viewBox="0 0 32 32"
        width={size || width}
        {...props}
    >
        <path
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
)

export default Logo
