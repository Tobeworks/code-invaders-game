import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
    const baseConfig = {
        server: {
            port: 5173,
            open: true
        },
        root: '.'
    }

    if (command === 'build') {
        return {
            ...baseConfig,
            build: {
                lib: {
                    entry: 'src/index.js',
                    name: 'CodeInvaders',
                    fileName: (format) => `code-invaders.${format}.js`,
                    formats: ['umd', 'es']
                },
                rollupOptions: {
                    external: [],
                    output: {
                        globals: {},
                        assetFileNames: 'code-invaders.[ext]'
                    }
                },
                minify: 'esbuild',
                sourcemap: true
            }
        }
    }

    // Development mode - normale SPA
    return baseConfig
})