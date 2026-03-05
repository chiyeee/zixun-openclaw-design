

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CNKFN-lB.js","_app/immutable/chunks/J2AQlyW8.js","_app/immutable/chunks/rsSWfq8L.js","_app/immutable/chunks/CPCVu2Js.js","_app/immutable/chunks/DfjGprqy.js","_app/immutable/chunks/DbI3wwop.js","_app/immutable/chunks/BmktnBWe.js"];
export const stylesheets = ["_app/immutable/assets/0.ReeL6EB8.css"];
export const fonts = [];
