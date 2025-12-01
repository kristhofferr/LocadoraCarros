package com.ProjetoLocadora.ProjetoLocadora.service

import com.ProjetoLocadora.ProjetoLocadora.dto.LocalizacaoDTO
import com.ProjetoLocadora.ProjetoLocadora.model.Veiculo
import com.ProjetoLocadora.ProjetoLocadora.repository.LocacaoRepository
import com.ProjetoLocadora.ProjetoLocadora.repository.VeiculoRepository
import org.springframework.stereotype.Service

@Service
class VeiculoService(
    private val veiculoRepository: VeiculoRepository,
    private val locacaoRepository: LocacaoRepository
) {

    // Listar todos os veículos
    fun listarTodos(): List<Veiculo> = veiculoRepository.findAll()

    // Buscar veículo por ID
    fun buscarPorId(id: Long): Veiculo? = veiculoRepository.findById(id).orElse(null)

    // Salvar veículo
    fun salvar(veiculo: Veiculo): Veiculo = veiculoRepository.save(veiculo)

    // Deletar veículo
    fun deletar(id: Long) = veiculoRepository.deleteById(id)

    // Atualizar veículo
    fun atualizar(id: Long, veiculoAtualizado: Veiculo): Veiculo {
        val veiculoExistente = veiculoRepository.findById(id)
            .orElseThrow { Exception("Veículo não encontrado!") }

        veiculoExistente.modelo = veiculoAtualizado.modelo
        veiculoExistente.marca = veiculoAtualizado.marca
        veiculoExistente.ano = veiculoAtualizado.ano
        veiculoExistente.valorDiaria = veiculoAtualizado.valorDiaria
        veiculoExistente.disponivel = veiculoAtualizado.disponivel
        veiculoExistente.placa = veiculoAtualizado.placa

        return veiculoRepository.save(veiculoExistente)
    }

    // Buscar por marca
    fun buscarPorMarca(marca: String): List<Veiculo> {
        return veiculoRepository.findByMarcaContainingIgnoreCase(marca)
    }

    // Atualizar localização do veículo
    fun atualizarLocalizacao(id: Long, localizacao: LocalizacaoDTO): Veiculo {
        val veiculo = veiculoRepository.findById(id)
            .orElseThrow { Exception("Veículo não encontrado!") }

        veiculo.latitude = localizacao.latitude
        veiculo.longitude = localizacao.longitude

        return veiculoRepository.save(veiculo)
    }
    fun obterLocalizacao(id: Long): LocalizacaoDTO {
        val veiculo = veiculoRepository.findById(id)
            .orElseThrow { Exception("Veículo não encontrado!") }

        if (veiculo.latitude == null || veiculo.longitude == null) {
            throw Exception("Veículo ainda não possui localização cadastrada!")
        }

        return LocalizacaoDTO(
            latitude = veiculo.latitude!!,
            longitude = veiculo.longitude!!
        )
    }

    fun rankingMaisAlugados(): List<Map<String, Any>> {
        val todasLocacoes = locacaoRepository.findAll()

        // Conta quantidade de locações por veículo
        val contagem = todasLocacoes.filter { it.veiculo != null }
            .groupingBy { it.veiculo!! }
            .eachCount()

        // Ordena do mais alugado para o menos alugado e converte para Map<String, Any>
        val ranking: List<Map<String, Any>> = contagem.entries.sortedByDescending { it.value }.map { entry ->
            val veiculo = entry.key!!
            mapOf<String, Any>(
                "veiculoId" to veiculo.id as Any,
                "marca" to (veiculo.marca ?: "") as Any,
                "modelo" to (veiculo.modelo ?: "") as Any,
                "totalLocacoes" to entry.value as Any
            )
        }

        return ranking
    }

}
