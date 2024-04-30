package lk.ijse.gdse66.helloshoes.service.impl;

import lk.ijse.gdse66.helloshoes.dto.*;
import lk.ijse.gdse66.helloshoes.entity.SaleDetails;
import lk.ijse.gdse66.helloshoes.repository.SaleRepo;
import lk.ijse.gdse66.helloshoes.service.SaleService;
import lk.ijse.gdse66.helloshoes.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class SalesServiceImpl implements SaleService {

    @Autowired
    SaleRepo saleRepo;
    @Autowired
    Tranformer tranformer;
    @Override
    public List<SalesDTO> getAllSales() {
        return null;
    }

    @Override
    public SalesDTO searchSales(String id) {
        return (SalesDTO) saleRepo.findById(id).map(sales -> {
            SalesDTO salesDTO = new SalesDTO();
            salesDTO.setCashier(sales.getCashier());
            salesDTO.setOrderNo(sales.getOrderNo());
            salesDTO.setPaymentMethod(sales.getPaymentMethod());
            salesDTO.setTotal(sales.getTotal());
            salesDTO.setTotalPoints(sales.getTotalPoints());
            CustomerDTO cus = new CustomerDTO();
            cus.setCustomerName(sales.getCustomerName().getCustomerName());
            cus.setCustomerId(sales.getCustomerName().getCustomerId());
            salesDTO.setCustomerName(cus);
            List<SaleDetails> details = sales.getSaleDetails();
            List<SaleDetailsDTO> saleDetails = new ArrayList<>();
            for (SaleDetails detail : details) {
                SaleDetailsDTO detailsDTO = new SaleDetailsDTO();
                detailsDTO.setOrderDetailPK(new SaleDetailPKDTO(detail.getOrderDetailPK().getOrderNo(), detail.getOrderDetailPK().getItemCode()));

                detailsDTO.setItmQTY(detail.getItmQTY());

                InventoryDTO item = new InventoryDTO();
                item.setItemCode(detail.getInventory().getItemCode());
                item.setItemDesc(detail.getInventory().getItemDesc());
                item.setSalePrice(detail.getInventory().getSalePrice());
                item.setSize(detail.getInventory().getSize());
                detailsDTO.setInventory(item);

                saleDetails.add(detailsDTO);
            }
            salesDTO.setSaleDetails(saleDetails);
            salesDTO.setPurchaseDate(sales.getPurchaseDate());
            return salesDTO;
        }).orElseThrow(() -> new NotFoundException("Order Not Exist"));
    }

    @Override
    public void saveSales(SalesDTO dto) {
        saleRepo.findById(dto.getOrderNo()).ifPresentOrElse(
                sales -> {
                    throw new DuplicateRecordException("Order Already Exist");
                },
                () -> {
                    if (dto.getSaleDetails().isEmpty()){
                        throw new NotFoundException("Items not added to save Order");
                    }
                    saleRepo.save(tranformer.convert(dto, Tranformer.ClassType.ORDER_ENTITY));
                });
    }

    @Override
    public void updateSales(SalesDTO dto) {
        saleRepo.findById(dto.getOrderNo()).ifPresentOrElse(
                sales -> {
                    saleRepo.deleteById(dto.getOrderNo());
                    saleRepo.save(tranformer.convert(dto, Tranformer.ClassType.ORDER_ENTITY));
                },
                () -> {
                    throw new NotFoundException("Order Not Exist");
                });
    }

    @Override
    public void deleteSales(String id) {
        saleRepo.findById(id).ifPresentOrElse(
                customer -> saleRepo.deleteById(id),
                () -> {
                    throw new NotFoundException("Order Not Exist");
                }
        );
    }
}