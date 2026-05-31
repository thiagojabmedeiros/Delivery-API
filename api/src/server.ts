import database from "./database.ts/db"
import app from "./app"

const PORT = 3333

app.listen(PORT, async () => {
    try {
        await database.authenticate()
        console.log(`server in running on ${PORT}`)
    } catch (error) {
        console.log("unable to connect database", error)
    }
})