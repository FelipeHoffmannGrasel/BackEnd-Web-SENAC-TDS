const express = require('express');
const fs = require('fs');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const dados = require('./data/dados.json');

// DELETE
server.delete('/carros/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const indiceRemocao = dados.carros.findIndex(c => c.id === id);
    if (indiceRemocao !== -1) {
        dados.carros.splice(indiceRemocao, 1);

        dados.carros.forEach((car, index) => {
            car.id = index + 1;
        });

        salvarDados(dados);

        return res.status(200).json({ mensagem: "Carro excluido com sucesso." });
    } else {
        return res.status(404).json({ mensagem: "Carro não encontrado." });
    }
});

server.post('/carros', (req, res) => {
    const novoCarro = req.body;

    if (!novoCarro.name || !novoCarro.pilots || !novoCarro.team || !novoCarro.img) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        novoCarro.id = dados.carros.length + 1;
        dados.carros.push(novoCarro);
        salvarDados(dados);

        return res.status(201).json({ mensagem: "Dados completos, cadastro feito com sucesso!" });
    }
});

// PUT
server.put('/carros/:id', (req, res) => {
    const carroId = parseInt(req.params.id);
    const atualizarCarro = req.body;

    const indexCarro = dados.carros.findIndex(carro => carro.id === carroId);

    if (indexCarro === -1) {
        return res.status(404).json({ mensagem: "Carro não encontrado" });
    }

    dados.carros[indexCarro].name   = atualizarCarro.name   || dados.carros[indexCarro].name;
    dados.carros[indexCarro].pilots = atualizarCarro.pilots || dados.carros[indexCarro].pilots;
    dados.carros[indexCarro].team   = atualizarCarro.team   || dados.carros[indexCarro].genero;
    dados.carros[indexCarro].img    = atualizarCarro.img    || dados.carros[indexCarro].img;

    salvarDados(dados);

    return res.json({ mensagem: "Carro atualizado com sucesso", carro: dados.carros[indexCarro] });
});

server.get('/carros', (req, res) => {
    return res.json(dados.carros);
});

function salvarDados(dados) {
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2));
}

server.listen(4000, () => {
    console.log("Servidor rodando na porta 4000");
});