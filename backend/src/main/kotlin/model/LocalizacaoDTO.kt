package com.ProjetoLocadora.ProjetoLocadora.dto


// DTO (Data Transfer Object) usado para enviar e receber dados de localização do veículo
// Não é uma entidade do banco, apenas um objeto auxiliar para transportar dados
data class LocalizacaoDTO(
    val latitude: Double,  // Latitude do veículo
    val longitude: Double  // Longitude do veículo
)
