// imports
import express from "express";
import cors from "cors";

import usuariosRoutes from "./routes/usuarios.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

// Endpoints
app.use("/api", usuariosRoutes);

app.use((req, res, next) => {
	res.status(404).json({
		message: "ENDPOINT NO ENCONTRADA",
	});
});

export default app;
