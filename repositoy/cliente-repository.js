import { Cliente } from "../src/modelo.js"
export class ClienteRepository {
  constructor() {
    this.clientes = JSON.parse(localStorage.getItem('clientes')) || []
    this.clientes = this.clientes.map(c => {
      return new Cliente(
        c.cedula,
        c.nombres,
        c.apellidos
      )
    })
    // this.clientes = [Cliente(),Cliente().... n]
  }
  getClientes() {
    return this.clientes
  }
  setCreate(cliente) {             // 0 ,     1  ,     2
    this.clientes.push(cliente) // [Cliente1,Cliente2,Cliente(end)... n]
    //                     JSON  [{nombre: "ernesto"}]
    //                     key    ,  JSON: [{"nombre":"ernesto"},{}]
    localStorage.setItem('clientes', JSON.stringify(this.clientes))
  }
}