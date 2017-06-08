package com.beerHangout.services;

import com.beerHangout.models.Venue;
import com.beerHangout.models.VenuesSearchResponse;
import com.beerHangout.repositories.VenueRepository;
import com.beerHangout.utils.GsonUtils;
import com.google.gson.*;
import fi.foyt.foursquare.api.FoursquareApiException;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Adam Krysiak on 09.05.17.
 */
@Service
public class ForsquareService {

    private static final String CITY_PARAM = "near";
    private static final String LOCATION_PARAM = "ll";
    private final VenueRepository venueRepository;

    private static final String FORSQUARE_SEARCH_API = "api.foursquare.com/v2/venues/search";
    private static final String KEY = "WPCAN5HFSMDD30WO3UN4JJVINU4SYDBIYCWYGOVEFQSTXZ4J";
    private static final String CLIENT_ID = "0EM1UVHV52I5BGMLGLQTCG0ISP53W4XNITP5RKTRM1Q4N2MC";
    private static final String CLIENT_SECRET = "RYNVU0MWM1B0D2LFV5VTMKYFOM2L4LLNOOOSTH1UIQA1HZ1E";
    private final Gson gson = GsonUtils.getGson();

    @Autowired
    public ForsquareService(VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }

    public List<Venue> getVenuesByCity(String city) throws URISyntaxException, IOException, FoursquareApiException {
        List<Venue> venuesFromDB = getVenuesFromDB(city);
        if(venuesFromDB.isEmpty()){
            List<Venue> venuesFromForsquare = getVenuesFromForsquare(CITY_PARAM, city);
            venueRepository.insert(venuesFromForsquare);
            return venuesFromForsquare;
        }
        return venuesFromDB;
    }

    public List<Venue> getVenuesByLocation(String location) throws URISyntaxException, IOException, FoursquareApiException {
        List<Venue> venuesFromForsquare = getVenuesFromForsquare(LOCATION_PARAM, location);
        venueRepository.insert(venuesFromForsquare);
        return venuesFromForsquare;
    }


    private List<Venue> getVenuesFromDB(String city){
        return venueRepository.findByCity(city);
    }

    private List<Venue> getVenuesFromForsquare(String param, String paramValue) throws IOException, FoursquareApiException, URISyntaxException {
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        URI uri = buildURIWithClientInfo(param, paramValue);
        CloseableHttpResponse response = httpClient.execute(new HttpPost(uri));
        String json = getJson(response);
        httpClient.close();
        VenuesSearchResponse venuesSearchResponse = gson.fromJson(json, VenuesSearchResponse.class);
        return venuesSearchResponse.getVenues();
    }

    private String getJson(CloseableHttpResponse response) throws IOException {
        HttpEntity entity = response.getEntity();
        return EntityUtils.toString(entity);
    }

    private URI buildURIWithClientInfo(String param, String paramValue) throws URISyntaxException {
        return new URIBuilder().setScheme("https").setHost(FORSQUARE_SEARCH_API)
                .addParameter("client_id", CLIENT_ID)
                .addParameter("client_secret", CLIENT_SECRET)
                .addParameter(param, paramValue)
                .addParameter("v", getFormattedTodaysDate())
                .build();
    }

    private static String getFormattedTodaysDate() {
        return new SimpleDateFormat("yyyyMMdd").format(new Date());
    }
}