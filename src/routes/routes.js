// Express
import express from 'express'
const router = express.Router();

// Controllers
import homeController from "../controllers/homeController.js"

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

// Home - Criar nova conta + Envio de senha inicial
router.get('/criar-conta', homeController.formCriarConta)
// router.post('/criar-conta', homeController.criaConta)
// router.get('/enviar-senha-inicial/:id?', homeController.msgEmailSenhaInicial)
// router.post('/enviar-senha-inicial', homeController.enviaSenhaInicial)

export default router
