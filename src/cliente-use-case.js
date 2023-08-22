import { ClienteRepository } from "../repositoy/cliente-repository.js";
import { Cliente } from "../src/modelo.js"

export class ClienteUseCase {
  constructor() {
    this.clienteRespository = new ClienteRepository()
}

  getClientes() {
    return this.clienteRespository.getClientes()
  }

  setCreate(data) {
    if (!this.buscarPorCedula(data.cedula)) {
      // creamos la instancia del objeto Cliente
      const cliente = new Cliente(
        data.cedula,
        data.nombres,
        data.apellidos,
      )
      this.clienteRespository.setCreate(cliente)
      return cliente
    }
    return null
  }

  buscarPorCedula(cedula) {
    const clientes = this.clienteRespository.getClientes()
    const cliente = clientes.find(c => c.cedula == cedula) 
    
    return cliente
  }

}