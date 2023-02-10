

const formCriarConta = (req, res) => {
    res.render('home/formCriarConta', {
        layout: 'mainHome'
    })
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