document.addEventListener('DOMContentLoaded', function (){
    //função que carrega a lista de clientes ao entrar na pag
    loadFornecedoresList();

    //Add um listener do formulario para add clientes
    document.getElementById('formAdicionarFornecedor').addEventListener('submit', function (event){
        event.preventDefault()
        adicionarFornecedor()
    })
})

function adicionarFornecedor() {
    const id = document.getElementById('idFornecedor').value
    const nome = document.getElementById('nomeFornecedor').value
    const endereco = document.getElementById('enderecoFornecedor').value
    const telefone = document.getElementById('telefoneFornecedor').value
    
    fetch('http://localhost:3000/api/fornecedores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            endereco: endereco,
            telefone: telefone
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        loadFornecedoresList()
    })
    .catch(error => console.error("Erro:", error))
}

function loadFornecedoresList() {
    fetch('http://localhost:3000/api/fornecedores')
        .then(response => response.json())
        .then(data => displayFornecedoresList(data))
        .catch(error => console.error("Erro:", error))
}

function displayFornecedoresList(data) {
    const listaFornecedores = document.getElementById('listaFornecedores')
    listaFornecedores.innerHTML = ''

    data.forEach(fornecedor =>{
        const listItem = document.createElement('li')
        listItem.innerHTML = `<b>ID:</b> ${fornecedor.id} <br> <b>Nome:</b> ${fornecedor.nome} <br> <b>Endereço:</b> ${fornecedor.endereco} <br> <b>Telefone:</b> ${fornecedor.telefone}`
        listaFornecedores.appendChild(listItem)
    })
}