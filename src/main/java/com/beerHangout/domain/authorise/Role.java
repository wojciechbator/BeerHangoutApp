package com.beerHangout.domain.authorise;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

/**
 * @author Konrad Tyma on 05.03.17.
 */
@Data
@NoArgsConstructor
@Document(collection = "roles")
public class Role {
	@Id
	private int roleId;
	private String name;

	private Set<UserRole> userRoles = new HashSet<>();

}
