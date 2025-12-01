package com.ProjetoLocadora.ProjetoLocadora.model

import jakarta.persistence.*

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_veiculo", discriminatorType = DiscriminatorType.STRING)
@Table(name = "veiculos")
open class Veiculo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null, // ID único do veículo, gerado automaticamente

    var marca: String = "", // Marca do veículo (ex: Toyota, Honda)
    var modelo: String = "", // Modelo do veículo (ex: Corolla, Civic)
    var ano: Int = 0, // Ano do veículo
    var placa: String = "", // Placa do veículo
    var valorDiaria: Double = 0.0, // Valor da diária para locação
    var disponivel: Boolean = true, // Indica se o veículo está disponível para locação
    var latitude: Double? = null, // Latitude do veículo para rastreio
    var longitude: Double? = null // Longitude do veículo para rastreio
) {
    //  metodo que calcula o valor total da locação
    // Pode ser sobrescrito em subclasses (polimorfismo)
    open fun calcularValorTotal(dias: Int): Double {
        return valorDiaria * dias
    }
}
