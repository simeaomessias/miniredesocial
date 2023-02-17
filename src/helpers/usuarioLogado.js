// Helper para permitir que apenas usuários autenticados tenham acesso a certas rotas

const usuarioLogado = (req, res, next) => {
    if (req.session.usuarioLogado) {
        return next()
    }
    req.flash('msgErro', "Você precisar fazer login para acessar esse conteúdo.")
    return res.redirect('/')
}

export default usuarioLogado