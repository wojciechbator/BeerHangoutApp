package com.beerHangout.controllers;

import com.beerHangout.models.Venue;
import com.beerHangout.repositories.VenueRepository;
import com.beerHangout.services.ForsquareService;
import fi.foyt.foursquare.api.FoursquareApiException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.lang.reflect.Array;
import java.net.URISyntaxException;
import java.util.*;

/**
 * Created by mateusz on 13.05.17.
 */
@CrossOrigin
@RestController
@RequestMapping("/api/premises")
public class PremisesController {
    private static final Logger LOGGER = Logger.getLogger(PremisesController.class);

    private final VenueRepository venueRepository;

    @Autowired
    public ForsquareService forsquareService;

    @Autowired
    public PremisesController(VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }


    @RequestMapping(value = "{location}", method = RequestMethod.GET)
    public Map<String, List<Venue>> getVenuesByLocation(@PathVariable("location") String location) throws URISyntaxException, IOException, FoursquareApiException {
        Map<String, List<Venue>> venuesMap = new HashMap<>();
        Venue statusVenue = new Venue();
        List<Venue> venues = forsquareService.venuesSearch(location);
        LOGGER.info("Getting venues using foursquareService " );
        if (venues.isEmpty()) {
            statusVenue.setName("error");
            venuesMap.put("status", Arrays.asList(statusVenue));
        } else {
            venues = venueRepository.save(venues);
            statusVenue.setName("ok");
            venuesMap.put("status",  Arrays.asList(statusVenue));
            venuesMap.put("data", venues);
        }
        return venuesMap;
    }


}
