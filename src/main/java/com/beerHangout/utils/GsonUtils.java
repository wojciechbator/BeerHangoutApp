package com.beerHangout.utils;

import com.beerHangout.models.VenuesSearchResponse;
import com.beerHangout.serialization.VenuesSearchDeserializer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Created by Adam Krysiak on 13.05.17.
 */
public class GsonUtils {
    private static Gson gson = new GsonBuilder()
            .registerTypeAdapter(VenuesSearchResponse.class, new VenuesSearchDeserializer())
            .create();

    public static Gson getGson() {
        return gson;
    }
}
