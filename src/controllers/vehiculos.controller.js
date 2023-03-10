import { pool } from '../db.js';

/* obtener todos los vehiculos */
export const getVehiculos = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM vehiculos');
        res.status(200).json({ rows });
    } catch (error) {
        return res.status(500).json({
            message: 'Algo no ha ocurrido bien',
        });
    }
};

/* obtener un vehiculo en especifico por id*/
export const getVehiculo = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM vehiculos WHERE id_vehiculo = ?',
            [req.params.id]
        );

        if (rows.length <= 0)
            return res.status(404).json({
                message: 'El vehiculo no existe',
            });
        res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo no ha ocurrido bien',
        });
    }
};

/* crear un vehiculo */

export const postVehiculo = async (req, res) => {
	const { id_usuarios, tipo_vehiculo, placa, marca, modelo, color } = req.body;

    if( !tipo_vehiculo || !placa || !marca || !modelo || !color ) return res.status(400).json({ message : " Campos sin diligenciar, por favor, llene todos los campos " })

	try {
		const [rows] = await pool.query(
			"INSERT INTO vehiculos (id_usuarios, tipo_vehiculo, placa, marca, modelo, color) VALUES (?, ?, ?, ?, ?, ?)",
			[id_usuarios, tipo_vehiculo, placa, marca, modelo, color]
		);
		res.status(200).send({
			id: rows.insertId,
            tipo_vehiculo,
			placa,
			marca,
			modelo,
			color,
		});
	} catch (error) {
		return res.status(500).json({
			message: "ALgo va mal",
		});
	}
};

/* Eliminar un vehiculo */
export const deleteVehiculo = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM vehiculos WHERE id_vehiculo = ?',
            [req.params.id]
        );

        if (result.affectedRows <= 0)
            return res
                .status(404)
                .json({ message: 'El vehiculo no se encuentra registrado' });
        res.status(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo no ha ocurrido bien',
        });
    }
};

/* Actualizar un vehiculo */
export const putVehiculo = async (req, res) => {
    const { id } = req.params;
    const { tipo_vehiculo, placa, marca, modelo, color } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE vehiculos SET tipo_vehiculo = IFNULL(?, tipo_vehiculo), placa = IFNULL(?, placa), marca = IFNULL(?, marca), modelo = IFNULL(?, modelo), color = IFNULL(?, color) WHERE id_vehiculo = ?',
            [tipo_vehiculo, placa, marca, modelo, color, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({
                message:
                    'El vehiculo no ha sido eliminado debido a que no existe',
            });

        const [rows] = await pool.query(
            'SELECT * FROM vehiculos WHERE id_vehiculo = ?',
            [id]
        );
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo no ha ocurrido bien',
        });
    }
};
