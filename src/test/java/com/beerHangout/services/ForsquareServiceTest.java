package com.beerHangout.services;

import com.beerHangout.models.Venue;
import com.beerHangout.repositories.VenueRepository;
import fi.foyt.foursquare.api.FoursquareApiException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

/**
 * Created by Adam Krysiak on 21.05.17.
 */
@RunWith(MockitoJUnitRunner.class)
public class ForsquareServiceTest {

    public static final String WROCLAW = "wroclaw";
    private List<Venue> exampleVanues = Arrays.asList(
            Venue.builder().name(WROCLAW).city(WROCLAW).build(),
            Venue.builder().name(WROCLAW).city(WROCLAW).build()
    );

    @Mock
    private VenueRepository venueRepository;

    @InjectMocks
    private ForsquareService forsquareService;

    @Test
    public void shouldReturnVenuesByCityFromDB() throws FoursquareApiException, IOException, URISyntaxException {
        //given
        when(venueRepository.findByCity(WROCLAW)).thenReturn(exampleVanues);
        //when
        List<Venue> venuesByCity = forsquareService.getVenuesByCity(WROCLAW);
        //than
        assertThat(venuesByCity).containsAll(exampleVanues);
    }

    @Test
    public void shouldReturnVenuesFromForsquareWhenNoDataInDB() throws FoursquareApiException, IOException, URISyntaxException {
        //given
        when(venueRepository.findByCity(WROCLAW)).thenReturn(Collections.emptyList());
        //when
        forsquareService.getVenuesByCity(WROCLAW);
        //than
        verify(venueRepository, times(1)).save(anyListOf(Venue.class));
    }
}