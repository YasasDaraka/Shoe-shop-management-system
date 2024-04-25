package lk.ijse.gdse66.helloshoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lk.ijse.gdse66.helloshoes.embedded.Contact;
import lk.ijse.gdse66.helloshoes.embedded.InAddress;
import lk.ijse.gdse66.helloshoes.service.util.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Supplier {
    @Id
    private String supplierCode;
    @NotNull
    private String supplierName;
    @Enumerated(EnumType.STRING)
    private Category category;
    @Embedded
    private InAddress address;
    private Contact contact;
    @NotNull
    private String email;
}