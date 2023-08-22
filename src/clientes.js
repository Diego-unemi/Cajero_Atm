import { ClienteUseCase } from "../src/cliente-use-case.js";

const clienteUseCase = new ClienteUseCase()

const formCliente = document.getElementById('form-clientes')


formCliente.addEventListener('submit', event => {
    event.preventDefault()
    const formdata = new FormData(event.target)
    // covertimos los datos en objeto key: values (diccionario) JSON
    // {"cedula":"09264022566","nombres":"Ernesto","apellidos":"Guaman"}
    const data = Object.fromEntries(formdata.entries())

    // le pasamos el parametro Data =  {"cedula":"09264022566","nombres":"Ernesto","apellidos":"Guaman"}
    const cliente = clienteUseCase.setCreate(data)
    if(!cliente){
        alert('Cliente ya se encuentra Registrado..')
    }

})


