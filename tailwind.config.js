/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                strategy: '#10B981',
                structure: '#3B82F6',
                resource: '#8B5CF6',
                dev: '#F59E0B',
            },
        },
    },
    plugins: [],
}
