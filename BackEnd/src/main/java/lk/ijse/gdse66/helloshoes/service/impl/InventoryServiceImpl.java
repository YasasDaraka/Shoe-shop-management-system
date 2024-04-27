package lk.ijse.gdse66.helloshoes.service.impl;

import lk.ijse.gdse66.helloshoes.dto.InventoryDTO;
import lk.ijse.gdse66.helloshoes.repository.InventoryRepo;
import lk.ijse.gdse66.helloshoes.service.InventoryService;
import lk.ijse.gdse66.helloshoes.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {
    @Autowired
    InventoryRepo inventoryRepo;
    @Autowired
    Tranformer tranformer;
    @Override
    public List<InventoryDTO> getAllInventory() {
        return tranformer.convert(inventoryRepo.findAll(), Tranformer.ClassType.ITEM_DTO_LIST);
    }

    @Override
    public InventoryDTO searchInventory(String id) {
        return (InventoryDTO) inventoryRepo.findById(id)
                .map(emp -> tranformer.convert(emp, Tranformer.ClassType.ITEM_DTO))
                .orElseThrow(() -> new NotFoundException("Item Not Exist"));
    }

    @Override
    public void saveInventory(InventoryDTO dto) {
        inventoryRepo.findById(dto.getItemCode()).ifPresentOrElse(
                customer -> {
                    throw new DuplicateRecordException("Item Already Exist");
                },
                () -> {
                    inventoryRepo.save(tranformer.convert(dto, Tranformer.ClassType.ITEM_ENTITY));
                });
    }

    @Override
    public void updateInventory(InventoryDTO dto) {
        inventoryRepo.findById(dto.getItemCode()).ifPresentOrElse(
                customer -> {
                    String proPic = dto.getItemPicture();
                    if (proPic != null) {
                        inventoryRepo.save(tranformer.convert(dto, Tranformer.ClassType.ITEM_ENTITY));
                    } else {
                        throw new NotFoundException("Item Pic Not Exist");
                    }
                },
                () -> {
                    throw new NotFoundException("Item Not Exist");
                });
    }

    @Override
    public void deleteInventory(String id) {
        inventoryRepo.findById(id).ifPresentOrElse(
                customer -> inventoryRepo.deleteById(id),
                () -> {
                    throw new NotFoundException("Item Not Exist");
                }
        );
    }
}
