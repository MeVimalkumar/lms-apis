module.exports = {
    APP_PORT: process.env.APP_PORT || '3000',
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USER: process.env.DB_USER,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    SALT_ROUNDS: 10,
}