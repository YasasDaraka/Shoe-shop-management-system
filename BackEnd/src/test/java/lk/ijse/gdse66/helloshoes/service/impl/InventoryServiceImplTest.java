package lk.ijse.gdse66.helloshoes.service.impl;

import lk.ijse.gdse66.helloshoes.dto.InventoryDTO;
import lk.ijse.gdse66.helloshoes.entity.Inventory;
import lk.ijse.gdse66.helloshoes.repository.InventoryRepo;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional
class InventoryServiceImplTest {
    @Autowired
    InventoryRepo inventoryRepo;

    @Autowired
    Tranformer tranformer;
    @Test
    void test(){
        String value = "itemDesc";
        List<InventoryDTO> convert = new ArrayList<>();
        if (value.equals("price") || value.equals("itemDesc")){
            convert = tranformer.convert(inventoryRepo.orderBy(value), Tranformer.ClassType.ITEM_DTO_LIST);
        }
        for (InventoryDTO inventory : convert) {
            System.out.println(inventory.toString());
        }
    }
}