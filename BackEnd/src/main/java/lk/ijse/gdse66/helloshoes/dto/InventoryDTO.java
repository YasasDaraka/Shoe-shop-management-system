package lk.ijse.gdse66.helloshoes.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class InventoryDTO {
    private String itemCode;
    private String itemDesc;
    private String itemPicture;
    private String category;
    private Integer size;
    private SupplierDTO supplier;
    private String supplierName;
    private Double salePrice;
    private Double buyPrice;
    private Double expectedProfit;
    private Double profitMargin;
    private String status;
}
