package com.beerHangout.models;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.io.Serializable;

/**
 * Created by Adam Krysiak on 13.05.17.
 */
@Builder
@Getter
@ToString
public class VenueCategory implements Serializable {
    private String id;
    private String name;
    private String pluralName;
    private String[] parents;
    private Boolean primary;

    public VenueCategory(String id, String name, String pluralName, String[] parents, Boolean primary) {
        this.id = id;
        this.name = name;
        this.pluralName = pluralName;
        this.parents = parents;
        this.primary = primary;
    }
}
