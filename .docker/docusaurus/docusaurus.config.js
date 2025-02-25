const config = {
    title: 'Page personnelle Idriss Neumann',
    tagline: 'Page personnelle d\'Idriss Neumann',
    url: 'https://www.ineumann.fr',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    plugins: [
        [
            '@easyops-cn/docusaurus-search-local',
            {
                hashed: true,
                language: ["fr"],
                docsRouteBasePath: "/docs",
                indexDocs: true,
                indexPages: false,
                highlightSearchTermsOnTargetPage: true,
                removeDefaultStopWordFilter: true,
                removeDefaultStemmer: true,
            },
        ]
    ],
        
    i18n: {
        defaultLocale: 'fr',
        locales: ['fr'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js')
                },
                blog: {
                    blogSidebarCount: 15,
                    onUntruncatedBlogPosts: 'ignore',
                    feedOptions: {
                        type: 'all',
                        copyright: `Copyright © ${new Date().getFullYear()} Idriss Neumann.`,
                        createFeedItems: async (params) => {
                        const {blogPosts, defaultCreateFeedItems, ...rest} = params;
                        return defaultCreateFeedItems({
                            blogPosts: blogPosts.filter((item, index) => index < 10),
                            ...rest,
                        });
                        },
                    },
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            colorMode: {
                defaultMode: 'light',
                disableSwitch: true,
                respectPrefersColorScheme: false,
            },
            metadata: [
                {
                    name: 'description',
                    content: 'Page personnelle d\'Idriss Neumann'
                },
                {
                    name: 'keywords',
                    content: 'Idriss, Neumann, Tutoriel, Linux, Shell, Bash, Java, Agile, Scrum, Kanban'
                },
                {
                    property: 'og:image',
                    content: 'img/ineumann-logo.png'
                },
                {
                    property: 'og:image:width',
                    content: '300'
                },
                {
                    property: 'og:image:height',
                    content: '300'
                },
                {
                    property: 'og:site_name',
                    content: 'Page personnelle d\'Idriss Neumann'
                },
                {
                    property: 'og:description',
                    content: 'Page personnelle d\'Idriss Neumann'
                },
                {
                    property: 'og:url',
                    content: 'https://www.ineumann.fr'
                },
                {
                    property: 'twitter:card',
                    content: 'canonical'
                },
                {
                    property: 'twitter:description',
                    content: 'Page personnelle d\'Idriss Neumann'
                },
                {
                    property: 'twitter:title',
                    content: 'Page personnelle d\'Idriss Neumann'
                },
                {
                    property: 'og:type',
                    content: 'Page personnelle d\'Idriss Neumann'
                },
            ],
            navbar: {
                title: 'Tutoriels',
                logo: {
                    alt: 'ineumann-logo',
                    src: 'img/ineumann-logo.png',
                },
                items: [
                    {
                        to: '/docs/cv',
                        label: 'CV',
                        position: 'left',
                    },
                    {
                        to: '/blog',
                        label: 'Blog',
                        position: 'left',
                    },
                    {
                        to: 'https://www.comwork.io',
                        label: 'Comwork.io',
                        position: 'right',
                    },
                    {
                        label: 'YouTube',
                        to: 'https://www.youtube.com/channel/UCC2MNPcLGd_yrfwdEFvnByg',
                        position: 'right'
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Comwork',
                        items: [
                            {
                                label: 'Comwork',
                                to: 'https://www.comwork.io',
                            },
                            {
                                label: 'YouTube',
                                to: 'https://www.youtube.com/channel/UCC2MNPcLGd_yrfwdEFvnByg',
                            },
                            {
                                html: `<img src="https://api.cwcloud.tech/v1/tracker/img/ineumann.fr" style="display: none"></img>`
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Idriss Neumann.`,
            },
            prism: {
                theme: require('prism-react-renderer').themes.github,
                darkTheme: require('prism-react-renderer').themes.dracula,
                additionalLanguages: ['java']
            },
        }),
};

module.exports = config;
