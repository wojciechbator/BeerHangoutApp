package com.beerHangout.repositories;

import com.beerHangout.models.PasswordResetToken;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * @author Konrad Tyma on 09.03.17.
 */
public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetToken, String> {

    List<PasswordResetToken> findAll();

    PasswordResetToken findOne(String tokenId);

    PasswordResetToken save(PasswordResetToken passwordResetToken);

    void delete(PasswordResetToken passwordResetToken);
}
