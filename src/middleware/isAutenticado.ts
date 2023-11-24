import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
    sub: string
}

export function isAutenticado(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const autToken = req.headers.authorization

    if (!autToken) {
        return res.json({dados: 'Token Invalido'})
    }

    const [, token] = autToken.split(' ')

    try {
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload
        req.user_id = sub
        return next()
    } catch (err) {
        return res.json({dados: 'Token Invalido'})
    }
}