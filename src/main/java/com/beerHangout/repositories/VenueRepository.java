package com.beerHangout.repositories;

import com.beerHangout.models.Venue;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VenueRepository extends MongoRepository<Venue, String> {

    List<Venue> findAll();

    List<Venue> findByCity(String city);

    Venue findOne(String id);

    void delete(Venue venue);
}
