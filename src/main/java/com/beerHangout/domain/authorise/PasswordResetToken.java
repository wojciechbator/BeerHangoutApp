package com.beerHangout.domain.authorise;

import com.beerHangout.domain.User;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Calendar;
import java.util.Date;

/**
 * @author Konrad Tyma on 09.03.17.
 */
@Getter
@NoArgsConstructor
@Setter
@ToString
@Document(collection = "password_reset_token")
public class PasswordResetToken {

	private static final int EXPIRATION = 24 * 60;

	@Id
	private String tokenId;

	private User user;

	private String token;

	private Date expirationDate;

	public PasswordResetToken(String token, User user) {
		this.token = token;
		this.user = user;
	}

	public int getExpiration(){
		return EXPIRATION;
	}

	private Date calculateExpirationDate(int expirationTimeInMinutes) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(new Date().getTime());
		calendar.add(Calendar.MINUTE, expirationTimeInMinutes);
		return new Date(calendar.getTime().getTime());
	}

	public void updateToken(final String token, int expirationTimeInMinutes) {
		this.token = token;
		//Default should be EXPIRATION, but for test make parametrized function
		this.expirationDate = calculateExpirationDate(expirationTimeInMinutes);
	}

	public PasswordResetToken(User user, String token, Date expirationDate) {
		super();

		this.user = user;
		this.token = token;
		this.expirationDate = expirationDate;
	}

}
