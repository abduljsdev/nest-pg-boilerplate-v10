export default () => ({
  ports: {
    main: parseInt(process.env.PORT) || 3000,
    socket: 3005,
  },
  database: {
    main: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  },
  mail: {
    sengrid: {
      email: process.env.SEND_GRID_EMAIL,
      key: process.env.SEND_GRID_API_KEY,
    },
    nodeMailer: {
      name: process.env.NODE_MAILER_EMAIL,
      host: process.env.NODE_MAILER_HOST,
      port: parseInt(process.env.NODE_MAILER_PORT),
      user: process.env.NODE_MAILER_USER,
      password: process.env.NODE_MAILER_PASSWORD,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
  jwt: {
    expiry: parseInt(process.env.JWT_EXPIRY),
    secret: process.env.JWT_SECRET,
  },
  seed: {
    user: {
      firstName: process.env.USER_FIRSTNAME,
      lastName: process.env.USER_LASTNAME,
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
      role: process.env.USER_ROLE,
    },
    admin: {
      firstName: process.env.ADMIN_FIRSTNAME,
      lastName: process.env.ADMIN_LASTNAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: process.env.ADMIN_ROLE,
    },
  },
  uploadFiles: {
    cloudinary: {
      name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    },
  },
});
