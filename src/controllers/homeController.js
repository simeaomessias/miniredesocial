import UsuarioModel from '../models/UsuarioModel.js'
const Usuario = UsuarioModel.Usuario

const formCriarConta = (req, res) => {
    res.render('home/formCriarConta', {
        layout: 'mainHome'
    })
}

const criaConta = async (req, res) => {

    try {
        
        const usuario = new Usuario(req.body)
        
        await usuario.registrar()

        if (!usuario.valido) {
            req.session.save( () => {
                return res.render('home/formCriarConta', {
                    layout: 'mainHome',
                    usuario: usuario.dados,
                    erros: usuario.erros
                })
            })
            return
        }

       return

    } catch(e) {

        req.flash('msgErro', "Erro ao criar a conta!")
        req.session.save( () => {
            return res.redirect('/')
        })
        return

    }

}

const formRecuperarSenha = (req, res) => {
    res.render('home/formRecuperarSenha', {
        layout: 'mainHome'
    })
}

export default {
    formCriarConta,

    formRecuperarSenha
}