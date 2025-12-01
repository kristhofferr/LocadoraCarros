package com.ProjetoLocadora.ProjetoLocadora.repository

import com.ProjetoLocadora.ProjetoLocadora.model.Cliente
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ClienteRepository : JpaRepository<Cliente, Long> {
    // JpaRepository já fornece métodos prontos de CRUD:
    // findAll(), findById(), save(), deleteById(), etc.

}
