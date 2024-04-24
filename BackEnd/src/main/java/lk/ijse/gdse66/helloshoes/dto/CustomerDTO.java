package lk.ijse.gdse66.helloshoes.dto;
import lk.ijse.gdse66.helloshoes.service.util.Gender;
import lk.ijse.gdse66.helloshoes.service.util.LoyaltyLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerDTO{

    private String customerId;

    private String customerName;

    private Gender gender;

    private Date loyaltyDate;

    private LoyaltyLevel level;

    private Integer totalPoints;

    private Date customerDob;

    private AddressDTO address;

    private String contactNo;

    private String email;

    private String proPic;

    private Timestamp recentPurchase;

}

