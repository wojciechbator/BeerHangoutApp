package com.beerHangout.domain

import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

/**
 * @author Konrad Tyma on 09.03.17.
 */
class PasswordResetTokenSpec extends Specification {


  @Shared
    calendar

  void setup() {
    calendar = Calendar.getInstance()
    calendar.setTimeInMillis(new Date().getTime())
  }

  @Unroll
  "should calculate expiration date from #dateNow after #expirationTimeInMinutes [minutes]"() {
    given:
    def passwordResetToken = new PasswordResetToken(token, user)
    def expectedExpirationDate

    when:
    calendar.add(Calendar.MINUTE, expirationTimeInMinutes)
    expectedExpirationDate = new Date(calendar.getTime().getTime())
    passwordResetToken.updateToken(token, expirationTimeInMinutes)

    then:
    //toString ignore little difference in [ms]
    passwordResetToken.getExpirationDate().toString() == expectedExpirationDate.toString()

    where:
    user       | token         | expirationTimeInMinutes | dateNow
    new User() | "1_testToken" | 24 * 60                 | new Date()
    new User() | "2_testToken" | 48 * 60                 | new Date()
    new User() | "3_testToken" | 14 * 60                 | new Date()
    new User() | "4_testToken" | 44 * 60                 | new Date()
  }

}
