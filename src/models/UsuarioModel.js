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
    /* vinculos:
    pedidosEnviado,
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
            senha: "",
        };
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
        regex = /^([a-z0-9])$/
        if (!regex.test(this.dados.nome.toLowerCase())) {
            this.erros.nome = "Nome de usuário inválido."
        }

        // E-mail
        regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if (!regex.test(this.dados.email)) {
            this.erros.email = "Email inválido."
        }

        // Senha
        regex = /^([a-zA-Z0-9])$/
        if (regex.test(this.dados.senha)) {
            if (this.dados.senha.length < 6) {
                this.erros.senha = "Pelo menos 6 caracteres."    
            }
        } else {
            this.erros.nome = "Apenas letras e/ou números."
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
    }

    async verificarUsuario() {
        this.usuario = await UsuarioModel.findOne({usuario: this.dados.usuario}).lean()

        if (this.usuario) {
            this.erros.email = "Nome de usuário indisponível."
            this.valido = false
        }
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

        // Criação do usuário no banco de dados
        this.usuario = await UsuarioModel.create(this.dados)
    }

    async verificarLogin(email, senha) {
        
        this.usuario = await UsuarioModel.findOne({usuario: usuario, senha: senha}).lean()
        if (!this.usuario) {
            this.valido = false
        }
    }
}


export default UsuarioModel