package com.beerHangout.domain.login;

import com.beerHangout.domain.User;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
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

	@Autowired
	private Environment environment;

	/**
	 * Method used to create simple email, which is needed to reset password
	 * @param contextPath path containing current server context
	 * @param locale deciding which translation language use
	 * @param token string containing individual token, needed to reset properly password
	 * @param user	user to whom will be password send
	 * @param password (?)
	 * @return SimpleMailMessage
	 */
	public SimpleMailMessage constuctResetTokenEmail(String contextPath, Locale locale, String token, User user, String password) {
		String url = contextPath + "/changePassword?id=" + user.getId() + "&token=" + token;
		SimpleMailMessage email = new SimpleMailMessage();
		StringBuilder emailBuilder = new StringBuilder();

		emailBuilder.append("Dear " + user.getFirstName());
		emailBuilder.append("\nPlease use following link to reset Your password: \n");
		emailBuilder.append(url);

		email.setTo(user.getEmail());
		email.setSubject(RESET_TOKEN_EMAIL_SUBJECT);
		email.setSentDate(new Date());
		email.setText(emailBuilder.toString());

		return email;
	}

}
