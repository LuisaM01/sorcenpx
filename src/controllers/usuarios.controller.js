import { pool } from "../db.js";
import bcrypt from "bcryptjs"

/* Obtener todos los usuarios */
export const getUsuarios = async (req, res) => {
	try {
		// throw new Error("DB error")
		const [rows] = await pool.execute("SELECT * FROM usuarios");
		res.status(200).json({ rows });
	} catch (error) {
		return res.status(500).json({message: "ALgo va mal",});
	}
};

/* Obtener un usuario por id */
export const getUsuario = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM usuarios WHERE id_usuarios = ?",[req.params.id]);

		if (rows.length <= 0)
			return res.status(404).json({message: "El usuario no existe",});

		res.status(200).json(rows[0]);
	} catch (error) {
		return res.status(500).json({message: "ALgo va mal",});
	}
};

/* Crear usuarios */
export const postUsuarios = async (req, res, next) => {
    const { nombre, apellido, correo, contrasena } = req.body;

    /* Validamos que el usuario digite todos los campos y que tenga como minimo 8 digitos en la contrasena*/
    if( !nombre || !apellido || !correo || !contrasena ) return res.status(400).json({ message : " Campos sin diligenciar, por favor, llene todos los campos " }) 
    if (contrasena.length < 8) return res.status(400).json({ message : " La contrasena debe tener minimo 8 digitos " })

	/* Verificamos si el usuario ya existe en la base de datos */
    const userExists = await pool.query('SELECT * FROM usuarios WHERE correo = ?',[correo]);
    if (userExists > [0]) return res.status(400).json({ message: 'El usuario ya esta registrado' });

	/* encriptamos contrasena y enviamos los datos a la base de datos */
    try {
        let passHash = await bcrypt.hash(contrasena, 10);
        const [rows] = await pool.query('INSERT INTO usuarios (nombre, apellido, correo, contrasena) VALUES (?, ?, ?, ?)',[nombre, apellido, correo, passHash]
        );
        res.status(200).json({ msg: 'usuario creado exitosamente' });
    } catch (error) {
        return res.status(500).json({
            message: 'Algo va mal',
            error,
        });
    }
};

/* Eliminar un usuario en especifico */
export const deleteUsuarios = async (req, res) => {
	try {
		const [result] = await pool.query("DELETE FROM usuarios WHERE id_usuarios = ?",[req.params.id]);

		if (result.affectedRows <= 0)
			return res.status(404).json({message: "Usuario no existe",});

		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({message: "ALgo va mal",});
	}
};

/* Actualizar un usuario en especifico */
export const putUsuarios = async (req, res) => {
	const { id } = req.params;
	const { nombre, apellido, correo } = req.body;

	/* Verificamos si el usuario ya existe en la base de datos */
	const userExists = await pool.query('SELECT * FROM usuarios WHERE correo = ?',[correo]);
	if (userExists > [0]) return res.status(400).json({ message: 'El correo ya esta en uso' });

	try {
		const [result] = await pool.query("UPDATE usuarios SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), correo = IFNULL(?, correo) WHERE id_usuarios = ?",[nombre, apellido, correo, id]);

		if (result.affectedRows === 0)
			return res.status(404).json({message: "No se puede actualizar ya que el usuario no existe.",});

		const [rows] = await pool.query("SELECT * FROM usuarios WHERE id_usuarios = ?", [id]);
		res.json(rows[0]);
	} catch (error) {
		return res.status(500).json({message: "ALgo va mal",});
	}
};

export const putUserPassword = async (req, res) => {
	const { id } = req.params;
	const { contrasena } = req.body;

	let passHash = await bcrypt.hash(contrasena, 10);

	try {
		const [result] = await pool.query("UPDATE usuarios SET contrasena = ? WHERE id_usuarios = ?", [passHash, id]);

		if (result.affectedRows === 0)
			return res.status(404).json({message: "No se puede actualizar ya que el usuario no existe.",});

		const [rows] = await pool.query("SELECT * FROM usuarios WHERE id_usuarios = ?",[id]);
		res.json(rows[0]);
	} catch (error) {
		return res.status(500).json({message: "ALgo va mal",});
	}
};
