const express = require('express')
const server = express()
const dadosFornecedores = require('./data/dadosFornecedores.json')
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json())

// salvar/inserir dados no JSON === Create do CRUD
server.post('/fornecedores', (req, res) => {
    const novoFornecedor = req.body

    if(!novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.telefone) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dadosFornecedores.Fornecedor.push(novoFornecedor)
        salvarDados(dadosFornecedores)
        return res.status(201).json({mensagem: "Novo fornecedor cadastrado com sucesso!"})
    }
})

// consumir dados da API === Read do CRUD
server.get('/fornecedores', (req, res) => {
    return res.json(dadosFornecedores.Fornecedor)
})

// função para atualizar um usuario
server.put('/fornecedores/:id', (req, res) => {
    //buscar e transformar o id do endpoint em inteiro
    const fornecedorId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizaFornecedor = req.body

    //encontrar o id no json que já existe
    const idFornecedor = dadosFornecedores.Fornecedor.findIndex(f => f.id === fornecedorId)

    if (idFornecedor === -1) {
        return res.status(404).json({mensagem: "Fornecedor não encontrado :/"})
    } else {
        //atualiza o nome:
        dadosFornecedores.fornecedores[idFornecedor].nome = atualizarFornecedor.nome || dadosFornecedores.fornecedores[idFornecedor].nome

        //atualiza a idade:
        dadosClientes.users[idCliente].idade = atualizarUsuario.idade || dadosClientes.users[idCliente].idade

        //atualiza o curso
        dadosClientes.users[idCliente].curso = atualizarUsuario.curso || dadosClientes.users[idCliente].curso

        salvarDados(dadosClientes)

        return res.json({mensagem: "Usuario atualizado com sucesso!"})
    }
})

//função para deletar usuario
server.delete("/clientes/:id", (req, res) => {
    const clienteId = parseInt(req.params.id)

    dadosClientes.Clientes = dadosClientes.Clientes.filter(u => u.id !== usuarioId)

    salvarDados(dadosClientes)

    return res.status(200).json({mensagem: "Usuário excluido com sucesso"})
})

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dadosFornecedores.json', JSON.stringify(dadosFornecedores, null, 2))
}

module.exports = {server, salvarDados}