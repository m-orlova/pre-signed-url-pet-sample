package com.company.petsample.entity;

import com.amplicode.core.file.annotation.FileId;
import jakarta.persistence.*;

@Entity
@Table(name = "pet")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "identifier", nullable = false)
    private String identifier;

    @Column(name = "name")
    private String name;

    @FileId
    @Column(name = "passport", nullable = false)
    private String passport;

    @Column(name = "passport_filename")
    private String passportFilename;

    public String getPassportFilename() {
        return passportFilename;
    }

    public void setPassportFilename(String passportFilename) {
        this.passportFilename = passportFilename;
    }

    public String getPassport() {
        return passport;
    }

    public void setPassport(String passport) {
        this.passport = passport;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}