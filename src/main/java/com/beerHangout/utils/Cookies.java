package com.beerHangout.utils;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public final class Cookies {

    public static final String XSRF_TOKEN_NAME = "XSRF-TOKEN";

    public static void setSecurityTokens(HttpServletRequest request, HttpServletResponse response) {
        CsrfToken csrf = (CsrfToken) request.getAttribute("_csrf");
        if (csrf != null) {
            Cookie cookie = WebUtils.getCookie(request, XSRF_TOKEN_NAME);
            String token = csrf.getToken();
            if (cookie == null || token != null && !token.equals(cookie.getValue())) {
                cookie = new Cookie(XSRF_TOKEN_NAME, token);
                cookie.setPath("/");
                cookie.setHttpOnly(false);
                response.addCookie(cookie);
            }
        }
    }

}
