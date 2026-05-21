package com.alquilervehiculos.operaciones.client;

import com.alquilervehiculos.operaciones.dto.ActualizarEstadoVehiculoRequest;
import com.alquilervehiculos.operaciones.dto.VehiculoResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "vehiculos-service", url = "${vehiculos.service.url:http://vehiculos-service:8081}", configuration = com.alquilervehiculos.operaciones.config.FeignConfig.class)
public interface VehiculoClient {

    @GetMapping("/api/vehiculos/{id}")
    VehiculoResponse obtenerVehiculo(@PathVariable("id") Long id);

    @PutMapping("/api/vehiculos/{id}/estado")
    VehiculoResponse actualizarEstado(@PathVariable("id") Long id,
                                      @RequestBody ActualizarEstadoVehiculoRequest request);
}
