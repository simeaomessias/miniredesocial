import UsuarioModel from '../models/UsuarioModel.js'
const Usuario = UsuarioModel.Usuario

// Tela Principal
const telaPrincipal = (req, res) => {
    
    res.render('usuario/index', {
        layout: 'mainUsuario',
        usuarioId: req.session.usuarioLogado.id,
        usuarioNome: req.session.usuarioLogado.nome
    })
}

// Minha conta
const minhaConta = (req, res) => {
    res.render('usuario/minhaConta', {
        layout: 'mainUsuario',
        usuarioId: req.session.usuarioLogado.id,
        usuarioNome: req.session.usuarioLogado.nome
    })
}

export default {
    telaPrincipal,
    minhaConta
}