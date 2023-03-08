import { pool } from "../db.js";

/* obtener todos los reportes */
export const getReportes = async (req, res) => {
	try {
		const [rows] = await pool.execute("SELECT * FROM reportes");
		res.status(200).json({ rows });
	} catch (error) {
		return res.status(500).json({
			message: "Algo no ha ocurrido bien",
		});
	}
};

/* obtener un reporte en especifico por id*/
export const getReporte = async (req, res) => {
	try {
		const [rows] = await pool.query(
			"SELECT * FROM reportes WHERE id_reportes = ?",
			[req.params.id]
		);

		if (rows.length <= 0)
			return res.status(404).json({
				message: "El reporte no existe",
			});
		res.status(200).json(rows[0]);
	} catch (error) {
		return res.status(500).json({
			message: "Algo no ha ocurrido bien",
		});
	}
};

/* crear un reporte */
export const postReporte = async ({ body }, res) => {
	const { id_usuarios, descripcion } = body;

	try {
		const [rows] = await pool.query(
			"INSERT INTO reportes (id_usuarios, descripcion) VALUES (?)",
			[id_usuarios, descripcion]
		);

		res.status(200).send({
			id: rows.insertId,
			descripcion,
		});
	} catch (error) {
		return res.status(500).json({
			msg: "Something went wrong!",
		});
	}
};

/* Eliminar un reporte */
export const deleteReporte = async (req, res) => {
	try {
		const [result] = await pool.query(
			"DELETE FROM reportes WHERE id_reportes = ?",
			[req.params.id]
		);

		if (result.affectedRows <= 0)
			return res
				.status(404)
				.json({ message: "El reporte no se encuentra creado" });
		res.status(204).json({
			message: "Reporte eliminado correctamente",
		});
	} catch (error) {
		return res.status(500).json({
			message: "Algo no ha ocurrido bien",
		});
	}
};

/* Actualizar un reporte */
export const putReporte = async (req, res) => {
	const { id } = req.params;
	const { descripcion } = req.body;

	try {
		const [result] = await pool.query(
			"UPDATE reportes SET descripcion = IFNULL(?, descripcion) WHERE id_reportes = ?",
			[descripcion, id]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({
				message:
					"El reporte no ha sido eliminado debido a que no existe",
			});

		const [rows] = await pool.query(
			"SELECT * FROM reportes WHERE id_reportes = ?",
			[id]
		);
		res.json(rows[0]);
	} catch (error) {
		return res.status(500).json({
			message: "Algo no ha ocurrido bien",
		});
	}
};
