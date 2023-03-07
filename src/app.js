// imported modules
import express from "express";
import cors from "cors";

// imported routes
import usuariosRoutes from "./routes/usuarios.routes.js";
import vehiculosRoutes from "./routes/vehiculos.routes.js"
import reportesRoutes from "./routes/reportes.routes.js"

/* module initialization */
const app = express();

app.use(cors());

app.use(express.json());

// Endpoints
app.use("/api", usuariosRoutes);
app.use("/api", vehiculosRoutes);
app.use("/api", reportesRoutes);
// app.use("/api", usuariosRoutes);


app.use((req, res, next) => {
	res.status(404).json({
		message: "ENDPOINT NO ENCONTRADA",
	});
});


export default app;
