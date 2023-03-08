// imports
import express from "express";
import cors from "cors";
import bcryptsjs from 'bcryptjs'

// imported routes
import usuariosRoutes from "./routes/usuarios.routes.js";
import vehiculosRoutes from "./routes/vehiculos.routes.js"
import reportesRoutes from "./routes/reportes.routes.js"
import entrada_salidaRoutes from "./routes/entrada_salida.routes.js"
import aseguradoraRoutes from "./routes/aseguradora.routes.js"
import facturaRoutes from "./routes/factura.routes.js"

/* module initialization */
const app = express();

app.use(cors());

app.use(express.json());

// Endpoints
app.use("/api", usuariosRoutes);
app.use("/api", vehiculosRoutes);
app.use("/api", reportesRoutes);
app.use("/api", entrada_salidaRoutes);
app.use("/api", aseguradoraRoutes);
app.use("/api", facturaRoutes);


app.use((req, res, next) => {
	res.status(404).json({
		message: "ENDPOINT NO ENCONTRADA",
	});
});


export default app;
