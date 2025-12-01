package com.ProjetoLocadora.ProjetoLocadora.model

import jakarta.persistence.MappedSuperclass

// Classe base que serve como modelo para outras classes de veículo
// @MappedSuperclass indica que não será criada uma tabela no banco diretamente
// Mas suas propriedades serão herdadas por subclasses que são entidades (ex: Carro, Moto)
@MappedSuperclass
open class VeiculoBase(
    open var marca: String = "",
    open var modelo: String = "",
    open var ano: Int = 0,
    open var placa: String = "",
    open var valorDiaria: Double = 0.0,
    open var disponivel: Boolean = true
)
