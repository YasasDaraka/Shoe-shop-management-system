package lk.ijse.gdse66.helloshoes.repository;

import lk.ijse.gdse66.helloshoes.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupplierRepo extends JpaRepository<Supplier,String> {
    @Query(value = "SELECT CAST(SUBSTRING(supplierCode, 5) AS SIGNED) AS supplierCode FROM Supplier ORDER BY supplierCode DESC LIMIT 1",nativeQuery = true)
    String getSupplierIds();
}
