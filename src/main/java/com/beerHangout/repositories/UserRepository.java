package com.beerHangout.repositories;

import com.beerHangout.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * @author Konrad Tyma on 05.03.17.
 */
public interface UserRepository extends MongoRepository<User, Long> {

	List<User> findAll();

	User findOne(Long id);

	User findByEmail(String email);

	User findByUsername(String username);

	User save(User user);

	void delete(User user);
}