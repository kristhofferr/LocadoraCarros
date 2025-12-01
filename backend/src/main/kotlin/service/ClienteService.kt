package com.ProjetoLocadora.ProjetoLocadora.service

import com.ProjetoLocadora.ProjetoLocadora.model.Cliente
import com.ProjetoLocadora.ProjetoLocadora.repository.ClienteRepository
import org.springframework.stereotype.Service

@Service
class ClienteService(private val clienteRepository: ClienteRepository) {

    // Retorna todos os clientes
    fun listarTodos(): List<Cliente> = clienteRepository.findAll()

    // Busca cliente por ID
    fun buscarPorId(id: Long): Cliente? = clienteRepository.findById(id).orElse(null)

    // Salva um novo cliente
    fun salvar(cliente: Cliente): Cliente = clienteRepository.save(cliente)

    // Atualiza cliente existente
    fun atualizar(id: Long, clienteAtualizado: Cliente): Cliente {
        val clienteExistente = clienteRepository.findById(id)
            .orElseThrow { Exception("Cliente não encontrado!") }

        // Cria uma cópia com os novos dados
        val novoCliente = clienteExistente.copy(
            nome = clienteAtualizado.nome,
            cpf = clienteAtualizado.cpf,
            telefone = clienteAtualizado.telefone,
            email = clienteAtualizado.email
        )

        return clienteRepository.save(novoCliente)
    }

    // Deleta cliente por ID
    fun deletar(id: Long) = clienteRepository.deleteById(id)
}

