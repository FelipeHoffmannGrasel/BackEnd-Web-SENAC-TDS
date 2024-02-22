const express = require('express');
const medicamentosRouter = require('./controllerMedicamentos');
const fornecedoresRouter = require('./controllerFornecedores');
const clientesRouter = require('./controllerClientes');
const vendasRouter = require('./controllerVendas')
const cors = require('cors');
const app = express();
app.use(cors()); // Adicione esta linha para configurar o CORS
app.use('/api', medicamentosRouter.server); // '/api/medicamentos'
app.use('/api', fornecedoresRouter.server); // '/api/fornecedores'
app.use('/api', clientesRouter.server); // '/api/clientes'
app.use('/api', vendasRouter.server); // '/api/vendas'
app.listen(3000, () => {
    console.log('O servidor está funcionando! :D');
});