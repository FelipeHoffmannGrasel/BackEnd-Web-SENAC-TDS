document.addEventListener('DOMContentLoaded', function () {
    // Carregar a lista de clientes ao carregar a página
    loadClientesList();
    // Adicionar um ouvinte de evento ao formulário para adicionar clientes
    document.getElementById('formAdicionarCliente').addEventListener('submit', function (event) {
        event.preventDefault();
        adicionarCliente();
    });
});

function adicionarCliente() {
    const nome = document.getElementById('nomeCliente').value;
    const endereco = document.getElementById('enderecoCliente').value;
    const email = document.getElementById('emailCliente').value;
    const telefone = document.getElementById('telefoneCliente').value;

    // Convertendo os dados para XML
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
        <cliente>
            <nome>${nome}</nome>
            <endereco>${endereco}</endereco>
            <email>${email}</email>
            <telefone>${telefone}</telefone>
        </cliente>`;

    fetch('http://localhost:3000/api/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/xml',
        },
        body: xmlString,
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        loadClientesList(); // Recarregar a lista após adicionar um cliente
    })
    .catch(error => console.error('Error:', error));
}

function loadClientesList() {
    fetch('http://localhost:3000/api/clientes')
        .then(response => response.text())
        .then(data => convertXmlToJSON(data))
        .then(jsonData => displayClientesList(jsonData))
        .catch(error => console.error('Error:', error));
}

function convertXmlToJSON(xmlData) {
    return new Promise((resolve, reject) => {
        const xml2js = require('xml2js');
        const parser = new xml2js.Parser({ explicitArray: false });
        parser.parseString(xmlData, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function displayClientesList(data) {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = '';

    data.clientes.cliente.forEach(cliente => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<b>ID:</b> ${cliente.id} <br> <b>Nome:</b> ${cliente.nome} <br> <b>Email:</b> ${cliente.email} <br> <b>Endereço:</b> ${cliente.endereco} <br> <b>Telefone:</b> ${cliente.telefone}`
        listaClientes.appendChild(listItem)
    });
}
