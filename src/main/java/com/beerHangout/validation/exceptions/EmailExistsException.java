package com.beerHangout.validation.exceptions;

/**
 * Created by wojciech on 12.04.17.
 */
@SuppressWarnings("serial")
public class EmailExistsException extends Throwable {
    public EmailExistsException(final String warning) {
        super(warning);
    }
}
