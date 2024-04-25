package lk.ijse.gdse66.helloshoes.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class AddressDTO {
    private String buildNo;

    private String lane;

    private String city;

    private String state;

    private String postalCode;
}
