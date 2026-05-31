import express from "express"
const app = express()

import errorHanddling from "./middlewares/error-handdling"

app.use(express.json())

app.use(errorHanddling)

export default app