package lk.ijse.gdse66.helloshoes.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.helloshoes.embedded.Address;
import lk.ijse.gdse66.helloshoes.service.util.Gender;
import lk.ijse.gdse66.helloshoes.service.util.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Employee {

    @Id
    private String employeeId;
    private String employeeName;
    @Column(columnDefinition = "LONGTEXT")
    private String proPic;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String employeeStatus;
    private String designation;
    @Enumerated(EnumType.STRING)
    private Role role;
    private Date employeeDob;
    private Date joinDate;
    @Embedded
    private Address address;
    private String contactNo;
    private String email;
    private String guardianName;
    private String emergencyContact;

}
