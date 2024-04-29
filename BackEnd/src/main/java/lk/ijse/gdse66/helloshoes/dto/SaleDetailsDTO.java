package lk.ijse.gdse66.helloshoes.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class SaleDetailsDTO {

    private SaleDetailPKDTO orderDetailPK;

    private int itmQTY;

    private SalesDTO orderNo;

    private InventoryDTO inventory;

    private Double itmTotal;
}
