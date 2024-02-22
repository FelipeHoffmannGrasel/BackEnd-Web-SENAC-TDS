const express = require('express')
const server = express()
const dadosMedicamentos = require('./data/dadosMedicamentos.json')
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json())

// salvar/inserir dados no JSON === Create do CRUD
server.post('/medicamentos', (req, res) => {
    const novoMedicamento = req.body

    if(!novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preco || !novoMedicamento.quantidade) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dadosMedicamentos.Medicamento.push(novoMedicamento)
        salvarDados(dadosMedicamentos)
        return res.status(201).json({mensagem: "Novo medicamento cadastrado com sucesso!"})
    }
})

// consumir dados da API === Read do CRUD
server.get('/medicamentos', (req, res) => {
    return res.json(dadosMedicamentos.Medicamento)
})

// função para atualizar um medicamento
server.put('/medicamentos/:id', (req, res) => {
    const medicamentoId = parseInt(req.params.id)
    const atualizarMedicamento = req.body
    const idMedicamento = dados.medicamentos.findIndex(m => m.id === medicamentoId)

    if(idMedicamento === -1) {
        return res.status(404).json({mensagem: "Medicamento não encontrado"})
    } else {
        dados.medicamentos[idMedicamento].nome = atualizarMedicamento.nome || dados.medicamentos[idMedicamento].nome
        dados.medicamentos[idMedicamento].preco  = atualizarMedicamento.preco || dados.medicamentos[idMedicamento].preco
        dados.medicamentos[idMedicamento].fabricante  = atualizarMedicamento.fabricante || dados.medicamentos[idMedicamento].fabricante
        dados.medicamentos[idMedicamento].quantidade  = atualizarMedicamento.quantidade || dados.medicamentos[idMedicamento].quantidade

        salvarDados(dados)
        return res.status(201).json({mensagem: "Medicamento atualizado com sucesso."})
    }
})

//função para deletar usuario
server.delete("/medicamentos/:id", (req, res) => {
    const medicamentoId = parseInt(req.params.id)

    dadosMedicamentos.Medicamentos = dadosMedicamentos.Medicamentos.filter(m => m.id !== medicamentoId)

    salvarDados(dadosMedicamentos)

    return res.status(200).json({mensagem: "Medicamento excluido com sucesso"})
})

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dadosMedicamentos.json', JSON.stringify(dadosMedicamentos, null, 2))
}

module.exports = {server, salvarDados}