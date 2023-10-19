package com.company.petsample.dto;

import jakarta.validation.constraints.NotNull;

import java.net.URL;

public class FileUploadResponse {
    @NotNull
    private final String objectKey;
    @NotNull
    private final URL uploadUrl;

    public FileUploadResponse(String objectKey, URL uploadUrl) {
        this.objectKey = objectKey;
        this.uploadUrl = uploadUrl;
    }

    public String getObjectKey() {
        return objectKey;
    }

    public URL getUploadUrl() {
        return uploadUrl;
    }
}
