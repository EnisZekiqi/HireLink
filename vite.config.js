import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    base: '/HireLink/', // This ensures assets and routing work properly on GitHub Pages
  plugins: [react(),
        tailwindcss(),
  ],
})
