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
 * @fileoverview Test setup configuration for Vitest
 * This file contains the beforeEach hook setup for maintaining environment consistency across tests
 * 
 * @author t33n Software
 * @copyright 2025 t33n Software
 * @license MIT
 */

// Import Vitest testing utilities
import { beforeEach } from 'vitest'

/**
 * Store the original npm lifecycle event value
 * This helps in preserving the initial state between test runs
 * 
 * @constant {string | undefined}
 */
const NLE = process.env.npm_lifecycle_event

/**
 * @description Reset npm_lifecycle_event before each test
 * This ensures each test starts with the same environment state
 * Environment Reset Hook
 */
beforeEach(() => {
    process.env.npm_lifecycle_event = NLE
})
