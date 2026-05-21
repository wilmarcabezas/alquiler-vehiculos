package com.alquilervehiculos.vehiculos.service;

import com.alquilervehiculos.vehiculos.dto.ActualizarEstadoVehiculoRequest;
import com.alquilervehiculos.vehiculos.dto.VehiculoRequest;
import com.alquilervehiculos.vehiculos.dto.VehiculoResponse;
import com.alquilervehiculos.vehiculos.entity.EstadoVehiculo;
import java.util.List;

public interface VehiculoService {

    VehiculoResponse crear(VehiculoRequest request);

    List<VehiculoResponse> listar();

    VehiculoResponse obtenerPorId(Long id);

    VehiculoResponse actualizar(Long id, VehiculoRequest request);

    void eliminar(Long id);

    List<VehiculoResponse> buscarPorMarca(String marca);

    List<VehiculoResponse> buscarPorModelo(String modelo);

    List<VehiculoResponse> buscarPorEstado(EstadoVehiculo estado);

    VehiculoResponse actualizarEstado(Long id, ActualizarEstadoVehiculoRequest request);
}
