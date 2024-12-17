const config = {
    title: 'Tutoriels Idriss Neumann',
    tagline: 'Les tutoriels d\'Idriss Neumann',
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
                language: ["en", "fr"],
                docsRouteBasePath: "/docs",
                indexDocs: true,
                indexPages: false,
                highlightSearchTermsOnTargetPage: true,
                removeDefaultStopWordFilter: true,
                removeDefaultStemmer: true,
            },
        ],
        'docusaurus-plugin-matomo'
    ],
        
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
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
            matomo: {
                matomoUrl: 'https://matomo.comwork.io/',
                siteId: '24',
                phpLoader: 'matomo.php',
                jsLoader: 'matomo.js',
            },
            metadata: [
                {
                    name: 'description',
                    content: 'Les tutoriels d\'Idriss Neumann'
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
                    content: 'Les tutoriels d\'Idriss Neumann'
                },
                {
                    property: 'og:description',
                    content: 'Les tutoriels d\'Idriss Neumann'
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
                    content: 'Les tutoriels d\'Idriss Neumann'
                },
                {
                    property: 'twitter:title',
                    content: 'Les tutoriels d\'Idriss Neumann'
                },
                {
                    property: 'og:type',
                    content: 'Les tutoriels d\'Idriss Neumann'
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
                        to: '/blog',
                        label: 'Blog',
                        position: 'left',
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
                                label: 'Sources',
                                to: 'https://gitlab.comwork.io/oss/ineumann-tutorials',
                            },
                            {
                                label: 'YouTube',
                                to: 'https://www.youtube.com/channel/UCC2MNPcLGd_yrfwdEFvnByg',
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
