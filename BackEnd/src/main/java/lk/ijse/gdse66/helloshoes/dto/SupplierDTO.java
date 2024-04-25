package lk.ijse.gdse66.helloshoes.dto;

import lk.ijse.gdse66.helloshoes.embedded.Contact;
import lk.ijse.gdse66.helloshoes.embedded.InAddress;
import lk.ijse.gdse66.helloshoes.service.util.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupplierDTO {
    private String supplierCode;
    private String supplierName;
    private Category category;
    private InAddress address;
    private Contact contact;
    private String email;
}
