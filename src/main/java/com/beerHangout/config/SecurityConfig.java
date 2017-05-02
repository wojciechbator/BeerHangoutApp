package com.beerHangout.config;

import com.beerHangout.config.ajax.AjaxAuthenticationFailureHandler;
import com.beerHangout.config.ajax.AjaxAuthenticationSuccessHandler;
import com.beerHangout.services.SecurityService;
import com.beerHangout.services.UserService;
import com.beerHangout.services.impl.MongoDBAuthenticationProvider;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
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
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:8080", "http://localhost:3000");
            }
        };
    }

    private static final int password_length = 10;
    private static final Logger logger = Logger.getLogger(SecurityConfig.class);

    private final AjaxAuthenticationSuccessHandler authSuccessHandler;
    private final AjaxAuthenticationFailureHandler authFailureHandler;

    private final SecurityService userSecurityService;
    private final UserService userService;

    @Autowired
    public Environment environment;

    @Autowired
    public SecurityConfig(AjaxAuthenticationSuccessHandler authSuccessHandler,
                          AjaxAuthenticationFailureHandler authFailureHandler,
                          UserService userService,
                          SecurityService userSecurityService) {
        this.authSuccessHandler = authSuccessHandler;
        this.authFailureHandler = authFailureHandler;
        this.userService = userService;
        this.userSecurityService = userSecurityService;
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        userService.findAll().forEach(user -> {
            try {
                auth.inMemoryAuthentication()
                        .withUser(user.getUsername()).password(user.getPassword()).roles(user.getUserRoles().toString());
            } catch (Exception e) {
                logger.error("Exception has been thrown during inMEmory Authentication, trace: ", e);
            }
        });
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
        return userSecurityService.passwordEncoder(password_length);
    }

    @Autowired
    private MongoDBAuthenticationProvider mongoDBAuthenticationProvider;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
        auth.authenticationProvider(mongoDBAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/", "/login", "/api/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/api/authenticate")
                .successHandler(authSuccessHandler)
                .failureHandler(authFailureHandler)
                .permitAll()
                .and()
                .addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class)
                .csrf().csrfTokenRepository(csrfTokenRepository())
                .and()
                .logout()
                .permitAll();
    }

    private static CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        repository.setSessionAttributeName("_csrf");
        return repository;
    }

}
