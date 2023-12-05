package com.company.petsample.config;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioConfiguration {
    private final String endpoint;
    private final String accessKey;
    private final String secretKey;

    public MinioConfiguration(@Value("${minio.endpoint}") String endpoint,
                              @Value("${minio.access-key}") String accessKey,
                              @Value("${minio.secret-key}") String secretKey) {
        this.endpoint = endpoint;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }

    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();
    }
}
