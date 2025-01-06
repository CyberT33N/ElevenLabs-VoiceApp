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
 * @fileoverview Main test setup configuration
 * Handles the initialization of the test environment and database cleanup
 * 
 * @author t33n Software
 * @copyright 2025 t33n Software
 * @license MIT
 */

// 
import { bootstrap } from '@/src/bootstrap'

// 
// import MongoUtils from '@/utils/db/mongodb/MongoUtils'

// 
// import MongooseUtils from '@/utils/db/mongodb/MongooseUtils'

/**
 * Main setup function for test environment initialization
 * Bootstraps the application and handles database cleanup if needed
 * 
 * @async
 * @function setup
 * @returns {Promise<void>} Resolves when setup is complete
 * @throws {Error} If bootstrap process fails
 */
export async function setup() {
    console.log('[PRETEST] - INIT.. ')

    // 
    await bootstrap()

    // 
    // const mongoUtils = await MongoUtils.getInstance(process.env.MONGODB_ETH_DB_NAME)
    // await mongoUtils.dropDatabase()

    console.log('[PRETEST] - Done! ')
}