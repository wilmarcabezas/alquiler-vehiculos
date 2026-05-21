package com.alquilervehiculos.operaciones.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record SolicitudAlquilerRequest(
        @NotNull(message = "El vehiculoId es obligatorio")
        Long vehiculoId,

        @NotBlank(message = "El nombre del cliente es obligatorio")
        String nombreCliente,

        @NotBlank(message = "El documento del cliente es obligatorio")
        String documentoCliente,

        @NotNull(message = "La fecha de inicio es obligatoria")
        @FutureOrPresent(message = "La fecha de inicio no puede ser anterior a la fecha actual")
        LocalDate fechaInicio,

        @NotNull(message = "La fecha de fin es obligatoria")
        @FutureOrPresent(message = "La fecha de fin no puede ser anterior a la fecha actual")
        LocalDate fechaFin
) {
}
