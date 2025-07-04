import express from "express"

const START_SERVER = () => {
  const app = express()
  const APP_HOST: string = 'localhost'
  const APP_PORT = 8017

  app.listen(APP_PORT, APP_HOST, () => {
    console.log(`Server is running on http://${APP_HOST}:${APP_PORT}`)
  })
}

START_SERVER()


