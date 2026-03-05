
import root from '../root.js';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '$app/paths/internal/server';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	async: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	csrf_trusted_origins: [],
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hash_routing: false,
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	service_worker_options: undefined,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"en\" data-theme=\"dark\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"" + assets + "/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t<title>全球电商智能情报平台</title>\n\t\t<meta name=\"description\" content=\"Global E-commerce Intelligence Platform - Real-time market analysis, news tracking, and competitive intelligence for e-commerce businesses\" />\n\t\t\n\t\t<!-- Open Graph / Facebook -->\n\t\t<meta property=\"og:type\" content=\"website\" />\n\t\t<meta property=\"og:url\" content=\"https://chiyeee.github.io/ecommerce-intel-platform/\" />\n\t\t<meta property=\"og:title\" content=\"全球电商智能情报平台\" />\n\t\t<meta property=\"og:description\" content=\"Real-time market analysis and competitive intelligence\" />\n\t\t\n\t\t<!-- Twitter -->\n\t\t<meta property=\"twitter:card\" content=\"summary_large_image\" />\n\t\t<meta property=\"twitter:title\" content=\"全球电商智能情报平台\" />\n\t\t<meta property=\"twitter:description\" content=\"Real-time market analysis and competitive intelligence\" />\n\t\t\n\t\t<!-- Preload critical resources -->\n\t\t<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n\t\t<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n\t\t<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap\" rel=\"stylesheet\">\n\t\t\n\t\t<style>\n\t\t\t/* Critical CSS to prevent FOUC */\n\t\t\thtml {\n\t\t\t\tfont-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n\t\t\t\tbackground: #0a0a0a;\n\t\t\t\tcolor: #ffffff;\n\t\t\t}\n\t\t\t\n\t\t\tbody {\n\t\t\t\tmargin: 0;\n\t\t\t\tbackground: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);\n\t\t\t\tmin-height: 100vh;\n\t\t\t}\n\t\t\t\n\t\t\t/* Loading animation */\n\t\t\t.loading-container {\n\t\t\t\tposition: fixed;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\tright: 0;\n\t\t\t\tbottom: 0;\n\t\t\t\tbackground: #0a0a0a;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\tz-index: 9999;\n\t\t\t}\n\t\t\t\n\t\t\t.loading-spinner {\n\t\t\t\twidth: 40px;\n\t\t\t\theight: 40px;\n\t\t\t\tborder: 3px solid #333;\n\t\t\t\tborder-top: 3px solid #00d4ff;\n\t\t\t\tborder-radius: 50%;\n\t\t\t\tanimation: spin 1s linear infinite;\n\t\t\t}\n\t\t\t\n\t\t\t@keyframes spin {\n\t\t\t\t0% { transform: rotate(0deg); }\n\t\t\t\t100% { transform: rotate(360deg); }\n\t\t\t}\n\t\t\t\n\t\t\t/* Hide scrollbar but keep functionality */\n\t\t\t::-webkit-scrollbar {\n\t\t\t\twidth: 6px;\n\t\t\t}\n\t\t\t\n\t\t\t::-webkit-scrollbar-track {\n\t\t\t\tbackground: #1a1a1a;\n\t\t\t}\n\t\t\t\n\t\t\t::-webkit-scrollbar-thumb {\n\t\t\t\tbackground: #444;\n\t\t\t\tborder-radius: 3px;\n\t\t\t}\n\t\t\t\n\t\t\t::-webkit-scrollbar-thumb:hover {\n\t\t\t\tbackground: #666;\n\t\t\t}\n\t\t</style>\n\t\t\n\t\t" + head + "\n\t</head>\n\t<body data-sveltekit-preload-data=\"hover\">\n\t\t<div id=\"loading-screen\" class=\"loading-container\">\n\t\t\t<div>\n\t\t\t\t<div class=\"loading-spinner\"></div>\n\t\t\t\t<div style=\"margin-top: 20px; text-align: center; color: #888;\">\n\t\t\t\t\tLoading Intelligence Platform...\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t\t<div style=\"display: contents\">" + body + "</div>\n\t\t\n\t\t<script>\n\t\t\t// Hide loading screen when app is ready\n\t\t\twindow.addEventListener('load', () => {\n\t\t\t\tconst loadingScreen = document.getElementById('loading-screen');\n\t\t\t\tif (loadingScreen) {\n\t\t\t\t\tloadingScreen.style.opacity = '0';\n\t\t\t\t\tloadingScreen.style.transition = 'opacity 0.3s ease';\n\t\t\t\t\tsetTimeout(() => {\n\t\t\t\t\t\tloadingScreen.remove();\n\t\t\t\t\t}, 300);\n\t\t\t\t}\n\t\t\t});\n\t\t\t\n\t\t\t// Global error handler\n\t\t\twindow.addEventListener('error', (e) => {\n\t\t\t\tconsole.error('Global error:', e.error);\n\t\t\t});\n\t\t\t\n\t\t\t// Service worker for caching (optional)\n\t\t\tif ('serviceWorker' in navigator) {\n\t\t\t\tnavigator.serviceWorker.register('/sw.js').catch(() => {\n\t\t\t\t\t// Service worker not available, that's ok\n\t\t\t\t});\n\t\t\t}\n\t\t</script>\n\t</body>\n</html>",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "12oxsxo"
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let handleValidationError;
	let init;
	

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		handleValidationError,
		init,
		reroute,
		transport
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation };
