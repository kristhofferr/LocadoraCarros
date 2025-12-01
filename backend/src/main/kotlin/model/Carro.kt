package com.ProjetoLocadora.ProjetoLocadora.model

import jakarta.persistence.*

@Entity
@DiscriminatorValue("CARRO") // Identifica o veículo como carro na tabela única 'veiculos'
class Carro(
    marca: String = "",
    modelo: String = "",
    ano: Int = 0,
    placa: String = "",
    valorDiaria: Double = 0.0,
    disponivel: Boolean = true,

    var tipoCombustivel: String = "" // Gasolina, Diesel, Flex, etc.
) : Veiculo(
    marca = marca,
    modelo = modelo,
    ano = ano,
    placa = placa,
    valorDiaria = valorDiaria,
    disponivel = disponivel
) {
    // 🔹 Sobrescreve o método da classe base para adicionar uma taxa extra de 10% no valor total
    override fun calcularValorTotal(dias: Int): Double {
        val valorBase = super.calcularValorTotal(dias) // calcula valor normal: valorDiaria * dias
        return valorBase * 1.10 // aplica taxa extra de 10% para carros
    }
}
