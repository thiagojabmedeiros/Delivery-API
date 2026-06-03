import express from "express"
const app = express()

import errorHanddling from "./middlewares/error-handdling"
import routes from "./routes/index-routes"

app.use(express.json())

app.use(routes)

app.use(errorHanddling)

export default app