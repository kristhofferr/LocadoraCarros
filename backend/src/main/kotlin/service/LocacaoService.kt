package com.ProjetoLocadora.ProjetoLocadora.service

import com.ProjetoLocadora.ProjetoLocadora.model.Locacao
import com.ProjetoLocadora.ProjetoLocadora.repository.LocacaoRepository
import com.ProjetoLocadora.ProjetoLocadora.repository.VeiculoRepository
import com.ProjetoLocadora.ProjetoLocadora.repository.ClienteRepository
import org.springframework.stereotype.Service
import java.time.temporal.ChronoUnit

@Service
class LocacaoService(
    private val locacaoRepository: LocacaoRepository,
    private val veiculoRepository: VeiculoRepository,
    private val clienteRepository: ClienteRepository
) {

    // Registrar uma nova locação
    fun registrarLocacao(locacao: Locacao): Locacao {

        // Valida se o veículo e cliente foram informados
        val veiculoId = locacao.veiculo?.id
            ?: throw Exception("Veículo não informado na locação!")
        val clienteId = locacao.cliente?.id
            ?: throw Exception("Cliente não informado na locação!")

        // Busca os objetos reais no banco
        val cliente = clienteRepository.findById(clienteId)
            .orElseThrow { Exception("Cliente não encontrado!") }
        val veiculo = veiculoRepository.findById(veiculoId)
            .orElseThrow { Exception("Veículo não encontrado!") }

        // Valida datas
        if (locacao.dataFim.isBefore(locacao.dataInicio))
            throw Exception("A data de término não pode ser antes da data de início!")
        if (locacao.dataInicio.isBefore(java.time.LocalDate.now()))
            throw Exception("A data de início não pode ser no passado!")
        if (!veiculo.disponivel)
            throw Exception("Veículo já está alugado!")

        // Calcula o valor total da locação (diárias * quantidade de dias)
        val dias = ChronoUnit.DAYS.between(locacao.dataInicio, locacao.dataFim)
        val valorTotal = dias * veiculo.valorDiaria

        // Atualiza os objetos e marca veículo como indisponível
        locacao.valorTotal = valorTotal
        locacao.cliente = cliente
        locacao.veiculo = veiculo
        veiculo.disponivel = false
        veiculoRepository.save(veiculo)

        return locacaoRepository.save(locacao)
    }

    // Retorna todas as locações cadastradas
    fun listarTodos(): List<Locacao> = locacaoRepository.findAll()

    // Busca uma locação específica pelo ID
    fun buscarPorId(id: Long): Locacao? = locacaoRepository.findById(id).orElse(null)

    // Atualiza dados de uma locação
    fun atualizarLocacao(id: Long, locacaoAtualizada: Locacao): Locacao {
        val locacaoExistente = locacaoRepository.findById(id)
            .orElseThrow { Exception("Locação não encontrada!") }

        val veiculo = locacaoAtualizada.veiculo
            ?: throw Exception("Veículo não informado na atualização!")

        // Calcula quantidade de dias
        val dias = ChronoUnit.DAYS.between(locacaoAtualizada.dataInicio, locacaoAtualizada.dataFim).toInt()

        // Polimorfismo: Moto ou Carro chamam o método correto de calcular valor
        val valorTotal = veiculo.calcularValorTotal(dias)

        // Atualiza dados da locação
        locacaoExistente.dataInicio = locacaoAtualizada.dataInicio
        locacaoExistente.dataFim = locacaoAtualizada.dataFim
        locacaoExistente.veiculo = veiculo
        locacaoExistente.cliente = locacaoAtualizada.cliente
        locacaoExistente.valorTotal = valorTotal

        return locacaoRepository.save(locacaoExistente)
    }

    // Deleta uma locação
    fun deletarLocacao(id: Long) {
        val locacao = locacaoRepository.findById(id)
            .orElseThrow { Exception("Locação não encontrada!") }

        val veiculo = locacao.veiculo
            ?: throw Exception("Veículo da locação não encontrado!")

        // Marca o veículo como disponível ao excluir a locação
        veiculo.disponivel = true
        veiculoRepository.save(veiculo)

        locacaoRepository.deleteById(id)
    }

    // Lista locações de um cliente específico
    fun listarPorCliente(clienteId: Long): List<Locacao> {
        if (!clienteRepository.existsById(clienteId)) {
            throw Exception("Cliente não encontrado!")
        }
        return locacaoRepository.findByClienteId(clienteId)
    }

    // Gera um código de boleto aleatório para pagamento
    fun gerarBoleto(id: Long): Locacao {
        val locacao = locacaoRepository.findById(id)
            .orElseThrow { Exception("Locação não encontrada!") }

        // Cria uma string numérica de 47 dígitos aleatórios
        val codigo = List(47) { (0..9).random() }.joinToString("")
        locacao.codigoBoleto = codigo

        return locacaoRepository.save(locacao)
    }
}

