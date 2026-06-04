"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const db_1 = __importDefault(require("../database/db"));
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
describe("user controller tests", () => {
    let id;
    beforeAll(async () => {
        await db_1.default.authenticate();
    });
    afterAll(async () => {
        if (id) {
            await User_1.default.destroy({
                where: {
                    id: id
                }
            });
        }
        await db_1.default.close();
    });
    it("tests if create user with usual role", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post("/users").send({
            name: "thiago",
            email: "thiago@email.com",
            password: "1234567"
        });
        console.log(response.body);
        expect(response.statusCode).toBe(201);
        expect(response.body.role).toBe("costumer");
        expect(response.body).toHaveProperty("id");
        id = response.body.id;
    });
    it("tests if can create users with same e-mail", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post("/users").send({
            name: "bruno",
            role: "seller",
            email: "thiago@email.com",
            password: "341244"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("another user already asigned this email");
    });
    it("tests if user has no order yet", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get(`/users/${id}/orders`);
        expect(response.body.message).toBe("user has not ordered anything yet");
        expect(response.statusCode).toBe(400);
    });
});
