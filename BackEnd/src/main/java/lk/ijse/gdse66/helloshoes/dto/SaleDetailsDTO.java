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
public class SaleDetailsDTO {

    private SaleDetailPKDTO orderDetailPK;
    @NotNull(message = "itmQTY is required")
    @Min(value = 1, message = "Item quantity must be at least 1")
    private int itmQTY;

    private SalesDTO orderNo;

    private InventoryDTO inventory;
    @NotNull(message = "itmTotal is required")
    @DecimalMin(value = "1.00", message = "Buy Price must be greater than 0")
    private Double itmTotal;
}
