package com.beerHangout.validation;

import com.beerHangout.validation.tags.Phone;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * @author Konrad Tyma on 22.04.17.
 */
public class ValidatorOfPhone implements ConstraintValidator<Phone, String> {
    @Override
    public void initialize(Phone phone) {

    }

    /**
     * Waliduje poprawność nr telefonu'a użytkownika wg reguł:
     * Poprawny: 123456789, +48 1234567890
     *
     * @param phone to validate
     * @param constraintValidatorContext
     * @return true jeśli numer telefonu jest poprawny
     */
    @Override
    public boolean isValid(String phone, ConstraintValidatorContext constraintValidatorContext) {
        //TO DO VALIDATE MAIL BY REGEX OR STH ELSE

        return false;
    }
}
