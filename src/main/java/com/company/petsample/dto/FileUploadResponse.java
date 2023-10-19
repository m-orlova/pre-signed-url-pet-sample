package com.company.petsample.dto;

import jakarta.validation.constraints.NotNull;

public class FileUploadResponse {
    @NotNull
    private final String objectKey;
    @NotNull
    private final String uploadUrl;

    public FileUploadResponse(String objectKey, String uploadUrl) {
        this.objectKey = objectKey;
        this.uploadUrl = uploadUrl;
    }

    public String getObjectKey() {
        return objectKey;
    }

    public String getUploadUrl() {
        return uploadUrl;
    }
}
