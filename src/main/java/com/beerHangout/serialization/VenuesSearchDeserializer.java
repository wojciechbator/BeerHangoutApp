package com.beerHangout.serialization;

import com.beerHangout.models.Venue;
import com.beerHangout.models.VenuesSearchResponse;
import com.beerHangout.services.ForsquareService;
import com.beerHangout.utils.GsonUtils;
import com.google.gson.*;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Adam Krysiak on 13.05.17.
 */
public class VenuesSearchDeserializer implements JsonDeserializer<VenuesSearchResponse> {

    private Gson gson = new Gson();
    @Override
    public VenuesSearchResponse deserialize(JsonElement jsonElement, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
        JsonArray jsonVenuesArray = deserializeVenuesArray(jsonElement);
        List<Venue> venues = new ArrayList<>();
        jsonVenuesArray.forEach(e -> venues.add(convertElementToVenue(e)));
        return new VenuesSearchResponse(venues);
    }

    private JsonArray deserializeVenuesArray(JsonElement jsonElement) {
        return jsonElement
                .getAsJsonObject()
                .get("response")
                .getAsJsonObject()
                .get("venues")
                .getAsJsonArray();
    }

    private Venue convertElementToVenue(JsonElement e) {
        return gson.fromJson(e, Venue.class);
    }
}
