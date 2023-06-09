import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost', 
  }, 
  plugins: [react()],
  resolve: {
    alias: { 
      src: "src",
      type: "src/types",
      redux: "src/redux",
      reacts: "src/react"
    },
  },

})
