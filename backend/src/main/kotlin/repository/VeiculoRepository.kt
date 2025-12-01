package com.ProjetoLocadora.ProjetoLocadora.repository

import com.ProjetoLocadora.ProjetoLocadora.model.Veiculo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface VeiculoRepository : JpaRepository<Veiculo, Long> {
    // Busca veículos por marca, ignorando maiúsculas e minúsculas
    fun findByMarcaContainingIgnoreCase(marca: String): List<Veiculo>
}

