package com.beerHangout.validation;

/**
 * @author Mateusz Wolak on 13.04.17.
 */

@SuppressWarnings("serial")
public class UsernameExistsException extends Throwable {
    public UsernameExistsException (final String warning) {
        super(warning);
    }
}
