package com.alquilervehiculos.operaciones.dto;

public record VehiculoResponse(
        Long id,
        String marca,
        String modelo,
        String placa,
        String estado,
        Integer anio,
        String tipo,
        String createdAt,
        String updatedAt
) {
}
