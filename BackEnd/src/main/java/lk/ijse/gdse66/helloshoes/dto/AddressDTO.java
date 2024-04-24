package lk.ijse.gdse66.helloshoes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AddressDTO {
    private String buildNo;

    private String lane;

    private String city;

    private String state;

    private String postalCode;
}
