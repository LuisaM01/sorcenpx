import { pool } from '../db.js';

/* Obtener todas las aseguradoras */
export const getAseguradoras = async (req, res) => {
    try {
        // throw new Error("DB error")
        const [rows] = await pool.execute('SELECT * FROM aseguradora');
        res.status(200).json({ rows });
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};

/* Obtener una aseguradora por id */
export const getAseguradora = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM aseguradora WHERE id_aseguradora = ?',
            [req.params.id]
        );

        if (rows.length <= 0)
            return res.status(404).json({
                message: 'La aseguradora no existe',
            });

        res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};

/* Crear aseguradora */
export const postAseguradora = async (req, res) => {
    const {
        id_vehiculo,
        nombre_aseguradora,
        fecha_expedicion,
        fecha_vencimiento,
    } = req.body;
    try {
        const [rows] = await pool.query(
            'INSERT INTO aseguradora (id_vehiculo, nombre_aseguradora, fecha_expedicion, fecha_vencimiento) VALUES (?, ?, ?, ?)',
            [
                id_vehiculo,
                nombre_aseguradora,
                fecha_expedicion,
                fecha_vencimiento,
            ]
        );
        res.status(200).send({
            id: rows.insertId,
            id_vehiculo,
            nombre_aseguradora,
            fecha_expedicion,
            fecha_vencimiento,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Algo va mal',
        });
    }
};

/* Eliminar una aseguradora en especifico */
export const deleteAseguradora = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM aseguradora WHERE id_aseguradora = ?',
            [req.params.id]
        );

        if (result.affectedRows <= 0)
            return res.status(404).json({
                message: 'La aseguradora no existe',
            });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};

/* Actualizar una aseguradora en especifico */
export const putAseguradora = async (req, res) => {
    const { id } = req.params;
    const {
        id_vehiculo,
        nombre_aseguradora,
        fecha_expedicion,
        fecha_vencimiento,
    } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE aseguradora SET id_vehiculo = IFNULL(?, id_vehiculo), nombre_aseguradora = IFNULL(?, nombre_aseguradora), fecha_expedicion = IFNULL(?, fecha_expedicion), fecha_vencimiento = IFNULL(?, fecha_vencimiento) WHERE id_aseguradora = ? ',
            [
                id_vehiculo,
                nombre_aseguradora,
                fecha_expedicion,
                fecha_vencimiento,
                id,
            ]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({
                message:
                    'No se puede actualizar ya que la aseguradora no existe.',
            });

        const [rows] = await pool.query(
            'SELECT * FROM aseguradora WHERE id_aseguradora = ?',
            [id]
        );
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};
