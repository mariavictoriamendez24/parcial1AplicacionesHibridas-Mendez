import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import dietas_routes from "./routes/dietas_routes.js"
import nutricionista_routes from "./routes/nutricionista_routes.js"
import usuarios_routes from "./routes/usuarios_routes.js"
import auth from "./routes/auth.js"




mongoose
    .connect(process.env.MONGO_DAPLOY)
    .then(() => console.log("conectados al db"))
    .catch(() => console.log("error al conectar"))

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/dietas", dietas_routes)
app.use("/nutricionista", nutricionista_routes)
app.use("/users", usuarios_routes)
app.use("/login", auth)

const port = process.env.PORT || 3002
app.listen(port)

