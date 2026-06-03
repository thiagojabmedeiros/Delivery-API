import User from "../models/User";
import database from "../database/db";
import app from "../app";
import request from "supertest"

describe("user controller tests", () => {
    let id:string

    beforeAll(async () => {
        await database.authenticate()
    })
    afterAll(async () => {
        if (id) {
            await User.destroy({
                where: {
                    id: id
                }
            })
        }
        await database.close()
    })

    it("tests if create user with usual role", async () => {
        const response = await request(app).post("/users").send({
            name: "thiago",
            email: "thiago@email.com",
            password: "1234567"
        })
        console.log(response.body)

        expect(response.statusCode).toBe(201)
        expect(response.body.role).toBe("costumer")
        expect(response.body).toHaveProperty("id")

        id = response.body.id
    })

    it("tests if can create users with same e-mail", async () => {
        const response = await request(app).post("/users").send({
            name: "bruno",
            role: "seller",
            email: "thiago@email.com",
            password: "341244"
        })

        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe("another user already asigned this email")
    })

    it("tests if user has no order yet", async () => {
        const response = await request(app).get(`/users/${id}/orders`)
        
        expect(response.body.message).toBe("user has not ordered anything yet")
        expect(response.statusCode).toBe(400)
    })
})