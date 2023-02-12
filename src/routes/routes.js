// Express
import express from 'express'
const router = express.Router();

// Controllers
import homeController from "../controllers/homeController.js"
import usuarioController from "../controllers/usuarioController.js"

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

// Home - Login
router.post('/login', homeController.verificarLogin)

// Usuario
router.get('/usuario', usuarioController.telaPrincipal)

export default router
