package com.beerHangout.controllers;

import com.beerHangout.models.Venue;
import com.beerHangout.repositories.VenueRepository;
import com.beerHangout.services.ForsquareService;
import fi.foyt.foursquare.api.FoursquareApiException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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


    private final ForsquareService forsquareService;

    @Autowired
    public PremisesController(ForsquareService forsquareService) {
        this.forsquareService = forsquareService;
    }


    @RequestMapping(value = "{location}", method = RequestMethod.GET)
    public List<Venue> getVenuesByLocation(@PathVariable("location") String location) throws URISyntaxException, IOException, FoursquareApiException {
        List<Venue> venues = forsquareService.getVenuesByLocation(location);
        LOGGER.info("Getting venues by location" );
        return venues;
    }

    @RequestMapping(value = "{city}", method = RequestMethod.GET)
    public List<Venue> getVenuesByCity(@PathVariable("city") String city) throws URISyntaxException, IOException, FoursquareApiException {
        List<Venue> venues = forsquareService.getVenuesByCity(city);
        LOGGER.info("Getting venues by city" );
        return venues;
    }
}
