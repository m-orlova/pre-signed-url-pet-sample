package com.company.petsample.minio;

import com.company.petsample.config.MinioProperties;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.Objects;

@Component
public class MinioStorage {
    private final S3Presigner s3Presigner;
    private final S3Client s3Client;
    private final MinioProperties minioProperties;

    public MinioStorage(S3Presigner s3Presigner,
                        S3Client s3Client,
                        MinioProperties minioProperties) {
        this.s3Presigner = s3Presigner;
        this.s3Client = s3Client;
        this.minioProperties = minioProperties;
    }

    public String getPreSignedUploadUrl(String objectKey,
                                        String contentType, Duration duration) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(minioProperties.getDefaultBucket())
                .key(objectKey)
                .contentType(contentType)
                .build();

        PutObjectPresignRequest preSignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(duration)
                .putObjectRequest(objectRequest)
                .build();
        PresignedPutObjectRequest preSignedRequest = s3Presigner.presignPutObject(preSignRequest);
        return preSignedRequest.url().toString();
    }

    public String getPreSignedDownloadUrl(String objectKey, Duration duration) {
        Objects.requireNonNull(objectKey, "object key not specified");

        GetObjectRequest objectRequest = GetObjectRequest.builder()
                .bucket(minioProperties.getDefaultBucket())
                .key(objectKey)
                .build();
        GetObjectPresignRequest preSignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(duration)
                .getObjectRequest(objectRequest)
                .build();

        PresignedGetObjectRequest preSignedRequest = s3Presigner.presignGetObject(preSignRequest);

        return preSignedRequest.url().toString();
    }

    public void delete(String objectKey) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(minioProperties.getDefaultBucket())
                .key(objectKey)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }
}
