package com.alquilervehiculos.vehiculos.service.impl;

import com.alquilervehiculos.vehiculos.dto.ActualizarEstadoVehiculoRequest;
import com.alquilervehiculos.vehiculos.dto.VehiculoRequest;
import com.alquilervehiculos.vehiculos.dto.VehiculoResponse;
import com.alquilervehiculos.vehiculos.entity.EstadoVehiculo;
import com.alquilervehiculos.vehiculos.entity.Vehiculo;
import com.alquilervehiculos.vehiculos.exception.BusinessException;
import com.alquilervehiculos.vehiculos.exception.ResourceNotFoundException;
import com.alquilervehiculos.vehiculos.repository.VehiculoRepository;
import com.alquilervehiculos.vehiculos.service.VehiculoService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VehiculoServiceImpl implements VehiculoService {

    private final VehiculoRepository vehiculoRepository;

    @Override
    @Transactional
    public VehiculoResponse crear(VehiculoRequest request) {
        vehiculoRepository.findByPlacaIgnoreCase(request.placa())
                .ifPresent(vehiculo -> {
                    throw new BusinessException("Ya existe un vehículo con la placa indicada");
                });

        Vehiculo vehiculo = Vehiculo.builder()
                .marca(request.marca())
                .modelo(request.modelo())
                .placa(request.placa())
                .estado(request.estado())
                .anio(request.anio())
                .tipo(request.tipo())
                .build();

        return mapToResponse(vehiculoRepository.save(vehiculo));
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehiculoResponse> listar() {
        return vehiculoRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public VehiculoResponse obtenerPorId(Long id) {
        return mapToResponse(findById(id));
    }

    @Override
    @Transactional
    public VehiculoResponse actualizar(Long id, VehiculoRequest request) {
        Vehiculo vehiculo = findById(id);

        vehiculoRepository.findByPlacaIgnoreCase(request.placa())
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new BusinessException("Ya existe otro vehículo con la placa indicada");
                });

        vehiculo.setMarca(request.marca());
        vehiculo.setModelo(request.modelo());
        vehiculo.setPlaca(request.placa());
        vehiculo.setEstado(request.estado());
        vehiculo.setAnio(request.anio());
        vehiculo.setTipo(request.tipo());

        return mapToResponse(vehiculoRepository.save(vehiculo));
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        Vehiculo vehiculo = findById(id);
        vehiculoRepository.delete(vehiculo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehiculoResponse> buscarPorMarca(String marca) {
        return vehiculoRepository.findByMarcaIgnoreCase(marca).stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehiculoResponse> buscarPorModelo(String modelo) {
        return vehiculoRepository.findByModeloIgnoreCase(modelo).stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehiculoResponse> buscarPorEstado(EstadoVehiculo estado) {
        return vehiculoRepository.findByEstado(estado).stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional
    public VehiculoResponse actualizarEstado(Long id, ActualizarEstadoVehiculoRequest request) {
        Vehiculo vehiculo = findById(id);
        vehiculo.setEstado(request.estado());
        return mapToResponse(vehiculoRepository.save(vehiculo));
    }

    private Vehiculo findById(Long id) {
        return vehiculoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado con id: " + id));
    }

    private VehiculoResponse mapToResponse(Vehiculo vehiculo) {
        return new VehiculoResponse(
                vehiculo.getId(),
                vehiculo.getMarca(),
                vehiculo.getModelo(),
                vehiculo.getPlaca(),
                vehiculo.getEstado(),
                vehiculo.getAnio(),
                vehiculo.getTipo(),
                vehiculo.getCreatedAt(),
                vehiculo.getUpdatedAt()
        );
    }
}
