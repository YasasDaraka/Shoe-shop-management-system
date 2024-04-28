package lk.ijse.gdse66.helloshoes.dto;

import jakarta.persistence.*;
import lk.ijse.gdse66.helloshoes.entity.Customer;
import lk.ijse.gdse66.helloshoes.entity.SaleDetails;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class SalesDTO {

    private String orderNo;

    private Date purchaseDate;

    private Double total;

    private String paymentMethod;

    private Integer totalPoints;

    private String cashier;

    private CustomerDTO customerName;

    private List<SaleDetailsDTO> saleDetails = new ArrayList<>();
}
