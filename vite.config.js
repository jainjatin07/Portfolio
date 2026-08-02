import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    watch: {
      // Ignore the resume folder — PDFs open in viewers cause EBUSY lock errors
      // Ignore the RAG folder — Python venv & PyTorch DLLs cause EBUSY lock errors
      ignored: [
        path.resolve(__dirname, 'public/resume/**'),
        path.resolve(__dirname, 'RAG/**'),
      ],
    },
  },
})
