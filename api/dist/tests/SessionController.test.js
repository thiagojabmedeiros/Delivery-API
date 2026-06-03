"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../database/db"));
const supertest_1 = __importDefault(require("supertest"));
const User_1 = __importDefault(require("../models/User"));
const app_1 = __importDefault(require("../app"));
describe("session controller tests", () => {
    let id;
    beforeAll(async () => {
        db_1.default.authenticate();
    });
    afterAll(async () => {
        if (id) {
            await User_1.default.destroy({
                where: {
                    id: id
                }
            });
        }
        db_1.default.close();
    });
    it("tests if is possible to make a session and generate token", async () => {
        const responseUser = await (0, supertest_1.default)(app_1.default).post("/users").send({
            name: "thiago",
            email: "thiago@email.com",
            password: "1234567"
        });
        expect(responseUser.body).toHaveProperty("id");
        const responseSession = await (0, supertest_1.default)(app_1.default).post("/sessions").send({
            email: responseUser.body.email,
            password: "1234567"
        });
        expect(responseSession.statusCode).toBe(200);
        expect(responseSession.body).toHaveProperty("token");
        await User_1.default.destroy({
            where: {
                id: responseUser.body.id
            }
        });
    });
    it("tests if is possible to make a session with wrong passowrd", async () => {
        const responseUser = await (0, supertest_1.default)(app_1.default).post("/users").send({
            name: "bruno",
            email: "bruno@email.com",
            password: "1234567"
        });
        expect(responseUser.body).toHaveProperty("id");
        id = responseUser.body.id;
        const responseSession = await (0, supertest_1.default)(app_1.default).post("/sessions").send({
            email: responseUser.body.email,
            password: "12345678"
        });
        expect(responseSession.statusCode).toBe(400);
        expect(responseSession.body.message).toBe("invalid email or password");
    });
});
//# sourceMappingURL=SessionController.test.js.map