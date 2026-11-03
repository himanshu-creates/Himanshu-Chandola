/**
 * SEO & Structured Data Build Plugin for Himanshu Chandola's Portfolio
 */

const HIMANSHU_INFO = {
    name: 'Himanshu Chandola',
    alternateName: ['Himanshu', 'Himanshu Chandola Designer'],
    jobTitle: 'Product Designer | UI/UX Designer',
    siteTitle: 'Himanshu Chandola | Product Designer & UI/UX Designer Portfolio',
    siteDescription: 'Interactive 3D portfolio of Himanshu Chandola — Product Designer & UI/UX Designer. Explore user-centered design case studies including PahadGrow and Maa Dunagiri Rental.',
    url: 'https://himanshuchandola.com',
    aboutMe: 'Passionate Product Designer and UI/UX Designer specializing in user-centered design, prototyping, and digital product experiences. BCA in Full Stack Development from Devbhoomi Uttarakhand University.',
    skills: [
        'Product Design',
        'UI/UX Design',
        'Figma',
        'Wireframing',
        'Prototyping',
        'User Research',
        'Responsive Web Design',
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'Tailwind CSS',
        'Git & GitHub'
    ],
    linkedinUrl: 'https://www.linkedin.com/in/himanshu-chandola-1b80a3292/',
    whatsappUrl: 'https://wa.me/918171182424',
    email: 'himanshuchandola.design@gmail.com'
};

const PROJECTS = [
    {
        title: 'PahadGrow',
        category: 'Product Design & Community Platform',
        description: 'A digital platform connecting people with local businesses, opportunities, communities, and experiences across Uttarakhand.',
        url: 'https://pahad-grow.vercel.app/',
        caseStudyUrl: 'https://pahad-grow-product-case-study-lg48tdg0y.vercel.app/',
        disciplines: ['UI/UX Design', 'User Research', 'Product Strategy', 'Interactive Prototyping']
    },
    {
        title: 'Maa Dunagiri Rental',
        category: 'Client Project / Website Design & Development',
        description: 'A complete rental booking and inquiry website designed and developed from scratch for a local business in Almora, Uttarakhand.',
        url: 'https://maadunagirirental.in/',
        caseStudyUrl: 'https://maa-dunagiri-rental-product-case-st.vercel.app/',
        disciplines: ['UI/UX Design', 'Responsive Web Design', 'Frontend Development', 'Client Delivery']
    }
];

const STUDIO_ITEMS = [
    {
        title: 'Designing PahadGrow: Product Case Study',
        platform: 'Case Study',
        description: 'End-to-end breakdown of user discovery, wireframing, and design systems for local community growth.',
        url: 'https://pahad-grow-product-case-study-lg48tdg0y.vercel.app/'
    },
    {
        title: 'Maa Dunagiri Rental: From Concept to Code',
        platform: 'Design & Dev',
        description: 'How thoughtful UI/UX and modern frontend development increased direct rental bookings in Almora.',
        url: 'https://maa-dunagiri-rental-product-case-st.vercel.app/'
    },
    {
        title: 'User-Centered Design Philosophy',
        platform: 'Design Systems',
        description: 'Balancing aesthetic beauty, functional utility, and frontend feasibility in modern product design.',
        url: 'https://himanshuchandola.com'
    }
];

