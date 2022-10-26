import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'
import { presetUno, transformerDirectives } from 'unocss'
import presetDaisy from 'unocss-preset-daisy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Unocss({
      transformers: [transformerDirectives()],
      presets: [presetUno(), presetDaisy()],
      shortcuts: {
        error: 'bg-red-500/20',
        sending: 'bg-yellow-500/20',
        success: 'bg-green-500/20',
        def: 'bg-blue-500/20',
        btn: 'm-x-auto md:m-2 m-y-1 w-40 h-10',
        inputLogin: 'm-x-auto m-y-1 md:m-2 w-full max-w-md p-2',
      },
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/store'],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
    Pages({
      dirs: [{ dir: 'src/pages', baseRoute: '' }],
    }),
  ],
})
