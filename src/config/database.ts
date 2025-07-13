/* eslint-disable no-console */
import mongoose from 'mongoose'
import { ENV } from '~/config/environment'

const connectDB = async (): Promise<void> => {
  try {

    await mongoose.connect(`${ENV.MONGODB_URI}`)
    console.log('✅ MongoDB connected')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

export default connectDB

