package lk.ijse.gdse66.helloshoes.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.helloshoes.entity.Customer;
import lk.ijse.gdse66.helloshoes.entity.SaleDetails;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class SalesDTO {

    @Pattern(regexp = "OID-0*[1-9]\\d{0,2}", message = "Order ID is not valid")
    private String orderNo;

    private LocalDateTime purchaseDate;

    @NotNull(message = "Total is required")
    @DecimalMin(value = "1.00", message = "Buy Price must be greater than 0")
    private Double total;

    @NotNull(message = "Payment Method ID is required")
    private String paymentMethod;

    private Integer totalPoints;

    private String cashier;

    private CustomerDTO customerName;

    private List<SaleDetailsDTO> saleDetails = new ArrayList<>();
}
