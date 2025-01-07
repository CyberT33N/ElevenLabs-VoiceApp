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
 * @fileoverview 🔄 Loader Component - Displays a centered loading spinner
 * @module components/Loader
 * @description A reusable loading component that displays a centered spinner with a loading message
 */

import { Spinner } from '@nextui-org/react'
import '@/styles/components/loader.css'

/**
 * @component Loader
 * @description ⏳ Renders a centered loading spinner component using NextUI's Spinner
 * @returns {JSX.Element} A centered div containing a spinning loader with "Loading..." text
 * @example
 * // Basic usage
 * return <Loader />
 */
const Loader = () => {
    return (
        <div className="loader-container">
            {/* 🔄 NextUI Spinner component with secondary color scheme */}
            <Spinner label="Loading..." color="secondary" />
        </div>
    )
}

export default Loader