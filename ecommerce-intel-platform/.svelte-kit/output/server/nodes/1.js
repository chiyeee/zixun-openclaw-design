

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ZlxkT0-4.js","_app/immutable/chunks/J2AQlyW8.js","_app/immutable/chunks/rsSWfq8L.js"];
export const stylesheets = [];
export const fonts = [];
