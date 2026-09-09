import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // 브라우저에서 notion 비공식 API를 직접 호출하면 400으로 거부되어 우회한다.
      // 개발 서버 전용 우회이며, 운영에서는 동일 경로의 역프록시가 필요하다.
      '/notion-api': {
        target: 'https://app.notion.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/notion-api/, ''),
      },
    },
  },
})
