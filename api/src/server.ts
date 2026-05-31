import app from "./app"
import database from "./database.ts/db"

const PORT = 3333

app.listen(PORT, () => {
    try {
        database.authenticate()
        console.log(`server in running on ${PORT}`)
    } catch (error) {
        console.log("unable to connect database", error)
    }
})