import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom'
	},
	
	define: {
		// Make environment variables available
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
		__BUILD_TIME__: JSON.stringify(new Date().toISOString())
	},
	
	server: {
		host: true,
		port: 5173,
		strictPort: false,
		open: false
	},
	
	preview: {
		host: true,
		port: 4173,
		strictPort: false,
		open: false
	},
	
	build: {
		target: 'esnext',
		sourcemap: true,
		minify: 'esbuild',
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// Split vendor code
					if (id.includes('node_modules')) {
						if (id.includes('svelte')) return 'svelte-vendor';
						if (id.includes('d3')) return 'd3-vendor';
						return 'vendor';
					}
					
					// Split our code
					if (id.includes('src/lib/services/')) return 'services';
					if (id.includes('src/lib/api/')) return 'api';
					if (id.includes('src/lib/config/')) return 'config';
				}
			}
		},
		
		// Increase chunk size warning limit
		chunkSizeWarningLimit: 1000
	},
	
	optimizeDeps: {
		include: ['d3']
	},
	
	resolve: {
		alias: {
			'$lib': new URL('./src/lib', import.meta.url).pathname,
			'$components': new URL('./src/lib/components', import.meta.url).pathname,
			'$stores': new URL('./src/lib/stores', import.meta.url).pathname,
			'$services': new URL('./src/lib/services', import.meta.url).pathname,
			'$config': new URL('./src/lib/config', import.meta.url).pathname,
			'$types': new URL('./src/lib/types', import.meta.url).pathname
		}
	}
});