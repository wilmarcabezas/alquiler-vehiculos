package com.alquilervehiculos.vehiculos.dto;

import com.alquilervehiculos.vehiculos.entity.EstadoVehiculo;
import jakarta.validation.constraints.NotNull;

public record ActualizarEstadoVehiculoRequest(
        @NotNull(message = "El estado es obligatorio")
        EstadoVehiculo estado
) {
}
