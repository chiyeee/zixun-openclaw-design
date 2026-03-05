export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "ecommerce-intel-platform/_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.CTRgst0e.js",app:"_app/immutable/entry/app.DNjVAh3m.js",imports:["_app/immutable/entry/start.CTRgst0e.js","_app/immutable/chunks/J2AQlyW8.js","_app/immutable/chunks/rsSWfq8L.js","_app/immutable/entry/app.DNjVAh3m.js","_app/immutable/chunks/J2AQlyW8.js","_app/immutable/chunks/rsSWfq8L.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/ecommerce-intel-platform/","/ecommerce-intel-platform/news","/ecommerce-intel-platform/markets"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
