package com.company.presignedurlpetsample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class PreSignedUrlPetSampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(PreSignedUrlPetSampleApplication.class, args);
    }
}
