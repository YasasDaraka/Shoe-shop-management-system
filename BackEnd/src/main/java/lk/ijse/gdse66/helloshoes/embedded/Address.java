package lk.ijse.gdse66.helloshoes.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Embeddable
public class Address {

    @Column(name = "address_line_01")
    private String buildNo;

    @Column(name = "address_line_02")
    private String cane;

    @Column(name = "address_line_03")
    private String city;

    @Column(name = "address_line_04")
    private String state;

    @Column(name = "address_line_05")
    private String postalCode;

}