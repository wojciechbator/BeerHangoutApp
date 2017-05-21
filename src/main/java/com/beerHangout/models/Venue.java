package com.beerHangout.models;

import fi.foyt.foursquare.api.entities.*;
import fi.foyt.foursquare.api.entities.venue.Hours;
import fi.foyt.foursquare.api.entities.venue.Menu;
import fi.foyt.foursquare.api.entities.venue.Price;
import lombok.*;
import lombok.experimental.Tolerate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

/**
 * Created by Adam Krysiak on 09.05.17.
 */
@Data
@Getter
@Setter
@ToString
@Builder
@Document(collection = "venues")
public class Venue implements Serializable {
    @Id
    protected String id;
    protected String name;
    protected Contact contact;
    protected Location location;
    //redundant but useful when searching from repo
    protected String city;
    protected List<VenueCategory> categories;
    protected Boolean verified;
    protected Stats stats;
    protected String url;
    protected Boolean isClosed = false;
    protected Menu menu;
    protected Price price;
    protected Integer rating;
    protected Hours hours;

    @Tolerate
    Venue(){}
}
