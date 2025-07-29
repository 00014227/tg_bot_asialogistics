module.exports = {
    apps: [
      {
        name: "backend-server",
        script: "server.js",
        watch: true,
        env: {
          NODE_ENV: "production",
          PORT: 3000
        }
      },
      {
        name: "telegram-bot",
        script: "bot/index.js",
        watch: true,
        env: {
          NODE_ENV: "production",
          PORT: 3000

        }
      }
    ]
  };
  