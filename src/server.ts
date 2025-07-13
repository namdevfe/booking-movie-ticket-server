import express from 'express'
import { ENV } from '~/config/environment'
import connectDB from '~/config/database'
import { APIs_V1 } from '~/routes/v1'

const START_SERVER = async () => {
  const app = express()

  app.use(express.json())

  await connectDB()

  app.use('/api/v1', APIs_V1)

  app.listen(ENV.APP_PORT, ENV.APP_HOST, async () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://${ENV.APP_HOST}:${ENV.APP_PORT}`)
  })
}

START_SERVER()


