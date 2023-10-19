package com.company.petsample.graphql;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.company.petsample.dto.FileUploadResponse;
import com.company.petsample.entity.Pet;
import com.company.petsample.minio.MinioStorage;
import com.company.petsample.repository.PetRepository;
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
import java.time.Duration;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class PetController {
    private final PetRepository crudRepository;
    private final MinioStorage minioStorage;

    public PetController(PetRepository crudRepository,
                         MinioStorage minioStorage) {
        this.crudRepository = crudRepository;
        this.minioStorage = minioStorage;
    }

    @MutationMapping(name = "deletePet")
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        Pet entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
        if (entity.getPassport() != null) {
            minioStorage.delete(entity.getPassport());
        }
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
    public FileUploadResponse getPassportUploadUrl(@Argument @NonNull String originalFilename, @Argument String contentType) {
        String objectKey = System.currentTimeMillis() + "_" + originalFilename;
        URL uploadUrl = minioStorage.getPreSignedUploadUrl(objectKey, contentType, Duration.ofMinutes(10));
        return new FileUploadResponse(objectKey, uploadUrl);
    }

    @QueryMapping(name = "petPassportDownloadUrl")
    @NonNull
    public URL getPassportDownloadUrl(@GraphQLId @NonNull @Argument Long id) {
        Pet pet = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entity not found by id: " + id));

        return minioStorage.getPreSignedDownloadUrl(pet.getPassport(), Duration.ofMinutes(10));
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

        public void setDirection(SortDirection direction) {
            this.direction = direction;
        }
    }

    public enum SortDirection {ASC, DESC}

    public enum PetOrderByProperty {IDENTIFIER, NAME}
}