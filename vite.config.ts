import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/Rely-Co-Test-Task/',
	plugins: [react(), svgrPlugin()],
});
