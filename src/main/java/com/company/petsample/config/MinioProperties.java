package com.company.petsample.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;

@ConfigurationProperties("minio")
public class MinioProperties {

    private final String endpoint;
    private final String accessKey;
    private final String secretKey;
    private final String defaultBucket;

    public MinioProperties(@DefaultValue("http://127.0.0.1:9000") String endpoint,
                           @DefaultValue("minioadmin") String accessKey,
                           @DefaultValue("minioadmin") String secretKey,
                           @DefaultValue("petclinic") String defaultBucket) {
        this.endpoint = endpoint;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.defaultBucket = defaultBucket;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public String getAccessKey() {
        return accessKey;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public String getDefaultBucket() {
        return defaultBucket;
    }
}