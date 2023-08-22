
export class CuentaRepository {
  constructor() {
    this.cuentasBancarias = JSON.parse(localStorage.getItem('cuentas-bancarias')) || []
    // this.clientes = [Cliente(),Cliente().... n]
  }
  getCuentasBancarias() {
    return this.cuentasBancarias
  }
  setCreateCuentasBancarias(cuentaBancaria) {
    this.cuentasBancarias.push(cuentaBancaria)
    localStorage.setItem('cuentas-bancarias', JSON.stringify(this.cuentasBancarias))
  }
  setRemoveCuentasBancarias() {
    this.cuentasBancarias.length = 0
    localStorage.removeItem('cuentas-bancarias')
  }
  getCuentasLength() {
    return this.cuentasBancarias.length
  }
  updateCuentaBancaria(cuenta) {
    const index = this.cuentasBancarias.findIndex(c => c.numero === cuenta.numero);

    if (index !== -1) {
      this.cuentasBancarias[index] = cuenta;
      localStorage.setItem('cuentas-bancarias', JSON.stringify(this.cuentasBancarias));
      return true;
    }

    return false;
  }
  getCuentaByNumero(numero) {
    return this.cuentasBancarias.find(cuenta => cuenta.numero === numero);
  }
}

