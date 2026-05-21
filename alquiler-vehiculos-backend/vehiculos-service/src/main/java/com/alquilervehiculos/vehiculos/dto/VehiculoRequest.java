package com.alquilervehiculos.vehiculos.dto;

import com.alquilervehiculos.vehiculos.entity.EstadoVehiculo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record VehiculoRequest(
        @NotBlank(message = "La marca es obligatoria")
        @Size(max = 100, message = "La marca no puede superar 100 caracteres")
        String marca,

        @NotBlank(message = "El modelo es obligatorio")
        @Size(max = 100, message = "El modelo no puede superar 100 caracteres")
        String modelo,

        @NotBlank(message = "La placa es obligatoria")
        @Size(max = 20, message = "La placa no puede superar 20 caracteres")
        String placa,

        @NotNull(message = "El estado es obligatorio")
        EstadoVehiculo estado,

        Integer anio,
        String tipo
) {
}
