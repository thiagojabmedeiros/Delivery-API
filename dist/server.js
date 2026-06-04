"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./database/db"));
const app_1 = __importDefault(require("./app"));
const env_1 = __importDefault(require("./env"));
const PORT = env_1.default.PORT;
app_1.default.listen(PORT, async () => {
    try {
        await db_1.default.authenticate();
        console.log(`server in running on ${PORT}`);
    }
    catch (error) {
        console.log("unable to connect database", error);
    }
});
