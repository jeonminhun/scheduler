import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// 설치한 패키지 
/* 
   react-router-dom
   recoil 상태관리
   axios http 통신
   @tanstack/react-query 서버 상태 관리, 캐싱/로딩/리트라이 등 포함
   tailwindcss css ui  버전 이슈로 인해 npm install -D tailwindcss@3.4.17 postcss autoprefixer 버전으로 재설치 및 추가 설정 필요 npx tailwindcss init -p
   postcss css ui
    ㄴautoprefixer css ui
   clsx 조건부 className 처리용
   date-fns 날짜 처리 라이브러리 (Moment 대체)
   npm install -D sass-embedded
*/
