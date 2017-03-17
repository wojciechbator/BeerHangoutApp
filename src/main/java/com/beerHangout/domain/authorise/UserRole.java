package com.beerHangout.domain.authorise;

import com.beerHangout.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author Konrad Tyma on 05.03.17.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user_roles")
public class UserRole {
	@Id
	private Long userRoleId;
	private User user;
	private Role role;

	public UserRole(User user, Role role) {
	}
}
