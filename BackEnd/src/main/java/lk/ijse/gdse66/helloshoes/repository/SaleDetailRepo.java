package lk.ijse.gdse66.helloshoes.repository;

import lk.ijse.gdse66.helloshoes.entity.SaleDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface SaleDetailRepo extends JpaRepository<SaleDetails,String> {
    @Query("SELECT sd.inventory.itemCode, SUM(sd.itmQTY) AS totalQuantity FROM SaleDetails sd GROUP BY sd.inventory.itemCode ORDER BY totalQuantity DESC LIMIT 1")
    Map<String,Integer> findMostPurchasedItem();
    @Query(value = "SELECT sd.inventory.itemCode AS itemCode, SUM(sd.itmQTY) AS totalQuantity, SUM(sd.itmTotal) AS totalAmount FROM SaleDetails sd WHERE sd.inventory.itemCode = :itemCode GROUP BY sd.inventory.itemCode")
    Map<String, Object> findTotalQtyAndTotalAmountByItemCode(String itemCode);
}