function buildJsonLd() {
    const graph = [];

    // 1. Person: Central node
    const person = {
        '@type': 'Person',
        '@id': `${HIMANSHU_INFO.url}/#person`,
        name: HIMANSHU_INFO.name,
        alternateName: HIMANSHU_INFO.alternateName,
        url: HIMANSHU_INFO.url,
        jobTitle: HIMANSHU_INFO.jobTitle,
        description: HIMANSHU_INFO.aboutMe,
        knowsAbout: HIMANSHU_INFO.skills,
        sameAs: [
            HIMANSHU_INFO.linkedinUrl,
            HIMANSHU_INFO.whatsappUrl
        ]
    };
    graph.push(person);

    // 2. WebSite
    const website = {
        '@type': 'WebSite',
        '@id': `${HIMANSHU_INFO.url}/#website`,
        url: HIMANSHU_INFO.url,
        name: HIMANSHU_INFO.siteTitle,
        description: HIMANSHU_INFO.siteDescription,
        publisher: { '@id': `${HIMANSHU_INFO.url}/#person` }
    };
    graph.push(website);

    // 3. ProfilePage
    const profilePage = {
        '@type': 'ProfilePage',
        '@id': `${HIMANSHU_INFO.url}/#profilepage`,
        url: HIMANSHU_INFO.url,
        mainEntity: { '@id': `${HIMANSHU_INFO.url}/#person` },
        about: { '@id': `${HIMANSHU_INFO.url}/#person` }
    };
    graph.push(profilePage);

    // 4. ItemList: Portfolio Projects
    graph.push({
        '@type': 'ItemList',
        '@id': `${HIMANSHU_INFO.url}/#projectslist`,
        name: `Featured Projects by ${HIMANSHU_INFO.name}`,
        description: 'Selected product design and UI/UX case studies.',
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'CreativeWork',
                name: p.title,
                description: p.description,
                url: p.caseStudyUrl || p.url,
                creator: { '@id': `${HIMANSHU_INFO.url}/#person` },
                keywords: p.disciplines.join(', ')
            }
        }))
    });

    return {
        '@context': 'https://schema.org',
        '@graph': graph
    };
}

function buildLlmsTxt() {
    let content = `# ${HIMANSHU_INFO.siteTitle}\n`;
    content += `> ${HIMANSHU_INFO.siteDescription}\n\n`;

    content += `## Biography & Professional Profile\n`;
    content += `Name: ${HIMANSHU_INFO.name}\n`;
    content += `Role: ${HIMANSHU_INFO.jobTitle}\n`;
    content += `${HIMANSHU_INFO.aboutMe}\n\n`;

    content += `## Education\n`;
    content += `- Bachelor of Computer Applications (BCA), Specialization: Full Stack Development, Devbhoomi Uttarakhand University.\n\n`;

    content += `## Professional Experience\n`;
    content += `- UI/UX & Product Designer Intern at Pahadi Bhula Production (15 January – 15 June, 6 Months).\n\n`;

    content += `## Genuine Skills\n`;
    content += `${HIMANSHU_INFO.skills.join(', ')}\n\n`;

    content += `## Featured Case Studies\n`;
    PROJECTS.forEach(p => {
        content += `- [${p.title}](${p.caseStudyUrl}): ${p.description} (Live: ${p.url})\n`;
    });
    content += `\n`;

    content += `## Contact Information\n`;
    content += `- LinkedIn: ${HIMANSHU_INFO.linkedinUrl}\n`;
    content += `- WhatsApp: ${HIMANSHU_INFO.whatsappUrl} (+91 81711 82424)\n`;
    content += `- Gmail: ${HIMANSHU_INFO.email}\n`;

    return content;
}

export function generateSeoHtml() {
    const llmsContent = buildLlmsTxt();

    return {
        name: 'sanity-seo-plugin',

        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                if (req.url === '/llms.txt') {
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end(llmsContent);
                } else {
                    next();
                }
            });
        },

        async transformIndexHtml(html) {
            try {
                // Build dynamic JSON-LD
                const jsonLdSchemas = buildJsonLd();
                const jsonLdScript = `\n  <!-- Structured Data (JSON-LD) -->\n  <script type="application/ld+json">\n${JSON.stringify(jsonLdSchemas, null, 2)}\n  </script>\n`;

                let transformedHtml = html;
                
                // Inject dynamic JSON-LD right before </head> if not already present
                if (!transformedHtml.includes('application/ld+json')) {
                    transformedHtml = transformedHtml.replace('</head>', `${jsonLdScript}</head>`);
                }

                return transformedHtml;
            } catch (error) {
                console.error('SEO Plugin Error', error);
                return html;
            }
        },

        async generateBundle() {
            this.emitFile({
                type: 'asset',
                fileName: 'llms.txt',
                source: llmsContent
            });
        }
    };
}
