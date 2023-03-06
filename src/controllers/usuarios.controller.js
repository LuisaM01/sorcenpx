import { pool } from '../db.js';

/* Obtener todos los usuarios */
export const getUsuarios = async (req, res) => {
    try {
        // throw new Error("DB error")
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};

/* Obtener un usuario por id */
export const getUsuario = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE id_usuarios = ?',
            [req.params.id]
        );

        if (rows.length <= 0)
            return res.status(404).json({
                message: 'El usuario no existe',
            });

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};

/* Crear usuarios */
export const postUsuarios = async (req, res) => {
    const { nombre, apellido, correo, contrasena } = req.body;
    try {
        const [rows] = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, correo, contrasena) VALUES (?, ?, ?, ?)',
            [nombre, apellido, correo, contrasena]
        );
        res.send({
            id: rows.insertId,
            nombre,
            apellido,
            correo,
            contrasena,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};

/* Eliminar un usuario en especifico */
export const deleteUsuarios = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM usuarios WHERE id_usuarios = ?',
            [req.params.id]
        );

        if (result.affectedRows <= 0)
            return res.status(404).json({
                message: 'Usuario no existe',
            });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};

/* Actualizar un usuario en especifico */
export const putUsuarios = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, contrasena } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE usuarios SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), correo = IFNULL(?, correo), contrasena = IFNULL(?, contrasena) WHERE id_usuarios = ?',
            [nombre, apellido, correo, contrasena, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({
                message: 'No se puede actualizar ya que el usuario no existe.',
            });

        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE id_usuarios = ?',
            [id]
        );
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'ALgo va mal',
        });
    }
};
