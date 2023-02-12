import UsuarioModel from '../models/UsuarioModel.js'
const Usuario = UsuarioModel.Usuario

// Tela Principal
const telaPrincipal = (req, res) => {
    res.render('usuario/index', {
        layout: 'mainUsuario'
    })
}

export default {
    telaPrincipal
}