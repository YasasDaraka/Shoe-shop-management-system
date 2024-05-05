package lk.ijse.gdse66.helloshoes.service.impl;

import lk.ijse.gdse66.helloshoes.dto.*;
import lk.ijse.gdse66.helloshoes.entity.AdminPanel;
import lk.ijse.gdse66.helloshoes.entity.Inventory;
import lk.ijse.gdse66.helloshoes.entity.SaleDetails;
import lk.ijse.gdse66.helloshoes.repository.*;
import lk.ijse.gdse66.helloshoes.service.SaleService;
import lk.ijse.gdse66.helloshoes.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.IdGenerator;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class SalesServiceImpl implements SaleService {

    @Autowired
    SaleRepo saleRepo;
    @Autowired
    CustomerRepo cusRepo;
    @Autowired
    InventoryRepo inventoryRepo;
    @Autowired
    SaleDetailRepo detailRepo;
    @Autowired
    AdminPanelRepo adminPanelRepo;
    @Autowired
    Tranformer tranformer;
    @Autowired
    IdGenerator generator;


    @Override
    public AdminPanelDTO getAdminPanelDetails() {
        return tranformer.convert(getAdminPanel(), Tranformer.ClassType.PANNEL_DTO);
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
                    cusRepo.findById(dto.getCustomerName().getCustomerId()).ifPresentOrElse(
                            cus -> {
                                if (cus.getLoyaltyDate() != null){
                                    Double total = 0.0;
                                    List<SaleDetailsDTO> itms = dto.getSaleDetails();
                                    for (SaleDetailsDTO itm : itms) {
                                         total += itm.getItmTotal();
                                    }
                                    if (total >= 800.00){
                                        Integer point = (int) Math.round(total / 800.0);
                                        Integer cusPoints = cus.getTotalPoints();
                                        cusPoints += point;
                                        cus.setTotalPoints(cusPoints);

                                    }
                                }
                                cus.setRecentPurchase(LocalDateTime.now());
                                cusRepo.save(cus);
                            },
                            () -> {
                                    throw new NotFoundException("Customer not exist");
                            });
                    saleRepo.save(tranformer.convert(dto, Tranformer.ClassType.ORDER_ENTITY));
                    if (detailRepo.countSaleDetails() != 0){
                        adminPanelRepo.save(getAdminPanel());
                    }
                });
    }

    @Override
    public void updateSales(SalesDTO dto) {
        saleRepo.findById(dto.getOrderNo()).ifPresentOrElse(
                sales -> {
                    saleRepo.deleteById(dto.getOrderNo());
                    saleRepo.save(tranformer.convert(dto, Tranformer.ClassType.ORDER_ENTITY));
                    cusRepo.findById(dto.getCustomerName().getCustomerId()).ifPresentOrElse(
                            cus -> {
                                cus.setRecentPurchase(LocalDateTime.now());
                                cusRepo.save(cus);
                            },
                            () -> {
                                throw new NotFoundException("Customer not exist");
                            });
                    if (detailRepo.countSaleDetails() != 0){
                        adminPanelRepo.save(getAdminPanel());
                    }
                },
                () -> {
                    throw new NotFoundException("Order Not Exist");
                });
    }

    @Override
    public void deleteSales(String id) {
        saleRepo.findById(id).ifPresentOrElse(
                sales -> {
                    saleRepo.deleteById(id);
                    if (detailRepo.countSaleDetails() != 0){
                        adminPanelRepo.save(getAdminPanel());
                    }
                }
                ,
                () -> {
                    throw new NotFoundException("Order Not Exist");
                }
        );
    }
    @Override
    public String getOrderGenId() {
        return generator.getGenerateID(saleRepo.getOrderId(), IdGenerator.GenerateTypes.ORDER);
    }
    @Override
    public AdminPanel getAdminPanel(){
        Map<String, Object> getItem = detailRepo.findMostPurchasedItem();
        Object[] mostItem = new Object[getItem.size()];
        int index1 = 0;
        for (Object value : getItem.values()) {
            mostItem[index1++] = value;
        }
        String code = String.valueOf(mostItem[0]);
        Long qty = (Long) mostItem[1];
        System.out.println(code+qty);
        Inventory inventory = inventoryRepo.findById(code).get();
        System.out.println(inventory.getItemPicture());

        Map<String, Object> item = detailRepo.getTotalCost();
        Object[] ar = new Object[item.size()];
        int index2 = 0;
        for (Object value : item.values()) {
            ar[index2++] = value;
        }
        Double totalBuy = (Double) ar[0];
        Double itmTotal = detailRepo.getItmTotal();
        Double profit =itmTotal-totalBuy;
        System.out.println(totalBuy+" "+itmTotal+" "+profit);
        return new AdminPanel("dash",itmTotal,profit,code,inventory.getItemPicture(), Math.toIntExact(qty));
    }
}
