package com.beerHangout.domain;

import com.beerHangout.domain.authorise.Authority;
import com.beerHangout.domain.authorise.UserRole;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Konrad Tyma on 05.03.17.
 */
@Data
@NoArgsConstructor
@Document(collection = "users")
public class User implements UserDetails{
	@Id
	private Long Id;
	private String username;
	private String password;
	private String email;
	private String firstName;
	private String lastName;
	private String phone;

	private Set<UserRole> userRoles = new HashSet<>();
	private boolean enabled = true;


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Set<Authority> authorities = new HashSet<>();
		userRoles.forEach(user -> authorities.add(new Authority(user.getRole().getName())));

		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return this.enabled;
	}

}
