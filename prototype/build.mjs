import { cp, mkdir, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const file of ['index.html','styles.css','app.mjs','ui.mjs','views.mjs','data.mjs','model.mjs','tour.mjs','assets']) await cp(file, `dist/${file}`, { recursive: true });
console.log('Static prototype built in dist/');
