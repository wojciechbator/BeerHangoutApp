package com.beerHangout.models.authorise.utils

import com.beerHangout.services.impl.SecurityServiceImpl
import spock.lang.Specification
import spock.lang.Unroll

/**
 * @author Konrad Tyma on 09.03.17.
 */
class SecurityUtilitySpec extends Specification {

    @Unroll
    "should generate #password of 10 signs"() {
        given:
        def generatedPassword
        def passwordLen = 10

        when:
        generatedPassword = SecurityServiceImpl.randomPassword(passwordLen)

        then:
        generatedPassword.length() == 10
    }

    @Unroll
    "should return #expectedResult, when #generatedPassword contains #signs signs"() {
        expect:
        (generatedPassword.length() == signs) == expectedResult

        where:
        signs | expectedResult | generatedPassword
        10    | true           | SecurityServiceImpl.randomPassword(10)
        15    | false          | SecurityServiceImpl.randomPassword(1)
        25    | false          | SecurityServiceImpl.randomPassword(50)
    }
}
