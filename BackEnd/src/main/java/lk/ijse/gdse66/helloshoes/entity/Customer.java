package lk.ijse.gdse66.helloshoes.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.helloshoes.embedded.Address;
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
@Entity
public class Customer {

    @Id
    private String customerId;

    private String customerName;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Date loyaltyDate;

    @Enumerated(EnumType.STRING)
    private LoyaltyLevel level;

    private Integer totalPoints;

    @Temporal(TemporalType.DATE)
    private Date customerDob;

    @Embedded
    private Address address;

    private String contactNo;

    private String email;

    private Timestamp recentPurchase;

    @Column(columnDefinition = "LONGTEXT")
    private String proPic;
}
