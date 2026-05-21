package com.alquilervehiculos.operaciones.service.impl;

import com.alquilervehiculos.operaciones.client.VehiculoClient;
import com.alquilervehiculos.operaciones.dto.ActualizarEstadoVehiculoRequest;
import com.alquilervehiculos.operaciones.dto.SolicitudAlquilerRequest;
import com.alquilervehiculos.operaciones.dto.SolicitudAlquilerResponse;
import com.alquilervehiculos.operaciones.dto.VehiculoResponse;
import com.alquilervehiculos.operaciones.entity.EstadoSolicitud;
import com.alquilervehiculos.operaciones.entity.SolicitudAlquiler;
import com.alquilervehiculos.operaciones.exception.BusinessException;
import com.alquilervehiculos.operaciones.exception.ResourceNotFoundException;
import com.alquilervehiculos.operaciones.repository.SolicitudAlquilerRepository;
import com.alquilervehiculos.operaciones.service.SolicitudAlquilerService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SolicitudAlquilerServiceImpl implements SolicitudAlquilerService {

    private static final String DISPONIBLE = "DISPONIBLE";
    private static final String NO_DISPONIBLE = "NO_DISPONIBLE";

    private final SolicitudAlquilerRepository solicitudAlquilerRepository;
    private final VehiculoClient vehiculoClient;

    @Override
    @Transactional
    public SolicitudAlquilerResponse crear(SolicitudAlquilerRequest request) {
        if (request.fechaFin().isBefore(request.fechaInicio())) {
            throw new BusinessException("La fecha de fin no puede ser anterior a la fecha de inicio");
        }

        VehiculoResponse vehiculo = vehiculoClient.obtenerVehiculo(request.vehiculoId());
        validarVehiculoDisponible(vehiculo);

        SolicitudAlquiler solicitud = SolicitudAlquiler.builder()
                .vehiculoId(request.vehiculoId())
                .nombreCliente(request.nombreCliente())
                .documentoCliente(request.documentoCliente())
                .fechaInicio(request.fechaInicio())
                .fechaFin(request.fechaFin())
                .estadoSolicitud(EstadoSolicitud.PENDIENTE)
                .build();

        return mapToResponse(solicitudAlquilerRepository.save(solicitud));
    }

    @Override
    @Transactional(readOnly = true)
    public List<SolicitudAlquilerResponse> listar() {
        return solicitudAlquilerRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public SolicitudAlquilerResponse obtenerPorId(Long id) {
        return mapToResponse(findById(id));
    }

    @Override
    @Transactional
    public SolicitudAlquilerResponse confirmar(Long id) {
        SolicitudAlquiler solicitud = findById(id);

        if (solicitud.getEstadoSolicitud() == EstadoSolicitud.CANCELADA) {
            throw new BusinessException("No se puede confirmar una solicitud cancelada");
        }
        if (solicitud.getEstadoSolicitud() == EstadoSolicitud.CONFIRMADA) {
            throw new BusinessException("La solicitud ya está confirmada");
        }

        VehiculoResponse vehiculo = vehiculoClient.obtenerVehiculo(solicitud.getVehiculoId());
        validarVehiculoDisponible(vehiculo);
        vehiculoClient.actualizarEstado(solicitud.getVehiculoId(), new ActualizarEstadoVehiculoRequest(NO_DISPONIBLE));

        solicitud.setEstadoSolicitud(EstadoSolicitud.CONFIRMADA);
        return mapToResponse(solicitudAlquilerRepository.save(solicitud));
    }

    @Override
    @Transactional
    public SolicitudAlquilerResponse cancelar(Long id) {
        SolicitudAlquiler solicitud = findById(id);

        if (solicitud.getEstadoSolicitud() == EstadoSolicitud.CANCELADA) {
            throw new BusinessException("La solicitud ya está cancelada");
        }

        if (solicitud.getEstadoSolicitud() == EstadoSolicitud.CONFIRMADA) {
            vehiculoClient.actualizarEstado(solicitud.getVehiculoId(), new ActualizarEstadoVehiculoRequest(DISPONIBLE));
        }

        solicitud.setEstadoSolicitud(EstadoSolicitud.CANCELADA);
        return mapToResponse(solicitudAlquilerRepository.save(solicitud));
    }

    private void validarVehiculoDisponible(VehiculoResponse vehiculo) {
        if (vehiculo == null || vehiculo.id() == null) {
            throw new BusinessException("El vehículo indicado no existe");
        }
        if (!DISPONIBLE.equalsIgnoreCase(vehiculo.estado())) {
            throw new BusinessException("El vehículo no está disponible para alquiler");
        }
    }

    private SolicitudAlquiler findById(Long id) {
        return solicitudAlquilerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Solicitud no encontrada con id: " + id));
    }

    private SolicitudAlquilerResponse mapToResponse(SolicitudAlquiler solicitud) {
        return new SolicitudAlquilerResponse(
                solicitud.getId(),
                solicitud.getVehiculoId(),
                solicitud.getNombreCliente(),
                solicitud.getDocumentoCliente(),
                solicitud.getFechaInicio(),
                solicitud.getFechaFin(),
                solicitud.getEstadoSolicitud(),
                solicitud.getCreatedAt(),
                solicitud.getUpdatedAt()
        );
    }
}
