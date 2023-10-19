package com.company.petsample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class PetSampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(PetSampleApplication.class, args);
    }
}
