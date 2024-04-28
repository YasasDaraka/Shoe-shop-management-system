package lk.ijse.gdse66.helloshoes.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.helloshoes.embedded.SaleDetailPK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class SaleDetails {

    @EmbeddedId
    private SaleDetailPK orderDetailPK;

    @Column(name = "itm_qty")
    private int itmQTY;

    @ManyToOne
    @JoinColumn(name = "order_no")
    private Sales orderNo;

    @ManyToOne
    @JoinColumn(name = "item_code")
    private Inventory inventory;
}
