/// Importações
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

// Schema e Model
const UsuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    usuario: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
    statusConta: {type: String, required: true} // primeiroAcesso, ativa, inativa

    /* vinculos:
    pedidosEnviados,
    pedidosRecebidos
    publicacoes: */
})
const UsuarioModel = mongoose.model('Usuario',UsuarioSchema)

// Classe

class Usuario {

    constructor(body) {
        this.dados = body;
        this.erros = {
            nome: "",
            usuario: "",
            email: "",
            senha: ""
        };
        this.novaSenhaGerada = null;
        this.usuario = null;
        this.valido = true;
    }


    limpar() {

        // Garantia que todos os campos serão string
        for (const chave in this.dados) {
            if (typeof chave !== 'string') {
                this.dados[chave] = ""
            }
            this.dados[chave].trim()
        }

        // Armazenamento de campos de interesse
        this.dados = {
            nome: this.dados.nome,
            usuario: this.dados.usuario,
            email: this.dados.email,
            senha: this.dados.senha
        }
    }

    validar() {

        this.limpar()

        let regex = ""

        // Nome
        regex = /^([a-zA-Zà-úÀ-Ú '])+$/
        if (regex.test(this.dados.nome)) {
            if (this.dados.nome.length < 5) {
                this.erros.nome = "Pelo menos 5 caracteres."
            }
        } else {
            this.erros.nome = "Nome inválido."
        }

        // Usuario
        regex = /^([a-z0-9])+$/
        if (regex.test(this.dados.usuario)) {
            if (this.dados.usuario.length < 5) {
                this.erros.usuario = "Pelo menos 5 caracteres."
            }
        } else {
            this.erros.usuario = "Usuário inválido."
        }

        // E-mail
        regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if (!regex.test(this.dados.email)) {
            this.erros.email = "Email inválido."
        }

        // Senha
        regex = /^([a-zA-Z0-9])+$/
        if (regex.test(this.dados.senha)) {
            if (this.dados.senha.length < 6) {
                this.erros.senha = "Pelo menos 6 caracteres."    
            }
        } else {
            this.erros.senha = "Apenas letras e/ou números."
        }
        
        // Resultado da validação
        for (const chave in this.erros) {
            if (this.erros[chave] !== "") this.valido = false
        }
    }

    async verificarEmail() {
        this.usuario = await UsuarioModel.findOne({email: this.dados.email}).lean()

        if (this.usuario) {
            this.erros.email = "Email já utilizado em outra conta."
            this.valido = false
        }
        return
    }

    async verificarUsuario() {
        this.usuario = await UsuarioModel.findOne({usuario: this.dados.usuario}).lean()

        if (this.usuario) {
            this.erros.usuario = "Nome de usuário indisponível."
            this.valido = false
        }
        return
    }

    async acharPorId(id) {
        this.usuario = await UsuarioModel.findOne({_id: id})
        return
    }

    async acharPorEmail(email) {
        this.usuario = await UsuarioModel.findOne({email: email}).lean()
        if (!this.usuario) {
            this.erros.email = "Email não encontrado."
            this.valido = false
        }
        return
    }

    hashSenha(senha) {
        try {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(senha, salt);
            return hash
        } catch(e) {
            this.erros.senha = "Erro ao criptografar a senha."
            this.valido = false
            return null
        }
    }

    async gerarNovaSenha(id) {

        try {

            const novaSenha = Math.random().toString(36).slice(-6) // 6 caracteres
            this.novaSenhaGerada = novaSenha
            const hash = this.hashSenha(novaSenha)
            console.log(this.novaSenhaGerada, hash)
            this.usuario = await UsuarioModel.findOneAndUpdate({_id: id}, {senha: hash}, {new: true})
            return

        } catch(e) {
            
            console.log(e)
            this.valido = false
            return

        }

        return
        
    }

    async enviarEmail(tipo) {

        // Textos para o e-mail a ser enviado em função do tipo de envio
        const opcoes = {
            
            dadosRecuperados: {
                assunto: `Mini Rede Social (Recuperação de dados)`,
                texto: ``,
                html: `<h2>Olá, ${this.usuario.nome}.</h2> <h2>Recuperação de dados.</h2> <h2>Nome de usuário:</h2> <h1 style="color: blue">${this.usuario.usuario}</h1> <h2>Nova senha de acesso:</h2> <h1 style="color: blue">${this.novaSenhaGerada}</h1>`
            }
        }

        // Seleção do texto em função tipo passado como parâmetro
        var assunto = opcoes[tipo].assunto
        var texto = opcoes[tipo].texto
        var html = opcoes[tipo].html

        // Transportador
        let transporter = nodemailer.createTransport({
            host: process.env.emailServico,
            port: process.env.emailPorta,
            secure: false,
            auth: {
                user: process.env.emailUsuario,
                pass: process.env.emailSenha
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Opções
        let mailOptions = {
            from: process.env.emailUsuario,
            to: this.usuario.email,
            subject: assunto,
            text: texto,
            html: html
        };

        // Envio
        try {
            transporter.sendMail(mailOptions, () => {})
            return
        } catch(e) {
            console.log(e)
            this.valido = false
            return
        }
    }

    async listarUsuarios() {
        const resultado = UsuarioModel.find().sort({nome: 'asc'}).lean()
        return resultado
    }

    async registrar() {

        // Validação
        this.validar()
        if (!this.valido) return

        // Verificação de duplicidade de e-mail
        await this.verificarEmail()
        if (!this.valido) return

        // Verificação de duplicidade de nome de usuário
        await this.verificarUsuario()
        if (!this.valido) return

        // Hash de senha
        this.dados.senha = this.hashSenha(this.dados.senha)
        if (!this.valido) return

        // Criação do atributo statusConta em this.dados e atribuição de valor inicial
        this.dados.statusConta = "primeiroAcesso"

        // Criação do usuário no banco de dados
        this.usuario = await UsuarioModel.create(this.dados)
        console.log('Passei da criação de usuário no banco')
    }

    async verificarLogin(usuario, senha) {
        
        this.usuario = await UsuarioModel.findOne({usuario: usuario}).lean()

        if (!this.usuario) {
            this.valido = false
            return
        }

        if (!bcrypt.compareSync(senha, this.usuario.senha)){
            this.valido = false;
            return
        }
    }

}

export default {
    Usuario
}