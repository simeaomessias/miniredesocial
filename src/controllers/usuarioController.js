import UsuarioModel from '../models/UsuarioModel.js'
const Usuario = UsuarioModel.Usuario

// Tela Principal
const telaPrincipal = (req, res) => {
    res.render('usuario/index', {
        layout: 'mainUsuario'
    })
}

// Minha conta
const minhaConta = (req, res) => {
    res.render('usuario/minhaConta', {
        layout: 'mainUsuario'
    })
}

export default {
    telaPrincipal,
    minhaConta
}