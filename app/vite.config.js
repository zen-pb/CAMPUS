import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['mock-aws-s3', 'aws-sdk', 'nock'],
      output: {
        globals: {
          'mock-aws-s3': 'mockAwsS3',
          'aws-sdk': 'AWS',
          'nock': 'nock',
        },
      },
    },
  },
});
