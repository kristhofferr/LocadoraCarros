package com.ProjetoLocadora.ProjetoLocadora.model
import com.ProjetoLocadora.ProjetoLocadora.model.Cliente
import com.ProjetoLocadora.ProjetoLocadora.model.Veiculo
import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "locacoes")
data class Locacao(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0, // ID único da locação, gerado automaticamente pelo banco

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    var cliente: Cliente? = null, // Relacionamento com a tabela Cliente (muitos para um)

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    var veiculo: Veiculo? = null, // Relacionamento com a tabela Veiculo (muitos para um)

    var dataInicio: LocalDate, // Data de início da locação
    var dataFim: LocalDate, // Data de término da locação
    var valorTotal: Double, // Valor total calculado da locação

    var codigoBoleto: String? = null // Código de boleto gerado para pagamento (opcional)
)
