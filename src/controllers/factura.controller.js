import { pool } from '../db.js';

/* Obtener todas las facturas */
export const getFacturas = async (req, res) => {
    try {
        // throw new Error("DB error")
        const [rows] = await pool.execute('SELECT * FROM factura');
        res.status(200).json({ rows });
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};

/* Obtener una factura por id */
export const getFactura = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM factura WHERE id_factura = ?',
            [req.params.id]
        );

        if (rows.length <= 0)
            return res.status(404).json({
                message: 'La factura no existe',
            });

        res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};

/* Crear factura */
export const postFactura = async (req, res) => {
    const {
        id_usuarios,
        id_vehiculo,
        fecha_venta,
        valor,
    } = req.body;
    try {
        const [rows] = await pool.query(
            'INSERT INTO factura (id_usuarios, id_vehiculo, fecha_venta, valor) VALUES (?, ?, ?, ?)',
            [
                id_usuarios,
                id_vehiculo,
                fecha_venta,
                valor,
            ]
        );
        res.status(200).send({
            id: rows.insertId,
            id_usuarios,
            id_vehiculo,
            fecha_venta,
            valor
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Algo va mal',
        });
    }
};

/* Eliminar una factura en especifico */
export const deleteFactura = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM factura WHERE id_factura = ?',
            [req.params.id]
        );

        if (result.affectedRows <= 0)
            return res.status(404).json({
                message: 'La factura no existe',
            });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};

/* Actualizar una factura en especifico */
export const putFactura = async (req, res) => {
    const { id } = req.params;
    const {
        id_usuarios,
        id_vehiculo,
        fecha_venta,
        valor,
    } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE factura SET id_usuarios = IFNULL(?, id_usuarios), id_vehiculo = IFNULL(?, id_vehiculo), fecha_venta = IFNULL(?, fecha_venta), valor = IFNULL(?, valor) WHERE id_factura = ? ',
            [
                id_usuarios,
                id_vehiculo,
                fecha_venta,
                valor,
                id,
            ]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({
                message:
                    'No se puede actualizar ya que la factura no existe.',
            });

        const [rows] = await pool.query(
            'SELECT * FROM factura WHERE id_factura = ?',
            [id]
        );
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};
