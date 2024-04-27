package lk.ijse.gdse66.helloshoes.repository;

import lk.ijse.gdse66.helloshoes.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepo extends JpaRepository<Inventory,String> {
}
