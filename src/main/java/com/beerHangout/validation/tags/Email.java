package com.beerHangout.validation.tags;

import com.beerHangout.validation.ValidatorOfMail;
import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

/**
 * @author Konrad Tyma on 22.04.17.
 */
@Documented
@Constraint(validatedBy = ValidatorOfMail.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface Email {

    String message() default "{Email}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
