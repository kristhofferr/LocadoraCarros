package com.ProjetoLocadora.ProjetoLocadora.controller

import com.ProjetoLocadora.ProjetoLocadora.model.Cliente
import com.ProjetoLocadora.ProjetoLocadora.service.ClienteService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/clientes") // Base URL para todas as rotas relacionadas a clientes
class ClienteController(private val clienteService: ClienteService) {

    // Listar todos os clientes cadastrados
    @GetMapping
    fun listarClientes(): ResponseEntity<List<Cliente>> =
        ResponseEntity.ok(clienteService.listarTodos())

    // Buscar um cliente pelo ID
    @GetMapping("/{id}")
    fun buscarPorId(@PathVariable id: Long): ResponseEntity<Cliente> {
        val cliente = clienteService.buscarPorId(id)
        return if (cliente != null) ResponseEntity.ok(cliente)
        else ResponseEntity.notFound().build() // Retorna 404 se não encontrar
    }

    // Criar um novo cliente
    @PostMapping
    fun criar(@RequestBody cliente: Cliente): ResponseEntity<Cliente> =
        ResponseEntity.ok(clienteService.salvar(cliente))

    // Atualizar um cliente existente
    @PutMapping("/{id}")
    fun atualizar(@PathVariable id: Long, @RequestBody cliente: Cliente): ResponseEntity<Cliente> {
        val atualizado = clienteService.atualizar(id, cliente)
        return ResponseEntity.ok(atualizado)
    }

    // Deletar um cliente pelo ID
    @DeleteMapping("/{id}")
    fun deletar(@PathVariable id: Long): ResponseEntity<Void> {
        clienteService.deletar(id)
        return ResponseEntity.noContent().build() // Retorna 204 quando deletado
    }
}

