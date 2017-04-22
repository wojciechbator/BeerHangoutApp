package com.beerHangout.validation.tags;


import com.beerHangout.validation.ValidatorOfPhone;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

/**
 * @author Konrad Tyma on 22.04.17.
 */
@Documented
@Constraint(validatedBy = ValidatorOfPhone.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface Phone {
    String message() default "{Phone}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
