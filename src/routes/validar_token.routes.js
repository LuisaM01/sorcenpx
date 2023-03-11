import jwt from 'jsonwebtoken'

const validarToken = (req, res, next) => {

    const headerToken = req.headers['authorization']
    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
       
        try {

            /*  tiene token  */
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'Stigmata14')
            next()    
        } catch (error) {
            res.status(401).json({message: "Token no valido"})    
        }
        
    } else {
        res.status(401).json({message: "acceso denegado"})
    }
}

export default validarToken
