package com.alquilervehiculos.vehiculos.controller;

import com.alquilervehiculos.vehiculos.dto.ActualizarEstadoVehiculoRequest;
import com.alquilervehiculos.vehiculos.dto.ApiErrorResponse;
import com.alquilervehiculos.vehiculos.dto.VehiculoRequest;
import com.alquilervehiculos.vehiculos.dto.VehiculoResponse;
import com.alquilervehiculos.vehiculos.entity.EstadoVehiculo;
import com.alquilervehiculos.vehiculos.service.VehiculoService;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/vehiculos")
@RequiredArgsConstructor
@Tag(name = "Vehículos", description = "API REST para la gestión de vehículos disponibles para alquiler")
public class VehiculoController {

    private final VehiculoService vehiculoService;

    @PostMapping
    @Operation(summary = "Crear vehículo", description = "Registra un vehículo en la base de datos relacional")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Vehículo creado correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<VehiculoResponse> crear(@Valid @RequestBody VehiculoRequest request) {
        VehiculoResponse response = vehiculoService.crear(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(response.id()).toUri();
        return ResponseEntity.created(location).body(response);
    }

    @GetMapping
    @Operation(summary = "Consultar todos los vehículos")
    public ResponseEntity<List<VehiculoResponse>> listar() {
        return ResponseEntity.ok(vehiculoService.listar());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consultar vehículo por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Vehículo encontrado"),
            @ApiResponse(responseCode = "404", description = "Vehículo no encontrado", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<VehiculoResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(vehiculoService.obtenerPorId(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar vehículo")
    public ResponseEntity<VehiculoResponse> actualizar(@PathVariable Long id, @Valid @RequestBody VehiculoRequest request) {
        return ResponseEntity.ok(vehiculoService.actualizar(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar vehículo")
    @ApiResponse(responseCode = "204", description = "Vehículo eliminado correctamente")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        vehiculoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscar/marca/{marca}")
    @Operation(summary = "Buscar vehículos por marca")
    public ResponseEntity<List<VehiculoResponse>> buscarPorMarca(@PathVariable String marca) {
        return ResponseEntity.ok(vehiculoService.buscarPorMarca(marca));
    }

    @GetMapping("/buscar/modelo/{modelo}")
    @Operation(summary = "Buscar vehículos por modelo")
    public ResponseEntity<List<VehiculoResponse>> buscarPorModelo(@PathVariable String modelo) {
        return ResponseEntity.ok(vehiculoService.buscarPorModelo(modelo));
    }

    @GetMapping("/buscar/estado/{estado}")
    @Operation(summary = "Buscar vehículos por estado", description = "Permite consultar vehículos DISPONIBLE o NO_DISPONIBLE")
    public ResponseEntity<List<VehiculoResponse>> buscarPorEstado(@PathVariable EstadoVehiculo estado) {
        return ResponseEntity.ok(vehiculoService.buscarPorEstado(estado));
    }

    @PutMapping("/{id}/estado")
    @Operation(
            summary = "Actualizar estado del vehículo",
            description = "Endpoint utilizado para cambiar el estado del vehículo, por ejemplo desde operaciones-service"
    )
    @ApiResponse(
            responseCode = "200",
            description = "Estado actualizado correctamente",
            content = @Content(
                    mediaType = "application/json",
                    examples = @ExampleObject(value = "{\n  \"id\": 1,\n  \"marca\": \"Toyota\",\n  \"modelo\": \"Corolla\",\n  \"placa\": \"ABC123\",\n  \"estado\": \"NO_DISPONIBLE\"\n}")
            )
    )
    public ResponseEntity<VehiculoResponse> actualizarEstado(@PathVariable Long id,
                                                             @Valid @RequestBody ActualizarEstadoVehiculoRequest request) {
        return ResponseEntity.ok(vehiculoService.actualizarEstado(id, request));
    }
}
