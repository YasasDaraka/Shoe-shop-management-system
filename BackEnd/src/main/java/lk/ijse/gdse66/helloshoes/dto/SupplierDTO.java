package lk.ijse.gdse66.helloshoes.dto;

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
    private InAddressDTO address;
    private ContactDTO contact;
    private String email;
}
