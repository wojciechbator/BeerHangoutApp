package com.beerHangout.config;

import com.beerHangout.config.ajax.AjaxAuthenticationSuccessHandler;
import com.beerHangout.domain.authorise.utils.SecurityUtility;
import com.beerHangout.domain.login.services.UserSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import com.beerHangout.config.ajax.AjaxAuthenticationFailureHandler;
import com.beerHangout.config.ajax.AjaxLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private static final int password_length = 10;

	private final AjaxAuthenticationSuccessHandler authSuccessHandler;
    private final AjaxAuthenticationFailureHandler authFailureHandler;
    private final AjaxLogoutSuccessHandler logoutSuccessHandler;

	@Autowired
	private UserSecurityService userSecurityService;

	@Autowired
	public Environment environment;

    @Autowired
    public SecurityConfig(AjaxAuthenticationSuccessHandler authSuccessHandler, AjaxAuthenticationFailureHandler authFailureHandler, AjaxLogoutSuccessHandler logoutSuccessHandler) {
        this.authSuccessHandler = authSuccessHandler;
        this.authFailureHandler = authFailureHandler;
        this.logoutSuccessHandler = logoutSuccessHandler;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        //admin admin
        auth.inMemoryAuthentication()
                .withUser("user").password("password").roles("USER").and()
                .withUser("admin").password("admin").roles("USER", "ADMIN");
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(
                "/app/**",
                "/js/**",
                "/favicon.ico"
        );
    }

	private BCryptPasswordEncoder passwordEncoder() {
		return SecurityUtility.passwordEncoder(password_length);
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userSecurityService).passwordEncoder(passwordEncoder());
	}

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/", "/signin", "/api/account", "/api/comments").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/signin")
                .loginProcessingUrl("/api/authenticate")
                .successHandler(authSuccessHandler)
                .failureHandler(authFailureHandler)
                .permitAll()
                .and()
                .addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class)
                .csrf().csrfTokenRepository(csrfTokenRepository())
                .and()
                .logout()
                .logoutUrl("/api/signout")
                .logoutSuccessHandler(logoutSuccessHandler)
                .permitAll();
    }

    private static CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }

}
