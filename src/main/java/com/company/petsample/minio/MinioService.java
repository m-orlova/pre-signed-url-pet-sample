package com.company.petsample.minio;

import io.minio.*;
import io.minio.errors.MinioException;
import io.minio.http.Method;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeUnit;

/**
 * Service to interact with MinIO server using {@link MinioClient}.
 */
@Component
public class MinioService {
    private final MinioClient minioClient;

    public MinioService(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    /**
     * Uploads a file with the specified content and key to the specified bucket.
     *
     * @param bucketName  bucket name
     * @param objectKey   object key
     * @param inputStream file content stream
     * @param contentType MIME type
     */
    public void uploadFile(String bucketName, String objectKey,
                           InputStream inputStream, String contentType) {

        try {
            minioClient.putObject(PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(objectKey)
                    .contentType(contentType)
                    .stream(inputStream, inputStream.available(), -1)
                    .build());
        } catch (MinioException | InvalidKeyException | IOException | NoSuchAlgorithmException |
                 IllegalArgumentException e) {
            throw new RuntimeException("Unable to upload a file. Key: " + objectKey + ", Bucket: " + bucketName, e);
        }
    }

    /**
     * Gets a content of file with the specified key from the specified bucket.
     *
     * @param bucketName bucket name
     * @param objectKey  object key
     * @return content of found file as stream
     */
    public InputStream downloadFile(String bucketName, String objectKey) {
        try {
            return minioClient.getObject(GetObjectArgs.builder()
                    .bucket(bucketName)
                    .object(objectKey)
                    .build());
        } catch (MinioException | InvalidKeyException | IOException | NoSuchAlgorithmException e) {
            throw new RuntimeException("Unable to download a file. Key: " + objectKey + ", Bucket: " + bucketName, e);
        }
    }

    /**
     * Deletes a file with the specified key from the specified bucket.
     *
     * @param bucketName bucket name
     * @param objectKey  object key
     */
    public void deleteFile(String bucketName, String objectKey) {
        try {
            minioClient.removeObject(RemoveObjectArgs.builder()
                    .bucket(bucketName)
                    .object(objectKey)
                    .build());
        } catch (MinioException | InvalidKeyException | IOException | NoSuchAlgorithmException |
                 IllegalArgumentException e) {
            throw new RuntimeException("Unable to delete a file. Key: " + objectKey + ", Bucket: " + bucketName, e);
        }
    }

    /**
     * Generates a public temporary (pre-signed) URL to download a file with the specified key from the specified bucket.
     *
     * @param bucketName bucket name
     * @param objectKey  object key
     * @return pre-signed URL for file download
     */
    public URL getPresignedDownloadUrl(String bucketName, String objectKey) {
        try {
            String url = minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                    .method(Method.GET)
                    .expiry(10, TimeUnit.MINUTES)
                    .bucket(bucketName)
                    .object(objectKey)
                    .build());
            return new URL(url);
        } catch (MinioException | InvalidKeyException | IOException | NoSuchAlgorithmException |
                 IllegalArgumentException e) {
            throw new RuntimeException("Unable to get a pre-signed URL for download. Key: " + objectKey + ", Bucket: " + bucketName, e);
        }
    }

    /**
     * Generates a public temporary (pre-signed) URL to upload a file with the specified key to the specified bucket.
     *
     * @param bucketName bucket name
     * @param objectKey  object key
     * @return pre-signed URL for file upload
     */
    public URL getPresignedUploadUrl(String bucketName, String objectKey) {
        try {
            String url = minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                    .method(Method.PUT)
                    .expiry(10, TimeUnit.MINUTES)
                    .bucket(bucketName)
                    .object(objectKey)
                    .build());
            return new URL(url);
        } catch (MinioException | InvalidKeyException | IOException | NoSuchAlgorithmException |
                 IllegalArgumentException e) {
            throw new RuntimeException("Unable to get a pre-signed URL for upload. Key: " + objectKey + ", Bucket: " + bucketName, e);
        }
    }

}
