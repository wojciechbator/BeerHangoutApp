package com.beerHangout.domain.login;

import com.beerHangout.domain.User;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Locale;

/**
 * @author Konrad Tyma on 09.03.17.
 */
@Component
public class MailConstructor {

	public static final String RESET_TOKEN_EMAIL_SUBJECT = "Reset password";


	public SimpleMailMessage constuctResetTokenEmail(String contextPath, Locale locale, String token, User user, String password) {
		String url = contextPath + "/changePassword?id=" + user.getId() + "&token=" + token;
		StringBuilder sb = new StringBuilder();
		sb.append("Dear " + user.getFirstName());
		sb.append("\nPlease use following link to reset Your password: \n");
		sb.append(url);

		SimpleMailMessage email = new SimpleMailMessage();
		email.setTo(user.getEmail());
		email.setSubject(RESET_TOKEN_EMAIL_SUBJECT);
		email.setSentDate(new Date());
		email.setText(sb.toString());

		return email;
	}

}
