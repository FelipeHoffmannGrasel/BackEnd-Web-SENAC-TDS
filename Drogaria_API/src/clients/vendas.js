document.addEventListener('DOMContentLoaded', function (){
    loadVendasList();

    document.getElementById('formAdicionarVenda').addEventListener('submit', function (event){
        event.preventDefault()
        adicionarVenda()
    })
})

function adicionarVenda() {
    const id = document.getElementById('idVenda').value
    const data = document.getElementById('data').value
    const id_medicamento = document.getElementById('id_medicamento').value
    const id_cliente = document.getElementById('id_cliente').value

    fetch('http://localhost:3000/api/vendas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            data: data,
            id_medicamento: id_medicamento,
            id_cliente: id_cliente
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        loadVendasList()
    })
    .catch(error => console.error("Erro:", error))
}

function loadVendasList() {
    fetch('http://localhost:3000/api/vendas')
        .then(response => response.json())
        .then(data => displayVendasList(data))
        .catch(error => console.error("Erro:", error))
}

function displayVendasList(data) {
    const listaVendas = document.getElementById('listaVendas')
    listaVendas.innerHTML = ''

    data.forEach(venda => {
        const listItem = document.createElement('li')
        listItem.innerHTML = `<b>ID:</b> ${venda.id} <br> <b>Data:</b> ${new Date(venda.data).toLocaleDateString('pt-BR', { timeZone: 'UTC'})} <br> <b>ID Medicamento:</b> ${venda.id_medicamento} <br> <b>ID Cliente:</b> ${venda.id_cliente}`
        listaVendas.appendChild(listItem)
    })
}