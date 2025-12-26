import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],

  manifest: {
    name: 'WXT Extension Base',
    description: 'Internal base template (WXT + React)',
    permissions: ['storage'],
  },
});
