package com.ProjetoLocadora.ProjetoLocadora.controller
import com.ProjetoLocadora.ProjetoLocadora.model.Locacao
import com.ProjetoLocadora.ProjetoLocadora.service.LocacaoService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/locacoes") // Base URL para todas as rotas de locações
class LocacaoController(
    private val locacaoService: LocacaoService
) {

    // Criar uma nova locação
    @PostMapping
    fun criarLocacao(@RequestBody locacao: Locacao): ResponseEntity<Locacao> {
        val novaLocacao = locacaoService.registrarLocacao(locacao)
        return ResponseEntity.ok(novaLocacao)
    }

    // Listar todas as locações de um cliente específico
    @GetMapping("/cliente/{id}")
    fun listarLocacoesPorCliente(@PathVariable id: Long): ResponseEntity<List<Locacao>> {
        val locacoes = locacaoService.listarPorCliente(id)
        return ResponseEntity.ok(locacoes)
    }

    // Listar todas as locações no sistema
    @GetMapping
    fun listarTodas(): ResponseEntity<List<Locacao>> {
        val lista = locacaoService.listarTodos()
        return ResponseEntity.ok(lista)
    }

    // Buscar locação por ID
    @GetMapping("/{id}")
    fun buscarPorId(@PathVariable id: Long): ResponseEntity<Locacao> {
        val locacao = locacaoService.buscarPorId(id)
        return if (locacao != null) ResponseEntity.ok(locacao)
        else ResponseEntity.notFound().build()
    }

    // Atualizar locação existente
    @PutMapping("/{id}")
    fun atualizarLocacao(@PathVariable id: Long, @RequestBody locacao: Locacao): ResponseEntity<Locacao> {
        val locacaoAtualizada = locacaoService.atualizarLocacao(id, locacao)
        return ResponseEntity.ok(locacaoAtualizada)
    }

    // Gerar boleto para pagamento de uma locação (funcionalidade extra)
    @PostMapping("/{id}/pagamento/boleto")
    fun gerarBoleto(@PathVariable id: Long): ResponseEntity<Locacao> {
        val locacaoComBoleto = locacaoService.gerarBoleto(id)
        return ResponseEntity.ok(locacaoComBoleto)
    }

    // Deletar locação
    @DeleteMapping("/{id}")
    fun deletarLocacao(@PathVariable id: Long): ResponseEntity<Void> {
        locacaoService.deletarLocacao(id)
        return ResponseEntity.noContent().build()
    }

}

