import { ClienteRepository } from "../repositoy/cliente-repository.js";
import { CuentaRepository } from "../repositoy/Cuenta-Bancaria-repository.js";
import { CuentaAhorro, CuentaCorriente } from "./modelo.js";

export class CuentasBancariasUseCase {
    constructor() {
        this.cuentaRepository = new CuentaRepository()
        this.clienteRepository = new ClienteRepository()

    }
    getCuentasBancarias() {
        return this.cuentaRepository.getCuentasBancarias()
    }
    setCreateCuentasBancarias(data) {
        const numero = this.getGenerarNumeroCuenta()
        const cliente = this.getBuscarCliente(data.cedula)
        let cuenta = null
        switch (data.tipoCuenta) {
            case 'AHORRO':
                cuenta = new CuentaAhorro(
                    numero,
                    cliente,
                    data.tipoCuenta,
                    data.saldo,
                    data.clave,
                    data.fechaApertura
                )
                break
            case 'CORRIENTE':
                cuenta = new CuentaCorriente(
                    numero,
                    cliente,
                    data.tipoCuenta,
                    data.saldo,
                    data.clave,
                    data.fechaApertura
                )
                break
        }
        this.cuentaRepository.setCreateCuentasBancarias(cuenta)
        return cuenta
    }
    getGenerarNumeroCuenta() {
        const numeroLength = this.cuentaRepository.getCuentasLength() + 1
        const numero = String(numeroLength).padStart(6, "0")
        return numero
    }


    getBuscarCliente(cedula) {
        const cliente = this.clienteRepository.getClientes().find(c => c.cedula == cedula)
        return cliente
    }
    
    
  depositar(data) {
    const cuenta = this.cuentaRepository.getCuentaByNumero(data.numero);
    if (cuenta) {
      if (data.monto > 0) {
        cuenta.saldo += parseFloat(data.monto);
        const updatedSuccessfully = this.cuentaRepository.updateCuentaBancaria(cuenta);

        if (updatedSuccessfully) {
          return cuenta.saldo;
        }
      }
    }
    return null;
  }
  retirar(data) {
    const cuenta = this.cuentaRepository.getCuentaByNumero(data.numero);
    if (cuenta) {
      if (data.monto > 0) {
        cuenta.saldo -= parseFloat(data.monto);
        const updatedSuccessfully = this.cuentaRepository.updateCuentaBancaria(cuenta);

        if (updatedSuccessfully) {
          return cuenta.saldo;
        }
      }
    }
    return null;
  }
  transferir(data) {
    const cuenta1 = this.cuentaRepository.getCuentaByNumero(data.cuentaOrigen);
    const cuenta2 = this.cuentaRepository.getCuentaByNumero(data.cuentaDestino);
    if (cuenta1 && cuenta2) {
      if (data.monto > 0) {
        cuenta1.saldo -= parseFloat(data.monto);
        cuenta2.saldo += parseFloat(data.monto);
        const updatedSuccessfully1 = this.cuentaRepository.updateCuentaBancaria(cuenta1);
        const updatedSuccessfully2 = this.cuentaRepository.updateCuentaBancaria(cuenta2);
        if (updatedSuccessfully1 && updatedSuccessfully2) {
            return {
                saldoCuentaOrigen: cuenta1.saldo,
                saldoCuentaDestino: cuenta2.saldo
            };
        }

      }
    }
    return null;
  } 
  consultarSaldoPorNumeroDeCuenta(numero) {
    const cuenta = this.cuentaRepository.getCuentaByNumero(numero);

    if (cuenta) {
        return cuenta.saldo;
    }

    return null;
}
 
}