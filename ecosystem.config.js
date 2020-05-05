module.exports = {
  apps: [
    {
      name: 'back-end',
      script: 'node_modules/firebase-tools/lib/bin/firebase.js',
      args: 'serve --only functions',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      }
    },
    {
      name: 'front-end',
      script: 'node_modules/@vue/cli-service/bin/vue-cli-service.js',
      args: 'serve',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
}
