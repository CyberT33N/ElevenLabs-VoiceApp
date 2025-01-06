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
 * 🌐 Vanta Globe Configuration
 * @file vanta.ts
 * @description Configuration settings for the Vanta.js 3D globe animation effect.
 * This file contains all the necessary parameters to customize the appearance and behavior
 * of the interactive 3D globe background.
 */

/**
 * 🎨 Base Vanta Globe Settings
 * @constant
 * @description Default configuration object for the Vanta.js globe effect
 * 
 * Settings are organized into several categories:
 * - 🖱️ Controls Configuration
 * - 📏 Global Scaling
 * - 🕸️ Mesh Properties
 * - 🌍 Globe Properties
 * - 🎯 Logo 3D Properties
 */
const vantaGlobeSettings = {
    // 🎯 Target Element
    el: '#rootLayout',

    // 🖱️ Controls Configuration
    mouseControls: false,
    touchControls: true,
    gyroControls: false,

    // 📏 Global Scaling
    scale: 1.00,
    scaleMobile: 1.00,
    maxDistance: 19,

    // 🎨 Visual Properties
    color: 0xb300ff,
    spacing: 15,
    points: 8,

    // 🕸️ Mesh Configuration
    meshWidth: 0,
    meshHeight: 0,
    meshDepth: 0,
    meshBounceX: 200,
    meshBounceZ: 50,
    meshBounceZMultiplikator: 50,
    meshBounceHeight: 4,
    meshSpeed: 0.002,
    meshOpacity: .3,
    meshX: -20,
    meshY: 45,
    meshZ: 50,
    meshDotSize: .15,
    meshDotOpacity: .6,

    // 🌍 Primary Globe Configuration
    globeSpeed: 0.00025,
    globeSize: 1.25,
    globeAmountHeight: 18,
    globeAmountWidht: 20,  // Note: Typo in original property name maintained for compatibility
    globeHeight: 18,
    globe1Opacity: .4,
    globeX: 0,
    globeY: -2.5,
    globeZ: 0,
    globeRotation: -.25,

    // 🌐 Secondary Globe Configuration
    globe2Opacity: .2,
    globe2Size: .5,
    globe2AmountHeight: 18,
    globe2AmountWidht: 20,  // Note: Typo in original property name maintained for compatibility
    globe2Height: 18,
    globe2X: -50,
    globe2Y: -20,
    globe2Z: 60,

    // 🎯 3D Logo Positioning and Animation
    logo3dX: 0,
    logo3dY: 15,
    logo3dZ: 90,
    logo3dRotationX: Math.PI / 2,  // 90° rotation on X-axis for downward orientation
    logo3dRotationY: 0,            // No initial Y-axis rotation
    logo3dRotationZ: 0,            // No initial Z-axis rotation
    logo3dScaleX: 1.3,
    logo3dScaleY: 1.3,
    logo3dScaleZ: 1.3,
    logo3dSpeed: 0.0005,

    // 🎨 Background
    backgroundColor: 0x0
}

/**
 * 🎨 Generates theme-specific Vanta globe settings
 * @function generateVantaGlobeSettings
 * @description Creates a customized settings object based on the current theme
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.theme - Theme name ('dark' or 'light')
 * @returns {Object} Complete Vanta globe settings with theme-specific adjustments
 * 
 * @example
 * ```typescript
 * const darkThemeSettings = generateVantaGlobeSettings({ theme: 'dark' });
 * const lightThemeSettings = generateVantaGlobeSettings({ theme: 'light' });
 * ```
 */
export const generateVantaGlobeSettings = ({
    theme = 'dark'
}: { theme: string }) => {
    const settings = {
        ...vantaGlobeSettings,
        backgroundColor: theme === 'dark' ? 0x0 : 0xffffff
    }

    return settings
}