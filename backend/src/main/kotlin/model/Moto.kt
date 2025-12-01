package com.ProjetoLocadora.ProjetoLocadora.model

import jakarta.persistence.*

@Entity
@DiscriminatorValue("MOTO") // Valor que identifica a moto na tabela "veiculos"
class Moto(
    marca: String = "",
    modelo: String = "",
    ano: Int = 0,
    placa: String = "",
    valorDiaria: Double = 0.0,
    disponivel: Boolean = true,
    var cilindrada: Int = 0, // Cilindrada da moto (ex: 150cc)
) : Veiculo(
    marca = marca,
    modelo = modelo,
    ano = ano,
    placa = placa,
    valorDiaria = valorDiaria,
    disponivel = disponivel
) {
    // 🔹 Sobrescreve o método de cálculo de valor total da locação
    // Aplicando um desconto de 5% para motos
    override fun calcularValorTotal(dias: Int): Double {
        val valorBase = super.calcularValorTotal(dias)
        return valorBase * 0.95 // desconto de 5%
    }
}
