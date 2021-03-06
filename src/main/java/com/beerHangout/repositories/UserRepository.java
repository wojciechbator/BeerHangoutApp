package com.beerHangout.repositories;

import com.beerHangout.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * @author Konrad Tyma on 05.03.17.
 */
public interface UserRepository extends MongoRepository<User, String> {

    List<User> findAll();

    User findOne(String id);

    User findByEmail(String email);

    User findByUsername(String username);

    User save(User user);

    void delete(User user);

}
