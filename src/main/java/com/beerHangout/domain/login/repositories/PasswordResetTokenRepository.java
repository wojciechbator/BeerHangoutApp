package com.beerHangout.domain.login.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author Konrad Tyma on 09.03.17.
 */
public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetToken, String>{
	//TODO Implement repository
}
