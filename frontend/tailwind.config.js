/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // [cite: 52]
  ],
  theme: {
    extend: {
      // Di sinilah kita "menerjemahkan" style.css asli Anda
      colors: {
        'primary': '#1b5e20',   // Warna hijau tua Anda
        'secondary': '#4caf50', // Warna hijau muda Anda
        'light': '#f5f5f5',     // Warna background Anda
      },
      fontFamily: {
        // Menambahkan font 'Poppins' dari style.css asli Anda
        'sans': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}