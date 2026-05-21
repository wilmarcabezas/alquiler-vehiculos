package com.alquilervehiculos.operaciones.controller;

import com.alquilervehiculos.operaciones.dto.ApiErrorResponse;
import com.alquilervehiculos.operaciones.dto.SolicitudAlquilerRequest;
import com.alquilervehiculos.operaciones.dto.SolicitudAlquilerResponse;
import com.alquilervehiculos.operaciones.service.SolicitudAlquilerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/operaciones/solicitudes")
@RequiredArgsConstructor
@Tag(name = "Operaciones", description = "API REST para la gestión de solicitudes de alquiler")
public class SolicitudAlquilerController {

    private final SolicitudAlquilerService solicitudAlquilerService;

    @PostMapping
    @Operation(summary = "Registrar solicitud de alquiler")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Solicitud registrada correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos o vehículo no disponible", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<SolicitudAlquilerResponse> crear(@Valid @RequestBody SolicitudAlquilerRequest request) {
        SolicitudAlquilerResponse response = solicitudAlquilerService.crear(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(response.id()).toUri();
        return ResponseEntity.created(location).body(response);
    }

    @GetMapping
    @Operation(summary = "Consultar todas las solicitudes")
    public ResponseEntity<List<SolicitudAlquilerResponse>> listar() {
        return ResponseEntity.ok(solicitudAlquilerService.listar());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consultar solicitud por ID")
    public ResponseEntity<SolicitudAlquilerResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(solicitudAlquilerService.obtenerPorId(id));
    }

    @PostMapping("/{id}/confirmar")
    @Operation(
            summary = "Confirmar solicitud",
            description = "Verifica disponibilidad en vehiculos-service y cambia el vehículo a NO_DISPONIBLE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "Solicitud confirmada",
            content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"id\": 1,\n  \"vehiculoId\": 1,\n  \"estadoSolicitud\": \"CONFIRMADA\"\n}"))
    )
    public ResponseEntity<SolicitudAlquilerResponse> confirmar(@PathVariable Long id) {
        return ResponseEntity.ok(solicitudAlquilerService.confirmar(id));
    }

    @PostMapping("/{id}/cancelar")
    @Operation(
            summary = "Cancelar solicitud",
            description = "Cancela la solicitud y, si estaba confirmada, devuelve el vehículo a estado DISPONIBLE"
    )
    public ResponseEntity<SolicitudAlquilerResponse> cancelar(@PathVariable Long id) {
        return ResponseEntity.ok(solicitudAlquilerService.cancelar(id));
    }
}
