class Cuenta {
    constructor(numero, cliente, tipoCuenta, saldo, clave, fechaApertura) {
        this.numero = numero
        this.cliente = cliente
        this.tipoCuenta = tipoCuenta
        this.saldo = Number(saldo)
        this.clave = clave
        this.fechaApertura = new Date(fechaApertura)
    }
}



class CuentaAhorro extends Cuenta {
    constructor(numero, cliente, tipoCuenta, saldo, clave, fechaApertura) {
        super(numero, cliente, tipoCuenta, saldo, clave, fechaApertura)
    }
}

class CuentaCorriente extends Cuenta {
    constructor(numero, cliente, tipoCuenta, saldo, clave, fechaApertura) {
        super(numero, cliente, tipoCuenta, saldo, clave, fechaApertura)
    }
}

class TarjetaCredito extends Cuenta {
    constructor(numero, cliente, tipoCuenta, saldo, clave, fechaApertura, fechaExpiracion) {
        super(numero, cliente, tipoCuenta, saldo, clave, fechaApertura)
        this.fechaExpiracion = new Date(fechaExpiracion)

    }
}

class ConsorcioBancos {
    constructor(cantidadBancos) {
        this.cantidadBancos = cantidadBancos;
    }
}

class Banco {
    constructor(id, nombre, ordenador) {
        this.id = id
        this.nombre = nombre
        this.ordenador = ordenador
    }
}

class Ordenador {
    constructor(cuentaBancarias) {
        this.cuentaBancarias = cuentaBancarias;
    }
}

class OrdenadorBanco extends Ordenador {
    constructor(cuentaBancarias) {
        super(cuentaBancarias)
    }
}

class OrdenadorCentral extends Ordenador {
    constructor(transaccionesPendientes) {
        super(transaccionesPendientes)
    }
}

class Transaccion extends Cuenta {
    constructor(numero, cliente, tipoCuenta, saldo, clave, fechaApertura, tipo, monto, cuentaOrigen, cuentaDestino) {
        super(numero, cliente, tipoCuenta, saldo, clave, fechaApertura)
        this.tipo = tipo
        this.monto = monto
        this.cuentaOrigen = cuentaOrigen
        this.cuentaDestino = cuentaDestino
    }
}

class EstacionCajero {
    constructor(codigo) {
        this.codigo = codigo
    }
}

class Cajero extends EstacionCajero {
    constructor(identificador, ubicacion, ordenador) {
        super(identificador)
        this.ubicacion = ubicacion
        this.ordenador = ordenador
    }
}

class CajeroAutomatico extends Cajero {
    constructor(identificador, ubicacion, ordenadorCentral) {
        super(identificador, ubicacion, ordenadorCentral)
    }
}

class CajeroHumano extends Cajero {
    constructor(identificador, ubicacion, ordenadorCentral, dni) {
        super(identificador, ubicacion, ordenadorCentral)
        this.dni = dni
    }
}

class Cliente {
    constructor(cedula, nombres, apellidos) {
        this.cedula = cedula
        this.nombres = nombres
        this.apellidos = apellidos

    }
}

export {
    Cliente,
    Transaccion,
    Banco,
    ConsorcioBancos,
    TarjetaCredito,
    OrdenadorBanco,
    OrdenadorCentral,
    CajeroHumano,
    CuentaAhorro,
    CuentaCorriente
};

