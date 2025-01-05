export const siteConfig = {
    name: 'ElevenLabs Voice App', 
    description: 'Example..',
    general: {
        wallet: {
            label: 'Wallet',
            href: '/wallet'
        }
    },
    navItems: [
        // {
        //     label: 'Home',
        //     href: '/'
        // }
    ],
    navMenuItems: [
        {
            label: 'Profile',
            href: '/profile'
        },
        {
            label: 'Dashboard',
            href: '/dashboard'
        },
        {
            label: 'Projects',
            href: '/projects'
        },
        {
            label: 'Team',
            href: '/team'
        },
        {
            label: 'Calendar',
            href: '/calendar'
        },
        {
            label: 'Settings',
            href: '/settings'
        },
        {
            label: 'Help & Feedback',
            href: '/help-feedback'
        },
        {
            label: 'Logout',
            href: '/logout'
        }
    ]
}

export type SiteConfig = typeof siteConfig;