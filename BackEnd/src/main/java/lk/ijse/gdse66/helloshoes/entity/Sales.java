package lk.ijse.gdse66.helloshoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Sales {

    @Id
    private String orderNo;

    @Temporal(TemporalType.DATE)
    private Date purchaseDate;

    private Double total;

    private String paymentMethod;

    private Integer totalPoints;

    private String cashier;
    @ManyToOne
    @Column(name = "customer_name")
    @JoinColumn(name = "customer_name", nullable = false)
    private Customer customerName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "order_no")
    private List<SaleDetails> saleDetails = new ArrayList<>();
}
