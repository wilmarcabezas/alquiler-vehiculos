package com.alquilervehiculos.operaciones.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI operacionesOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Operaciones Service API")
                        .description("Microservicio encargado de gestionar solicitudes de alquiler y comunicarse con vehiculos-service")
                        .version("1.0.0")
                        .contact(new Contact().name("Proyecto académico - Desarrollo Web Full Stack"))
                        .license(new License().name("Uso académico")));
    }
}
