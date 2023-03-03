import {verifyToken} from "../config/token.js"
import parseurl from 'parseurl'

const ADMIN = 'admin'
const USER = 'user'
const PUBLIC = 'public'

const protectedPath = (pathname) => {
    const adminPath = [''];
    const userPath = ['userPath'];
    
    const protectedAdmin = adminPath.includes(pathname)
    const protectedUser = userPath.includes(pathname)
    let type = protectedAdmin ? ADMIN : protectedUser ? USER : PUBLIC
    
    return type
}

const accesAutorized = (pathname, userData) => {
    const typePath = protectedPath(pathname)
    
    // etre admin et accede a une route admin
    const adminAcess = userData && userData.admin ? typePath === ADMIN : false
    
    // etre connecter et accede a une route user
    const userAcess = userData && userData.user ? typePath === USER : false
    
    // route public
    const publicAcess = typePath === PUBLIC 
    
    return (publicAcess || adminAcess || userAcess) ? true : false 

}


export default async(req, res, next) => {
    // recupere la route a la quel on souhaite acceder
    const pathname = parseurl(req).pathname.split('/')[1];
    
    console.log(pathname)
    
    // Bear jdlsqdjsqdsq5d6sq74d654sqd4qs6d68sq4d6qs4d
    const headersAuth = req.headers['authorization']
    
    // ['Bear','jdlsqdjsqdsq5d6sq74d654sqd4qs6d68sq4d6qs4d']
    const token = headersAuth ? headersAuth.split(' ')[1] : null
    
    try{
        // ton verrifie le token
        const userData = await verifyToken(token)
        // on verrifie si la route est autoriser
        const acces = accesAutorized(pathname,userData)
        // la reponse dans le cas ou la route n'est pas autoriser
        const response = {response:false, msg:'acces refuser'}
        
        return acces ? next() : res.json(response)
    }catch(err) {
        console.log(err)
        res.sendStatus(401)
    }
}