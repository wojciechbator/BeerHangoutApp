package com.beerHangout.services;

import com.beerHangout.models.Venue;
import com.beerHangout.models.VenuesSearchResponse;
import com.beerHangout.serialization.VenuesSearchDeserializer;
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
    private static final String FORSQUARE_SEARCH_API = "api.foursquare.com/v2/venues/search";
    private static final String KEY = "WPCAN5HFSMDD30WO3UN4JJVINU4SYDBIYCWYGOVEFQSTXZ4J";
    private static final String CLIENT_ID = "0EM1UVHV52I5BGMLGLQTCG0ISP53W4XNITP5RKTRM1Q4N2MC";
    private static final String CLIENT_SECRET = "RYNVU0MWM1B0D2LFV5VTMKYFOM2L4LLNOOOSTH1UIQA1HZ1E";

    private final Gson gson = GsonUtils.getGson();

    public List<Venue> venuesSearch(String locations) throws IOException, FoursquareApiException, URISyntaxException {
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        URI uri = buildURIWithClientInfo(locations);
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

    private URI buildURI(String locations) throws URISyntaxException {
        return new URIBuilder().setScheme("https").setHost(FORSQUARE_SEARCH_API)
                .addParameter("oauth_token", KEY)
                .addParameter("ll", locations)
                .addParameter("v", getFormattedTodaysDate())
                .build();
    }

    private URI buildURIWithClientInfo(String locations) throws URISyntaxException {
        return new URIBuilder().setScheme("https").setHost(FORSQUARE_SEARCH_API)
                .addParameter("client_id", CLIENT_ID)
                .addParameter("client_secret", CLIENT_SECRET)
                .addParameter("ll", locations)
                .addParameter("v", getFormattedTodaysDate())
                .build();
    }

    private static String getFormattedTodaysDate() {
        return new SimpleDateFormat("yyyyMMdd").format(new Date());
    }

    public static void main(String[] args) {
        ForsquareService forsquareService = new ForsquareService();
        try {
            forsquareService.venuesSearch("51.11,17.06").forEach(System.out::println);
        } catch (IOException | FoursquareApiException | URISyntaxException e) {
            e.printStackTrace();
        }
    }
}