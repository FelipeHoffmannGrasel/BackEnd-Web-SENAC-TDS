const express = require('express')
const server = express()
const dados = require('./data/dados.json')
const fs = require('fs')

// função para utilizar o server

server.use(express.json())

// indicativo de funcionanmento

server.listen(3000,() =>{
    console.log('abner burro')
})

// salvar/inserir dados == create do Crud

server.post('/cursos', (req, res) =>{
    const novoCurso = req.body

    if(!novoCurso.id_curso || !novoCurso.nome_curso || !novoCurso.ch_curso || !novoCurso.professor){
        return res.status(400).json({mensagem: "Dados incopletos, abner eh mt burro"})
    }else{
        dados.cursos.push(novoCurso)
        salvarDados(dados)
        return res.status(201).json({mensagem: 'user cadastrado, abner nao eh tao burro'})
    }
})

// consumo de dados == read do Crud

server.get('/cursos', (req, res) =>{
    return res.json(dados.cursos)
})

// att user 
server.put('/cursos/:id_curso', (req, res)=>{
    // buscar/transformar id endpoint em inteiro
    const cursoId = parseInt(req.params.id_curso)
    // receber  no postman
    const atualizarCurso = req.body

//encontrar o id json q ja existe
    const idCurso = dados.cursos.findIndex( u => u.id_curso === cursoId)

    if(idCurso === -1){
        return res.status(404).json({mensagem: "nao encontrado"})
    }else{
        //atualiza o nome:
        dados.cursos[idCurso].nome_curso = atualizarCurso.nome_curso || dados.cursos[idCurso].nome_curso

        //atualiza a idade: 
        dados.cursos[idCurso].ch_curso = atualizarCurso.ch_curso || dados.cursos[idCurso].ch_curso

        //atualiza o curso: 
        dados.cursos[idCurso].professor = atualizarCurso.professor || dados.cursos[idCurso].professor

        salvarDados(dados)

        return res.json({mensagem: " usuario att com sucesso"})
    }
})

// função delete

server.delete('/cursos/:id_curso', (req, res) =>{
    const cursoId = parseInt(req.params.id_curso)

    dados.cursos = dados.cursos.filter(u => u.id_curso !== cursoId)

    salvarDados(dados)

    return res.status(200).json({mensagem: "usuario foi de arrasta"})
})

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2))
}

server.post('/usuarios', (req, res) =>{
    const novoUser = req.body

    if(!novoUser.id || !novoUser.nome || !novoUser.idade || !novoUser.curso){
        return res.status(400).json({mensagem: "Dados incopletos, abner eh mt burro"})
    }else{
        dados.users.push(novoUser)
        salvarDados(dados)
        return res.status(201).json({mensagem: 'user cadastrado, abner nao eh tao burro'})
    }
})

// consumo de dados == read do Crud

server.get('/usuarios', (req, res) =>{
    return res.json(dados.users)
})

// att user 
server.put('/usuarios/:id', (req, res)=>{
    // buscar/transformar id endpoint em inteiro
    const usuarioId = parseInt(req.params.id)
    // receber  no postman
    const atualizarUser = req.body

//encontrar o id json q ja existe
    const idUser = dados.users.findIndex( u => u.id === usuarioId)

    if(idUser === -1){
        return res.status(404).json({mensagem: "nao encontrado"})
    }else{
        //atualiza o nome:
        dados.users[idUser].nome = atualizarUser.nome || dados.users[idUser].nome

        //atualiza a idade: 
        dados.users[idUser].idade = atualizarUser.idade || dados.users[idUser].idade

        //atualiza o curso: 
        dados.users[idUser].curso = atualizarUser.curso || dados.users[idUser].curso

        salvarDados(dados)

        return res.json({mensagem: " usuario att com sucesso"})
    }
})

// função delete

server.delete("/usuarios/:id", (req, res) =>{
    const usuarioId = parseInt(req.params.id)

    dados.users = dados.users.filter(u => u.id !== usuarioId)

    salvarDados(dados)

    return res.status(200).json({mensagem: "usuario foi de arrasta"})
})

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2))
}