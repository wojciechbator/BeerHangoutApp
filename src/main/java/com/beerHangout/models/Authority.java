package com.beerHangout.models;

import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

/**
 * @author Konrad Tyma on 05.03.17.
 */
@Setter
public class Authority implements GrantedAuthority {

    private final String authority;

    public Authority(String authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return this.authority;
    }

}
