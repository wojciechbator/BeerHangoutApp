package com.beerHangout.models;

import lombok.Getter;
import org.json.JSONException;

import java.io.Serializable;
import java.util.List;

/**
 * Created by Adam Krysiak on 13.05.17.
 */

@Getter
public class VenuesSearchResponse implements Serializable {
    private final List<Venue> venues;

    public VenuesSearchResponse(List<Venue> venues) throws JSONException {
        this.venues = venues;
    }
}
