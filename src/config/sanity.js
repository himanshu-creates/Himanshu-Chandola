import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const SANITY_PROJECT_ID = 'portfolio-placeholder';

export const sanityClient = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-03-01',
});

const builder = createImageUrlBuilder(sanityClient);

export const urlFor = (source) => (source ? builder.image(source) : { url: () => '' });

export const getProxyUrl = (imageBuilder) => {
    if (!imageBuilder) return null;
    try {
        const url = typeof imageBuilder.url === 'function' ? imageBuilder.url() : null;
        if (url && typeof window !== 'undefined') {
            return url.replace('https://cdn.sanity.io', '/sanity-cdn');
        }
        return url;
    } catch {
        return null;
    }
};
