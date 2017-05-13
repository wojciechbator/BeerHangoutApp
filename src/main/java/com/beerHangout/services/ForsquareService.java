package com.beerHangout.services;

import com.beerHangout.models.Venue;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.*;
import com.google.gson.*;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonParseException;
import fi.foyt.foursquare.api.*;
import fi.foyt.foursquare.api.entities.CompactVenue;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Adam Krysiak on 09.05.17.
 */
public class ForsquareService {
    RestTemplate restTemplate;
    Gson gson = new GsonBuilder().registerTypeAdapter(VenuesSearchResponse.class, new VenuesSearchDeserializer()).create();

    private final String FORSQUARE_URL = "https://api.foursquare.com/v2/venues/search?ll=51.11,17.06&oauth_token=RWASTDDQUJ0RHIANAJKWLCCME1NN5TP4YJG5WGXR5B0RH4MI&v=20170509";

//    public List<Venue> downloadVenues() throws IOException {
////        Map<String, String> params = new HashMap<>();
////        params.put("ll", "51.11,17.03");
////        params.put("oauth_token", "RWASTDDQUJ0RHIANAJKWLCCME1NN5TP4YJG5WGXR5B0RH4MI");
////        params.put("v", "20170509");
//        FoursquareApi foursquareApi = new FoursquareApi("423697222", "a.krysiak15@gmail.com", );
//        ResponseEntity<VenueGroup> entity = restTemplate.postForEntity(FORSQUARE_URL,"", VenueGroup.class);
////        ArrayList body = entity.getBody();
//        return null;
//    }

    public void venuesSearch() throws IOException, FoursquareApiException {
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost httpPost = new HttpPost(FORSQUARE_URL);
        CloseableHttpResponse response = httpClient.execute(httpPost);
        HttpEntity entity = response.getEntity();
        String json = EntityUtils.toString(entity);
        httpClient.close();
        VenuesSearchResponse venuesSearchResponse = gson.fromJson(json, VenuesSearchResponse.class);


    }


    public static void main(String[] args) {
//        String ll = args.length > 0?args[0]:"44.3,37.2";

        ForsquareService forsquareService = new ForsquareService();
        try {
            forsquareService.venuesSearch();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (FoursquareApiException e) {
            e.printStackTrace();
        }


    }


    public void searchVenues() throws FoursquareApiException {
        FoursquareApi foursquareApi = new FoursquareApi("35IRT3R4PXFDNYOWFLS0EEXRDVORLOTJMQ2TOMZTQ2JVTYMU", "STCWKLS4BSAIOYMVZIB0B1ZCRSML1PMCY2SJOXVE440QGB2J", "https://api.foursquare.com/v2/venues/search?ll=51.11,17.06");
        Map<String, String> params = new HashMap<>();
        params.put("ll", "50.3,17.2");
        params.put("v", "20170509");
    }

    private class VenuesSearchResponse {
        private List<Venue> venues;
        public VenuesSearchResponse(List<Venue> venues) throws JSONException {
            this.venues = venues;
        }

        public List<Venue> getVenues() {
            return venues;
        }
    }

    private class VenuesSearchDeserializer implements JsonDeserializer<VenuesSearchResponse> {
        @Override
        public VenuesSearchResponse deserialize(JsonElement jsonElement, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
            JsonArray jsonVenuesArray = deserializeVenuesArray(jsonElement);
            List<Venue>venues = new ArrayList<>();
            jsonVenuesArray.forEach(e->venues.add(gson.fromJson(e, Venue.class)));
            return new VenuesSearchResponse(venues);
        }

        private JsonArray deserializeVenuesArray(JsonElement jsonElement) {
            JsonObject jsonObject = jsonElement.getAsJsonObject();
            JsonElement response = jsonObject.get("response");
            JsonElement jsonVenuesElement = response.getAsJsonObject().get("venues");
            return jsonVenuesElement.getAsJsonArray();
        }
    }
}

//https://api.foursquare.com/v2/   venues/search   ?ll=40.7,-74&oauth_token=RWASTDDQUJ0RHIANAJKWLCCME1NN5TP4YJG5WGXR5B0RH4MI&v=20170509