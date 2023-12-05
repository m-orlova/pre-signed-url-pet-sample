package com.company.petsample.graphql;

import com.amplicode.core.file.FileUploadResponse;
import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.company.petsample.entity.Pet;
import com.company.petsample.minio.MinioService;
import com.company.petsample.repository.PetRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.net.URL;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
public class PetController {
    private final PetRepository crudRepository;
    private final MinioService minioService;
    private final String bucketName;

    public PetController(PetRepository crudRepository,
                         MinioService minioService,
                         @Value("${minio.bucket-name}") String bucketName) {
        this.crudRepository = crudRepository;
        this.minioService = minioService;
        this.bucketName = bucketName;
    }

    @QueryMapping(name = "petList")
    @Transactional(readOnly = true)
    @NonNull
    public ResultPage<Pet> findAll(@Argument("sort") List<PetOrderByInput> sortInput, @Argument("page") OffsetPageInput pageInput) {
        Pageable page = Optional.ofNullable(pageInput)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()).withSort(createSort(sortInput)))
                .orElseGet(() -> PageRequest.ofSize(20).withSort(createSort(sortInput)));
        Page<Pet> pageData = crudRepository.findAll(page);
        return ResultPage.page(pageData.getContent(), pageData.getTotalElements());
    }

    @MutationMapping(name = "deletePet")
    public void delete(@Argument @NonNull @GraphQLId Pet id) {
        crudRepository.delete(id);
    }

    @QueryMapping(name = "pet")
    @Transactional(readOnly = true)
    @NonNull
    public Pet findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updatePet")
    @Transactional
    @NonNull
    public Pet update(@Argument @NonNull Pet input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        return crudRepository.save(input);
    }

    @QueryMapping(name = "petPassportUploadUrl")
    @NonNull
    public FileUploadResponse getPassportUploadUrl(@Argument @NonNull String originalFilename) {
        //Generate an identifier for new file
        String fileId = UUID.randomUUID() + "." + FilenameUtils.getExtension(originalFilename);
        URL uploadUrl = minioService.getPresignedUploadUrl(bucketName, fileId);
        return new FileUploadResponse(fileId, uploadUrl);
    }

    @QueryMapping(name = "petPassportDownloadUrl")
    @NonNull
    public URL getPassportDownloadUrl(@GraphQLId @NonNull @Argument Long id) {
        Pet pet = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entity not found by id: " + id));

        String fileId = pet.getPassport();
        if (fileId == null) {
            throw new RuntimeException("File id is not set for entity: " + id);
        }
        return minioService.getPresignedDownloadUrl(bucketName, fileId);
    }

    protected Sort createSort(List<PetOrderByInput> sortInput) {
        if (sortInput == null || sortInput.isEmpty()) {
            return Sort.unsorted();
        }
        List<Sort.Order> orders = sortInput.stream()
                .map(item -> {
                    Sort.Direction direction;
                    if (item.getDirection() == SortDirection.ASC) {
                        direction = Sort.Direction.ASC;
                    } else {
                        direction = Sort.Direction.DESC;
                    }
                    switch (item.getProperty()) {
                        case IDENTIFIER:
                            return Sort.Order.by("identifier").with(direction);
                        case NAME:
                            return Sort.Order.by("name").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    static class PetOrderByInput {

        private PetOrderByProperty property;
        private SortDirection direction;

        public PetOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(PetOrderByProperty property) {
            this.property = property;
        }

        public SortDirection getDirection() {
            return direction;
        }
    }


    public enum SortDirection {ASC, DESC}

    public enum PetOrderByProperty {IDENTIFIER, NAME}
}