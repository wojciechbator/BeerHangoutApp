package com.risingForce.utils;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * @Author: WB
 * State to obiekt JSON, który przechowuje wszystkie potrzebne dane dla komponentu React.
 * Każdy komponent ma swój własny state oraz props. Pracujemy zawsze na kopii state.
 */
public final class State {

	public static void populateModel(Model model, HttpServletRequest request) {
		model.addAttribute("__requestPath", getRequestPath(request));
		model.addAttribute("auth", getAuthState(request));
	}

	private static String getRequestPath(HttpServletRequest request) {
		String queryString = request.getQueryString();
		return request.getRequestURI() + (queryString == null ? "" : "?" + queryString);
	}

	public static Map<String, Object> getAuthState(HttpServletRequest request) {
		Optional<List<String>> optionalRoles = getRoles(request);

		return optionalRoles.map(roles -> {
			Map<String, Object> authState = new HashMap<>();
			authState.put("signedIn", !roles.contains("ROLE_ANONYMOUS"));
			authState.put("roles", roles);

			return authState;
		})
		.orElseGet(() -> {
			Map<String, Object> authState = new HashMap<>();
			authState.put("signedIn", false);
			authState.put("roles", Collections.singletonList("ROLE_ANONYMOUS"));

			return authState;
		});
	}

	/**
	 * Jeśli użytkownik nie jest zautoryzowany to dostanie rolę ROLE_ANONYMOUS.
	 * Ta metoda zwraca role użytkowników, np. ROLE_USER, ROLE_ADMIN.
	 */
	private static Optional<List<String>> getRoles(HttpServletRequest request) {
		return getAuthentication(request)
			.map(a -> Functions.map(a.getAuthorities(), GrantedAuthority::getAuthority));
	}

	/**
	 * Zwraca obiekt Authentication, wzięte żywcem ze spring security.
	 */
	private static Optional<Authentication> getAuthentication(HttpServletRequest request) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null) {
			RequestAttributes requestAttributes = new ServletRequestAttributes(request);
			SecurityContext securityContext = (SecurityContext) requestAttributes.getAttribute("SPRING_SECURITY_CONTEXT", RequestAttributes.SCOPE_SESSION);
			if (securityContext == null) {
				securityContext = (SecurityContext) requestAttributes.getAttribute("SPRING_SECURITY_CONTEXT", RequestAttributes.SCOPE_GLOBAL_SESSION);
			}
			if (securityContext != null) {
				authentication = securityContext.getAuthentication();
			}
		}

		return Optional.ofNullable(authentication);
	}
}
