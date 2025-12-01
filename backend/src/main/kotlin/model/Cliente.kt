package com.ProjetoLocadora.ProjetoLocadora.model

import jakarta.persistence.*
@Entity
@Table(name = "clientes")
data class Cliente(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0, // ID único do cliente

    var nome: String = "", // Nome do cliente
    var cpf: String = "", // CPF do cliente (pode ser usado como validação)
    var email: String = "", // Email do cliente
    var telefone: String = "" // Telefone do cliente
)
