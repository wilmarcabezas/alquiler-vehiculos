package com.alquilervehiculos.operaciones.service;

import com.alquilervehiculos.operaciones.dto.SolicitudAlquilerRequest;
import com.alquilervehiculos.operaciones.dto.SolicitudAlquilerResponse;
import java.util.List;

public interface SolicitudAlquilerService {

    SolicitudAlquilerResponse crear(SolicitudAlquilerRequest request);

    List<SolicitudAlquilerResponse> listar();

    SolicitudAlquilerResponse obtenerPorId(Long id);

    SolicitudAlquilerResponse confirmar(Long id);

    SolicitudAlquilerResponse cancelar(Long id);
}
