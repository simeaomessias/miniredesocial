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
        console.log(e)
        req.session.save( () => {
            return res.redirect('/criar-conta')
        })
        return

    }

}

// Home - Ativar conta
const formAtivarConta = (req, res) => {

    res.render('home/formAtivarConta', {
        layout: 'mainHome',
        usuario: req.session.usuarioLogado.usuario,
        email: req.session.usuarioLogado.email
    })

}
const ativarConta = async (req, res) => {

    try {
        
        const usuario = new Usuario()

        await usuario.ativarConta(req.session.usuarioLogado.id, req.body.codigo)

        if (!usuario.valido) {
            req.session.save( () => {
                return res.render('home/formAtivarConta', {
                    layout: 'mainHome',
                    usuario: req.session.usuarioLogado.usuario,
                    email: req.session.usuarioLogado.email,
                    codigo: req.body.codigo,
                    erro: "Código inválido."
                })
            })
            return
        }

        req.flash('msgSucesso', "Conta ativada com sucesso!")
        req.session.save( () => {
            
            return res.redirect(`/usuario`)
        })
        return


    } catch(e) {

        req.flash('msgErro', `Erro ao ativar a conta. Tente novamente.`)
        req.session.save( () => {
            return res.redirect('/usuario/ativar-conta')
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
            req.flash('msgErro', "Erro ao enviar os dados por e-mail. E-mail não cadastrado.")
            req.session.save( () => {
                return res.redirect('/recuperar-dados')
            })
            return
        }

        await usuario.gerarNovaSenha(req.body.id)
        if (!usuario.valido) {
            req.flash('msgErro', `Erro ao enviar os dados por e-mail. Geração de senha inválida.`)
            req.session.save( () => {
                return res.redirect('/recuperar-dados')
            })
            return
        }

        await usuario.enviarEmail('dadosRecuperados')
        if (!usuario.valido) {
            req.flash('msgErro', `Erro ao enviar os dados por e-mail. Tente novamente.`)
            req.session.save( () => {
                res.redirect('/recuperar-dados')
            })
            return
        }

        req.flash('msgSucesso',`Dados enviados! Remetente: sm-remetente@outlook.com". Verifique a pasta de Spam.`
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

    // Inicialização do usuário logado
    req.session.usuarioLogado = null

    const usuario = new Usuario()
    await usuario.verificarLogin(req.body.usuario, req.body.senha)

    if (!usuario.valido) {
        req.session.save( () => {
            return res.render('home/index', {
                layout: 'mainHome',
                usuario: req.body.usuario,
                senha: req.body.senha,
                erro: "E-mail e/ou senha incorretos."
            })
        })
        return
    }

    // Especificação do usuário logado para salvar na sessão
    const usuarioLogado = {
        id: usuario.usuario._id,
        nome: usuario.usuario.nome,
        usuario: usuario.usuario.usuario,
        email: usuario.usuario.email
    }
    req.session.usuarioLogado = usuarioLogado;

    // Verificação se é o primeiro acesso
    if (usuario.usuario.statusConta === "primeiroAcesso") {
        req.session.save( () => {
            return res.redirect('/usuario/ativar-conta')
        })
        return
    }

    // Tela inicial do usuário
    req.session.save( () => {
        return res.redirect(`/usuario`)
    })

}
const logout = (req, res) => {
    req.session.destroy()
    return res. redirect('/')
}

export default {
    formCriarConta,
    criarConta,
    formAtivarConta,
    ativarConta,
    formRecuperarDados,
    recuperarDados,
    msgEmailDadosRecuperados,
    enviarDadosRecuperados,
    verificarLogin,
    logout
}