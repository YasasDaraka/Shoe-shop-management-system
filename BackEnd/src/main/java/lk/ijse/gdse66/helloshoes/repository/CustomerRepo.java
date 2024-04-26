package lk.ijse.gdse66.helloshoes.repository;

import lk.ijse.gdse66.helloshoes.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepo extends JpaRepository<Customer,String> {
    @Query(value = "SELECT CAST(SUBSTRING(customer_id, 5) AS SIGNED) AS customer_id FROM Customer ORDER BY customer_id DESC LIMIT 1",nativeQuery = true)
    String getCusId();
}
