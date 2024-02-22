const express = require('express')
const server = express()
const dadosVendas = require('./data/dadosVendas.json')
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json())

// salvar/inserir dados no JSON === Create do CRUD
server.post('/vendas', (req, res) => {
    const novaVenda = req.body

    if (!novaVenda.data || !novaVenda.id_medicamento || !novaVenda.id_cliente) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dadosVendas.Venda.push(novaVenda)
        salvarDados(dadosVendas)
        return res.status(201).json({ mensagem: "Novo medicamento cadastrado com sucesso!" })
    }
})

// consumir dados da API === Read do CRUD
server.get('/vendas', (req, res) => {
    return res.json(dadosVendas.Venda)
})

server.put('/vendas/:id', (req, res) => {
    //buscar e transformar o id do endpoint em inteiro
    const vendaId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizaVenda = req.body

    //encontrar o id no json que já existe
    const idVenda = dadosVendas.Venda.findIndex(v => v.id === vendaId)

    if (idVenda === -1) {
        return res.status(404).json({ mensagem: "Venda não encontrada :/" })
    } else {
        //atualiza a data:
        dadosVendas.Venda[idVenda].data = atualizaVenda.data || dadosVendas.Venda[idVenda].data

        salvarDados(dadosVendas)

        return res.json({ mensagem: "Venda atualizada com sucesso!" })
    }
})

//função para deletar usuario
server.delete("/vendas/:id", (req, res) => {
    const vendaId = parseInt(req.params.id)

    dadosVendas.Venda = dadosVendas.Venda.filter(v => v.id !== vendaId)

    salvarDados(dadosVendas)

    return res.status(200).json({ mensagem: "Venda excluida com sucesso" })
})

function salvarDados() {
    fs.writeFileSync(__dirname + '/data/dadosVendas.json', JSON.stringify(dadosVendas, null, 2))
}

module.exports = { server, salvarDados }