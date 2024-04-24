package lk.ijse.gdse66.helloshoes.dto;

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
public class EmployeeDTO {
    private String employeeId;
    private String employeeName;
    private String proPic;
    private Gender gender;
    private String employeeStatus;
    private String designation;
    private Role role;
    private Date employeeDob;
    private Date joinDate;
    private AddressDTO address;
    private String contactNo;
    private String email;
    private String guardianName;
    private String emergencyContact;

}
