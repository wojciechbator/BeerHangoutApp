package com.beerHangout.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author Konrad Tyma on 05.03.17.
 */
@Data
@NoArgsConstructor
@Document(collection = "roles")
public class Role {
    @Id
    private String roleId;
    private String userRoleId;
    private String name;

}
