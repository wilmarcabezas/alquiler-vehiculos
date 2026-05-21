package com.alquilervehiculos.vehiculos.dto;

import com.alquilervehiculos.vehiculos.entity.EstadoVehiculo;
import java.time.LocalDateTime;

public record VehiculoResponse(
        Long id,
        String marca,
        String modelo,
        String placa,
        EstadoVehiculo estado,
        Integer anio,
        String tipo,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
