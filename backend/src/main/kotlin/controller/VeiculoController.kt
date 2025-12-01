package com.ProjetoLocadora.ProjetoLocadora.controller

import com.ProjetoLocadora.ProjetoLocadora.dto.LocalizacaoDTO
import com.ProjetoLocadora.ProjetoLocadora.model.Veiculo
import com.ProjetoLocadora.ProjetoLocadora.service.VeiculoService
import com.ProjetoLocadora.ProjetoLocadora.repository.VeiculoRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/veiculos") // Base URL para todas as rotas relacionadas a veículos
class VeiculoController(private val veiculoService: VeiculoService) {

    // Listar todos os veículos cadastrados
    @GetMapping
    fun listarVeiculos(): ResponseEntity<List<Veiculo>> =
        ResponseEntity.ok(veiculoService.listarTodos())
    // Retorna 200 OK com a lista completa de veículos

    // Buscar veículo por ID
    @GetMapping("/{id}")
    fun buscarPorId(@PathVariable id: Long): ResponseEntity<Veiculo> {
        val veiculo = veiculoService.buscarPorId(id)
        return if (veiculo != null) ResponseEntity.ok(veiculo)
        else ResponseEntity.notFound().build() // Retorna 404 se não existir
    }

    // Criar um novo veículo
    @PostMapping
    fun salvar(@RequestBody veiculo: Veiculo): ResponseEntity<Veiculo> =
        ResponseEntity.ok(veiculoService.salvar(veiculo))
    // Recebe os dados do veículo em JSON e salva no banco via Service

    // Deletar veículo pelo ID
    @DeleteMapping("/{id}")
    fun deletar(@PathVariable id: Long): ResponseEntity<Void> {
        veiculoService.deletar(id)
        return ResponseEntity.noContent().build() // Retorna 204 no sucesso
    }

    // Atualizar veículo existente
    @PutMapping("/{id}")
    fun atualizarVeiculo(@PathVariable id: Long, @RequestBody veiculo: Veiculo): ResponseEntity<Veiculo> {
        val veiculoAtualizado = veiculoService.atualizar(id, veiculo)
        return ResponseEntity.ok(veiculoAtualizado)
    }

    // Ranking dos veículos mais alugados (funcionalidade extra)
    @GetMapping("/ranking")
    fun rankingCarros(): ResponseEntity<List<Map<String, Any>>> {
        val ranking = veiculoService.rankingMaisAlugados()
        return ResponseEntity.ok(ranking)
    }
    // Retorna uma lista de mapas com informações: veículo, marca, modelo, total de locações

    // Buscar veículos por marca
    @GetMapping("/marca/{marca}")
    fun buscarPorMarca(@PathVariable marca: String): ResponseEntity<List<Veiculo>> {
        val veiculos = veiculoService.buscarPorMarca(marca)
        return if (veiculos.isNotEmpty()) {
            ResponseEntity.ok(veiculos)
        } else {
            ResponseEntity.notFound().build() // Retorna 404 se não houver veículos da marca
        }
    }
    @GetMapping("/{id}/localizacao")
    fun getLocalizacao(@PathVariable id: Long): ResponseEntity<LocalizacaoDTO> {
        return try {
            val dto = veiculoService.obterLocalizacao(id)
            ResponseEntity.ok(dto)
        } catch (e: Exception) {
            ResponseEntity.badRequest().build()
        }
    }


    // Atualizar a localização de um veículo (latitude e longitude)
    @PutMapping("/{id}/localizacao")
    fun atualizarLocalizacao(
        @PathVariable id: Long,
        @RequestBody localizacao: LocalizacaoDTO
    ): ResponseEntity<Veiculo> {
        val atualizado = veiculoService.atualizarLocalizacao(id, localizacao)
        return ResponseEntity.ok(atualizado)
    }
    // Recebe a latitude e longitude e atualiza o veículo no banco
}

