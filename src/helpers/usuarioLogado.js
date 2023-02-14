// Helper para permitir que apenas usuários autenticados tenham acesso a certas rotas

const usuarioLogado = (req, res, next) => {
    console.log(`Entrei no Helper "usuarioLogado"`)
    console.log(req.session.usuarioLogado)
    if (req.session.usuarioLogado) {
        return next()
    }
    req.flash('msgErro', "Você precisar fazer login para acessar esse conteúdo.")
    return res.redirect('/')
}

export default usuarioLogado