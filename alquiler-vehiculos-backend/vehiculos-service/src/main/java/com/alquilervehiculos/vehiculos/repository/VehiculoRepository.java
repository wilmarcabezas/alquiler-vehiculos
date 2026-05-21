package com.alquilervehiculos.vehiculos.repository;

import com.alquilervehiculos.vehiculos.entity.EstadoVehiculo;
import com.alquilervehiculos.vehiculos.entity.Vehiculo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {

    List<Vehiculo> findByMarcaIgnoreCase(String marca);

    List<Vehiculo> findByModeloIgnoreCase(String modelo);

    List<Vehiculo> findByEstado(EstadoVehiculo estado);

    Optional<Vehiculo> findByPlacaIgnoreCase(String placa);
}
