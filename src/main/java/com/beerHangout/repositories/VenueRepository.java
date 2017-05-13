package com.beerHangout.repositories;

import com.beerHangout.models.Venue;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface VenueRepository extends MongoRepository<Venue, String> {

    List<Venue> findAll();

    Venue findOne(String id);

    List<Venue> save(List<Venue> venues);

    void delete(Venue venue);
}
