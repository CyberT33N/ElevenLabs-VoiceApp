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
 * @fileoverview Navigation Bar Component for the ElevenLabs Voice Application
 * @module components/navbar
 * @requires @nextui-org/navbar
 * @requires @nextui-org/theme
 * @requires next/link
 */

// 🔄 Dependencies
import _ from 'lodash'

// 🎨 NextUI Components
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem
} from '@nextui-org/navbar'

import { Link } from '@nextui-org/link'

// ⚛️ React Core
import React from 'react'

// 🔗 Next.js Routing
import NextLink from 'next/link'

// ⚙️ Custom Configuration
import { siteConfig } from '@/config/site'

// 🧩 Custom Components
import { ThemeSwitch } from '@/components/theme-switch'
import { Logo } from '@/components/icons'

/**
 * @component Navbar
 * @description Main navigation component that provides the top-level navigation structure
 * for the application. Features a responsive design with logo, theme switcher, and optional
 * hamburger menu for mobile views.
 * 
 * @returns {JSX.Element} A responsive navigation bar component
 */
export const Navbar = () => {
    return (
        <NextUINavbar 
            style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}  // 🎨 Transparent background
            className="w-full max-w-full px-0"
            classNames={{
                wrapper: 'px-0 max-w-full',
                content: 'px-6'
            }}
            position="sticky"  // 📌 Sticky positioning at the top
            isBlurred={false}
        >
            {/* 📱 Primary Navigation Section */}
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                {/* 🎯 Brand Logo and Title */}
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <Logo />
                        <p className="font-bold text-inherit">CyberT33N</p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            {/* 🎨 Theme Switch Section */}
            <NavbarContent className="flex basis-1 justify-end" justify="end">
                <NavbarItem>
                    <ThemeSwitch />
                </NavbarItem>
            </NavbarContent>

            {/* 📱 Mobile Menu Toggle (Hidden) */}
            <NavbarContent className="hidden basis-1 pl-4" justify="end">
                <NavbarMenuToggle />
            </NavbarContent>

            {/* 📱 Mobile Navigation Menu */}
            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2
                                        ? 'primary'
                                        : index === siteConfig.navMenuItems.length - 1
                                            ? 'danger'
                                            : 'foreground'
                                }
                                href="#"
                                size="lg"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    )
}
