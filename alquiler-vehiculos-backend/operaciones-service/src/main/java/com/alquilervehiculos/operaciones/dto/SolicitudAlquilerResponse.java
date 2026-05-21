package com.alquilervehiculos.operaciones.dto;

import com.alquilervehiculos.operaciones.entity.EstadoSolicitud;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record SolicitudAlquilerResponse(
        Long id,
        Long vehiculoId,
        String nombreCliente,
        String documentoCliente,
        LocalDate fechaInicio,
        LocalDate fechaFin,
        EstadoSolicitud estadoSolicitud,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
