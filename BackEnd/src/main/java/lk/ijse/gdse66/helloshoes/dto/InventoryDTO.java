package lk.ijse.gdse66.helloshoes.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class InventoryDTO {
    @NotNull(message = "Item code is required")
    @Pattern(regexp = "I00-0*[1-9]\\d{0,2}", message = "Item code is not valid")
    private String itemCode;
    @NotNull(message = "Item name is required")
    @Pattern(regexp = "^[A-Za-z0-9 ]{3,}$", message = "Item name is not valid")
    private String itemDesc;
    private String itemPicture;
    @NotNull(message = "category is required")
    @Pattern(regexp = "^[A-Za-z ]{3,}$", message = "category is not valid")
    private String category;
    @NotNull(message = "Size is required")
    @Min(value = 1,message = "Size must be at least 1")
    @Pattern(regexp = "^[0-9]+$", message = "Size is not valid")
    private Integer size;
    private SupplierDTO supplier;
    private String supplierName;
    @NotNull(message = "salePrice is required")
    @DecimalMin(value = "1.00", message = "Sale price must be greater than 0")
    private Double salePrice;
    @NotNull(message = "Buy Price is required")
    @DecimalMin(value = "1.00", message = "Buy Price must be greater than 0")
    private Double buyPrice;
    private Double expectedProfit;
    private Double profitMargin;
    private String status;
}
