// Express
import express from 'express'
const router = express.Router();

// Controllers
import homeController from "../controllers/homeController.js"
import usuarioController from "../controllers/usuarioController.js"

// Helpers
import usuarioLogado from '../helpers/usuarioLogado.js'

// Home
router.get('/', (req, res) => {

    const postagens = [
        {
            usuario: "@usuariocomum",
            nome: "Fernando Henrique",
            hora: "07/02/23 - 20h45",
            conteudo: "Minha primeira publicação!",
            reacoes: ["@tammyriscarvalho", "marcosmessias"]
        },
        {
            usuario: "@usuariocomum",
            nome: "Fernando Henrique",
            hora: "07/02/23 - 20h45",
            conteudo: "Minha primeira publicação!",
            reacoes: ["@tammyriscarvalho", "marcosmessias"]
        },
        {
            usuario: "@usuariocomum",
            nome: "Fernando Henrique",
            hora: "07/02/23 - 20h45",
            conteudo: "Minha primeira publicação!",
            reacoes: ["@tammyriscarvalho", "marcosmessias"]
        },
        {
            usuario: "@usuariocomum",
            nome: "Fernando Henrique",
            hora: "07/02/23 - 20h45",
            conteudo: "Minha primeira publicação!",
            reacoes: ["@tammyriscarvalho", "marcosmessias"]
        },
        {
            usuario: "@usuariocomum",
            nome: "Fernando Henrique",
            hora: "07/02/23 - 20h45",
            conteudo: "Minha primeira publicação!",
            reacoes: ["@tammyriscarvalho", "marcosmessias"]
        },
        
    ]


    res.render('home/index', {
        layout: 'mainHome',
        postagens: postagens
    })
})

// Home - Criar nova conta
router.get('/criar-conta', homeController.formCriarConta)
router.post('/criar-conta', homeController.criarConta)

// Home - Recuperar dados
router.get('/recuperar-dados', homeController.formRecuperarDados)
router.post('/recuperar-dados', homeController.recuperarDados)
router.get('/enviar-dados-recuperados/:id?', homeController.msgEmailDadosRecuperados)
router.post('/enviar-dados-recuperados/:id?', homeController.enviarDadosRecuperados)

// Home - Login e Logout
router.post('/login', homeController.verificarLogin)
router.get('/logout', homeController.logout)

// Usuário - Ativar conta
router.get('/usuario/ativar-conta', usuarioLogado, homeController.formAtivarConta)
router.post('/usuario/ativar-conta', usuarioLogado, homeController.ativarConta)

// Usuario
router.get('/usuario', usuarioLogado, usuarioController.telaPrincipal)
router.get('/usuario/meus-contatos', usuarioLogado, usuarioController.meusContatos)
router.get('/usuario/minhas-postagens', usuarioLogado, usuarioController.minhasPostagens)
router.get('/usuario/minha-conta', usuarioLogado, usuarioController.minhaConta)



export default router



/*

BLOGAPP

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuario/login',
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash("succcess_msg","Logout efetuado com sucesso!" )
    res.redirect('/')
})

You can call req.logout() which will invalidate the session on the server side.
So even if the user sends a cookie, the cookie id will no longer be found in the session store,
so the user will no longer be able to access resources which require authentication.
*/
