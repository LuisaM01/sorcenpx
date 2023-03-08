import { pool } from '../db.js';

/* Obtener todos las entradas y salidas */
export const getEntrada_salidas = async (req, res) => {
    try {
        // throw new Error("DB error")
        const [rows] = await pool.execute('SELECT * FROM entrada_salida');
        res.status(200).json({ rows });
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};

/* Obtener una entrada y salida por id */
export const getEntrada_salida = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM entrada_salida WHERE id_entrada_salida = ?',
            [req.params.id]
        );

        if (rows.length <= 0)
            return res.status(404).json({
                message: 'El registro de entrada y salida no existe',
            });

        res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};

/* Crear entrada y salida */
export const postEntrada_salida = async (req, res) => {
    const {
        id_usuarios,
        id_vehiculo,
        fecha_ingreso,
        fecha_salida,
        hora_ingreso,
        hora_salida,
    } = req.body;
    try {
        const [rows] = await pool.query(
            'INSERT INTO entrada_salida (id_usuarios, id_vehiculo, fecha_ingreso, fecha_salida, hora_ingreso, hora_salida) VALUES (?, ?, ?, ?, ?, ?)',
            [
                id_usuarios,
                id_vehiculo,
                fecha_ingreso,
                fecha_salida,
                hora_ingreso,
                hora_salida,
            ]
        );
        res.status(200).send({
            id: rows.insertId,
            id_usuarios,
            id_vehiculo,
            fecha_ingreso,
            fecha_salida,
            hora_ingreso,
            hora_salida,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Algo va mal',
        });
    }
};

/* Eliminar un entrada y salida en especifico */
export const deleteEntrada_salida = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM entrada_salida WHERE id_entrada_salida = ?',
            [req.params.id]
        );

        if (result.affectedRows <= 0)
            return res.status(404).json({
                message: 'reporte de fecha no existe',
            });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};

/* Actualizar una entrada y salida en especifico */
export const putEntrada_salida = async (req, res) => {
    const { id } = req.params;
    const {
        id_usuarios,
        id_vehiculo,
        fecha_ingreso,
        fecha_salida,
        hora_ingreso,
        hora_salida,
    } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE entrada_salida SET id_usuarios = IFNULL(?, id_usuarios), id_vehiculo = IFNULL(?, id_vehiculo), fecha_ingreso = IFNULL(?, fecha_ingreso), fecha_salida = IFNULL(?, fecha_salida),hora_ingreso = IFNULL(?, hora_ingreso), hora_salida = IFNULL(?, hora_salida) WHERE id_usuarios = ? ',
            [
                id_usuarios,
                id_vehiculo,
                fecha_ingreso,
                fecha_salida,
                hora_ingreso,
                hora_salida,
                id,
            ]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({
                message:
                    'No se puede actualizar ya que el reporte de fechas no existe.',
            });

        const [rows] = await pool.query(
            'SELECT * FROM entrada_salida WHERE id_entrada_salida = ?',
            [id]
        );
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};
