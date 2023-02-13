import UsuarioModel from '../models/UsuarioModel.js'
const Usuario = UsuarioModel.Usuario

// Home - Criar nova conta
const formCriarConta = (req, res) => {
    res.render('home/formCriarConta', {
        layout: 'mainHome'
    })
}
const criarConta = async (req, res) => {

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

        req.flash('msgSucesso', 'Conta criada com sucesso!')
        req.session.save( () => {
            return res.redirect('/')
        })

    } catch(e) {

        req.flash('msgErro', "Erro ao criar a conta!")
        req.session.save( () => {
            return res.redirect('/criar-conta')
        })
        return

    }

}

// Home - Recuperar dados
const formRecuperarDados = (req, res) => {
    res.render('home/formRecuperarDados', {
        layout: 'mainHome'
    })
}
const recuperarDados = async (req, res) => {

    console.log(req.body.email)

    try {
        const usuario = new Usuario()
        await usuario.acharPorEmail(req.body.email)

        if (!usuario.valido) {
            req.session.save( () => {
                return res.render('home/formRecuperarDados', {
                    layout: 'mainHome',
                    email: req.body.email,
                    erros: usuario.erros
                })
            })
            return
        }

        req.session.save( () => {
            return res.redirect(`/enviar-dados-recuperados/${usuario.usuario._id.toString()}`)
        })
        return


    } catch(e) {

        req.flash('msgErro', `Erro ao recuperar os dados. Tente novamente.`)
        req.session.save( () => {
            return res.redirect('/recuperar-dados')
        })
        return
    }
}
const msgEmailDadosRecuperados = (req, res) => {

    res.render('home/msgEnviandoDadosRecuperados', {
        layout: 'mainHome',
        id: req.params.id
    })
    return;

}
const enviarDadosRecuperados = async (req, res) => {

    try {
        const usuario = new Usuario()
        await usuario.acharPorId(req.body.id)
    
        if (usuario.usuario === null) {
            req.flash('msgErro', "Erro ao enviar os dados. E-mail não cadastrado.")
            req.session.save( () => {
                res.redirect('/recuperar-dados')
            })
            return
        }

        await usuario.enviarSenha('dadosRecuperados')

        if (!usuario.valido) {
            req.flash('msgErro', `Erro ao enviar os dados por e-mail. Tente novamente.`)
            req.session.save( () => {
                res.redirect('/recuperar-dados')
            })
            return
        }

        req.flash('msgSucesso',
         `Dados enviados! Remetente: sm-remetente@outlook.com". Verifique a pasta de Spam.`
         )
        req.session.save( () => {
            return res.redirect('/')
        })
        return

    } catch(e) {

        req.flash('msgErro', `Erro ao enviar os dados por e-mail. Tente novamente.`)
        req.session.save( () => {
            return res.redirect('/recuperar-dados')
        })
        return
    }
}

// Home - Login e Logout
const verificarLogin = async (req, res) => {

    const usuario = new Usuario()
    await usuario.verificarLogin(req.body.usuario, req.body.senha)

    if (!usuario.valido) {
        req.session.save( () => {
            res.render('home/index', {
                layout: 'mainHome',
                usuario: req.body.usuario,
                senha: req.body.senha,
                erro: "E-mail e/ou senha incorretos."
            })
            return
        })
        return
    }

    return res.redirect(`/usuario`)
}
const logout = (req, res) => {
    /*
    req.session.destroy()
    return res. redirect('/')
    */

    // BLOG APP
    /*
    req.logout()
    req.flash("succcess_msg","Logout efetuado com sucesso!" )
    res.redirect('/')
    */
}

export default {
    formCriarConta,
    criarConta,
    formRecuperarDados,
    recuperarDados,
    msgEmailDadosRecuperados,
    enviarDadosRecuperados,
    verificarLogin,
    logout
}