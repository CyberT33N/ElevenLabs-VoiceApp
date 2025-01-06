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
 * @fileoverview Theme Switch Component for toggling between light and dark modes
 * @module components/theme-switch
 * @requires react
 * @requires @react-aria/visually-hidden
 * @requires @nextui-org/switch
 * @requires next-themes
 * @requires @react-aria/ssr
 */

// Core Dependencies
import { FC } from 'react'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { SwitchProps, useSwitch } from '@nextui-org/switch'
import { useTheme } from 'next-themes'
import { useIsSSR } from '@react-aria/ssr'
import clsx from 'clsx'

// Icons
import { SunFilled, MoonFilled } from '@/components/icons'

/**
 * @interface ThemeSwitchProps
 * @description Props for the ThemeSwitch component
 * 
 * @property {string} [className] - Optional CSS class for the root element
 * @property {SwitchProps['classNames']} [classNames] - Optional NextUI switch class names
 */
export interface ThemeSwitchProps {
    className?: string;
    classNames?: SwitchProps['classNames'];
}

/**
 * @component ThemeSwitch
 * @description A toggle switch component that controls the application's theme (light/dark mode).
 * Includes visual indicators (sun/moon icons) and updates local storage preference.
 * Also handles Vanta.js background color updates when theme changes.
 * 
 * @param {ThemeSwitchProps} props - Component props
 * @param {string} [props.className] - Optional CSS class for the root element
 * @param {SwitchProps['classNames']} [props.classNames] - Optional NextUI switch class names
 * 
 * @returns {JSX.Element} A theme toggle switch with sun/moon icons
 */
export const ThemeSwitch: FC<ThemeSwitchProps> = ({
    className,
    classNames
}) => {
    // Theme management hooks
    const { theme, setTheme } = useTheme()
    const isSSR = useIsSSR()

    /**
     * @function onChange
     * @description Handles theme toggle and updates related configurations
     * - Toggles between light and dark theme
     * - Updates localStorage preference
     * - Updates Vanta.js background color
     */
    const onChange = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')

        if (typeof window !== 'undefined') {
            // Persist theme preference
            localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')

            // Update Vanta.js background
            window.vantaSession.setOptions({
                backgroundColor: theme === 'light' ? 0x000000 : 0xffffff
            })
        }
    }

    // NextUI switch hook configuration
    const {
        Component,
        slots,
        isSelected,
        getBaseProps,
        getInputProps,
        getWrapperProps
    } = useSwitch({
        isSelected: theme === 'light' || isSSR,
        'aria-label': `Switch to ${theme === 'light' || isSSR ? 'dark' : 'light'} mode`,
        onChange
    })

    return (
        <Component
            {...getBaseProps({
                className: clsx(
                    'px-px transition-opacity hover:opacity-80 cursor-pointer',
                    className,
                    classNames?.base
                )
            })}
        >
            {/* Screen reader accessible input */}
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            
            {/* Theme icon wrapper */}
            <div
                {...getWrapperProps()}
                className={slots.wrapper({
                    class: clsx(
                        [
                            'w-auto h-auto',
                            'bg-transparent',
                            'rounded-lg',
                            'flex items-center justify-center',
                            'group-data-[selected=true]:bg-transparent',
                            '!text-default-500',
                            'pt-px',
                            'px-0',
                            'mx-0'
                        ],
                        classNames?.wrapper
                    )
                })}
            >
                {/* Theme icons */}
                {!isSelected || isSSR ? <SunFilled size={22} /> : <MoonFilled size={22} />}
            </div>
        </Component>
    )
}
