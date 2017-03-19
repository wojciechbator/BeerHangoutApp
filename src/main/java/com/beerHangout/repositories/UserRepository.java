package com.beerHangout.repositories;

import com.beerHangout.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * @author Konrad Tyma on 05.03.17.
 */
public interface UserRepository extends MongoRepository<User, String> {

	User findOne(String id);

	User findByEmail(String email);

	User findByUsername(String username);

	List<User> findByActive(Boolean active);

	User save(User user);

	void delete(User user);
}
