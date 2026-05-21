package com.alquilervehiculos.operaciones.repository;

import com.alquilervehiculos.operaciones.entity.SolicitudAlquiler;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitudAlquilerRepository extends JpaRepository<SolicitudAlquiler, Long> {
}
