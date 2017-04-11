package com.beerHangout.rest;

import com.beerHangout.utils.State;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
public class AccountResource {

    private static final Logger log = Logger.getLogger(AccountResource.class);

    @RequestMapping("/account")
    public Map<String, Object> getAccountStatus(HttpServletRequest request) {
        log.info("Getting account status! ");
        return State.getAuthState(request);
    }

}
