package com.beerHangout.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.security.SecureRandom;

/**
 * @author Konrad Tyma on 19.03.17.
 *         <p>
 *         Generate random identifier String for different purpose(often need generate some id in session, for ex. newAccount(we will have role id )
 */
@Component
public final class SessionIdentifierGenerator {
    private SecureRandom random = new SecureRandom();

    public String nextSessionId() {
        return new BigInteger(10, random).toString(32);
    }

}

