package com.alquilervehiculos.vehiculos.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI vehiculosOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Vehículos Service API")
                        .description("Microservicio encargado de gestionar los vehículos disponibles para alquiler")
                        .version("1.0.0")
                        .contact(new Contact().name("Proyecto académico - Desarrollo Web Full Stack"))
                        .license(new License().name("Uso académico")));
    }
}
