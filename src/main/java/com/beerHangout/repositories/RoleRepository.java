package com.beerHangout.repositories;

import com.beerHangout.domain.authorise.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * @author Konrad Tyma on 05.03.17.
 */
public interface RoleRepository extends MongoRepository<Role, String> {

    List<Role> findAll();

    Role findOne(String id);

    Role save(Role user);

    void delete(Role user);
}
