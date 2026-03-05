

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/markets/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BJBnUzMM.js","_app/immutable/chunks/J2AQlyW8.js","_app/immutable/chunks/rsSWfq8L.js","_app/immutable/chunks/BmktnBWe.js","_app/immutable/chunks/DfjGprqy.js","_app/immutable/chunks/DbI3wwop.js"];
export const stylesheets = ["_app/immutable/assets/3.CEqJK_cK.css"];
export const fonts = [];
