import database from "../database/db";
import request from "supertest"

import User from "../models/User";
import app from "../app";

describe("session controller tests", () => {
    let id: string

    beforeAll(async () => {
        database.authenticate()
    })

    afterAll(async () => {
        if (id) {
            await User.destroy({
                where: { 
                    id: id
                }
            })
        }
        database.close()
    })

    it("tests if is possible to make a session and generate token", async () => {
        const responseUser = await request(app).post("/users").send({
            name: "thiago",
            email: "thiago@email.com",
            password: "1234567"
        })

        expect(responseUser.body).toHaveProperty("id") 

        const responseSession = await request(app).post("/sessions").send({
            email: responseUser.body.email,
            password: "1234567"
        })

        expect(responseSession.statusCode).toBe(200)
        expect(responseSession.body).toHaveProperty("token")

        await User.destroy({
            where: {
                id: responseUser.body.id
            }
        })
    })

    it("tests if is possible to make a session with wrong passowrd", async () => {
        const responseUser = await request(app).post("/users").send({
            name: "bruno",
            email: "bruno@email.com",
            password: "1234567"
        })

        expect(responseUser.body).toHaveProperty("id")

        id = responseUser.body.id

        const responseSession = await request(app).post("/sessions").send({
            email: responseUser.body.email,
            password: "12345678"
        })

        expect(responseSession.statusCode).toBe(400)
        expect(responseSession.body.message).toBe("invalid email or password")
    })
})