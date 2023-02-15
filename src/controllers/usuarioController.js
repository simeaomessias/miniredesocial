import UsuarioModel from '../models/UsuarioModel.js'
const Usuario = UsuarioModel.Usuario

// Tela Principal
const telaPrincipal = (req, res) => {
    
    res.render('usuario/index', {
        layout: 'mainUsuario',
        usuarioId: req.session.usuarioLogado.id,
        usuarioNome: req.session.usuarioLogado.nome,
        usuarioUsuario: req.session.usuarioLogado.usuario
    })
}

// Meus contatos
const meusContatos = (req, res) => {
    res.render('usuario/meusContatos', {
        layout: 'mainUsuario',
        usuarioId: req.session.usuarioLogado.id,
        usuarioNome: req.session.usuarioLogado.nome,
        usuarioUsuario: req.session.usuarioLogado.usuario
    })
}

// Minhas postagens
const minhasPostagens = (req, res) => {
    res.render('usuario/minhasPostagens', {
        layout: 'mainUsuario',
        usuarioId: req.session.usuarioLogado.id,
        usuarioNome: req.session.usuarioLogado.nome,
        usuarioUsuario: req.session.usuarioLogado.usuario
    })
}

// Minha conta
const minhaConta = (req, res) => {
    res.render('usuario/minhaConta', {
        layout: 'mainUsuario',
        usuarioId: req.session.usuarioLogado.id,
        usuarioNome: req.session.usuarioLogado.nome,
        usuarioUsuario: req.session.usuarioLogado.usuario
    })
}

export default {
    telaPrincipal,
    meusContatos,
    minhasPostagens,
    minhaConta
}