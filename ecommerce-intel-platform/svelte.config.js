import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	
	kit: {
		adapter: adapter({
			// GitHub Pages deployment configuration
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		
		paths: {
			// For GitHub Pages deployment
			base: process.env.NODE_ENV === 'production' ? '/ecommerce-intel-platform' : ''
		},
		
		alias: {
			'$lib': './src/lib',
			'$components': './src/lib/components',
			'$stores': './src/lib/stores',
			'$services': './src/lib/services',
			'$config': './src/lib/config',
			'$types': './src/lib/types'
		},
		
		// Prerender all pages for static deployment
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore 404s for missing pages
				console.log(`Ignoring 404 for: ${path}`);
				return;
			},
			handleMissingId: 'warn',
			crawl: true,
			entries: [
				'/',
				'/news',
				'/markets'
			]
		}
	}
};

export default config;