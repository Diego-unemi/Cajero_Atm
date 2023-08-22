import { CuentasBancariasUseCase } from "./cuentas-bancarias-use-case.js";
import { ClienteUseCase } from "./cliente-use-case.js";
const cuentasBancariasUseCase = new CuentasBancariasUseCase()
const clienteUseCase = new ClienteUseCase()
const formCuentas = document.getElementById('id-form-cuenta-bancaria')
const numeroCuenta = document.getElementById('id-numero-cuenta')
const modalCuentas = document.getElementById('modalCuentas')
const deposito = document.getElementById('id-form-deposito')
const retiro = document.getElementById('id-form-retiro')
const transferir = document.getElementById('id-form-transferir')
const selectCliente = document.getElementById('id-cliente')
const modalRespuesta = new bootstrap.Modal(document.getElementById('id-modal-respuesta'), {
    keyboard: false
})
const modalBody = document.querySelector('#id-modal-body')
const consultarCuenta = document.getElementById("btn-consultar")

modalCuentas.addEventListener('shown.bs.modal', function () {
    modalCuentas.focus()
    numeroCuenta.value = cuentasBancariasUseCase.getGenerarNumeroCuenta()

    const clientes = clienteUseCase.getClientes()
    selectCliente.options.length = 0
    for (const c of clientes) {
        const option = document.createElement('option');
        option.value = c.cedula
        option.text = `${c.nombres} ${c.apellidos}`
        selectCliente.add(option)
    }

})

formCuentas.addEventListener('submit', event => {
    event.preventDefault()
    numeroCuenta.value = cuentasBancariasUseCase.getGenerarNumeroCuenta()
    const formdata = new FormData(event.target)
    const data = Object.fromEntries(formdata.entries())
    cuentasBancariasUseCase.setCreateCuentasBancarias(data)
    cuentasBancariasUseCase.getCuentasBancarias()

})
deposito.addEventListener('submit', event => {
    event.preventDefault();
    numeroCuenta.value = cuentasBancariasUseCase.getGenerarNumeroCuenta()
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata.entries());
    const newBalance = cuentasBancariasUseCase.depositar(data);
    
    if(newBalance){
        alert("DEPOSITO REALIZADO CON EXITO")
    }
    if (newBalance !== null) {
       alert(`Deposit successful. New balance: ${newBalance}`);
        // You can update your UI here to display the new balance.
    } else {
       alert("Deposit failed. Please check account details.");
        // Handle the error case in your UI.
    }
});
retiro.addEventListener('submit', event => {
    event.preventDefault();
    numeroCuenta.value = cuentasBancariasUseCase.getGenerarNumeroCuenta()
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata.entries());
    const newBalance = cuentasBancariasUseCase.retirar(data);
    if(newBalance){
        alert("RETIRO REALIZADO CON EXITO")
    }
    if (newBalance !== null) {
        console.log(`Deposit successful. New balance: ${newBalance}`);
        // You can update your UI here to display the new balance.
    } else {
        console.log("Deposit failed. Please check account details.");
        // Handle the error case in your UI.
    }
});
transferir.addEventListener('submit', event => {
    event.preventDefault();
    numeroCuenta.value = cuentasBancariasUseCase.getGenerarNumeroCuenta()
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata.entries());
    const newBalance = cuentasBancariasUseCase.transferir(data);

    if (newBalance !== null) {
        console.log(`Deposit successful. New balance: ${newBalance}`);
        // You can update your UI here to display the new balance.
    } else {
        console.log("Deposit failed. Please check account details.");
        // Handle the error case in your UI.
    }
});
consultarCuenta.addEventListener('click', (event) => {
    event.preventDefault();
    // Retrieve the account number from the user interface
    numeroCuenta.value = cuentasBancariasUseCase.getGenerarNumeroCuenta()
    const numeroCuenta = document.getElementById("id-numero").value
    const saldo = cuentasBancariasUseCase.consultarSaldoPorNumeroDeCuenta(numeroCuenta);

    if (saldo !== null) {
        modalBody.innerHTML = `
        <label>Tu saldo actual es de $:</label> <span>${saldo} </span><br>
        `
    } else {
        modalBody.innerHTML = `<p>La cuenta no existe o no tiene saldo.</p>`;
    }

    // Show the modal
    modalRespuesta.show();
});