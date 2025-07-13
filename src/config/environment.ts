import 'dotenv/config'

export const ENV = {
  APP_HOST: process.env.APP_HOST as string,
  APP_PORT: Number(process.env.APP_PORT),
  MONGODB_URI: process.env.MONGODB_URI
}