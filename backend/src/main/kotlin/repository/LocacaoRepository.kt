package com.ProjetoLocadora.ProjetoLocadora.repository

import com.ProjetoLocadora.ProjetoLocadora.model.Locacao
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface LocacaoRepository : JpaRepository<Locacao, Long> {
    // Lista todas as locações de um cliente específico pelo ID do cliente
    fun findByClienteId(clienteId: Long): List<Locacao>
}


