import database from "./database/db"
import app from "./app"
import env from "./env"

const PORT = env.PORT

app.listen(PORT, async () => {
    try {
        await database.authenticate()
        console.log(`server in running on ${PORT}`)
    } catch (error) {
        console.log("unable to connect database", error)
    }
})