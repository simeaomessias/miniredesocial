const global = (req, res, next) => {

    // Variáveis para mensagens rápidas
    res.locals.msgSucesso = req.flash("msgSucesso")
    res.locals.msgErro = req.flash("msgErro")

    // Usuário que foi logado
    // res.locals.user = req.user || null

    next()
}

export default {
    global
}