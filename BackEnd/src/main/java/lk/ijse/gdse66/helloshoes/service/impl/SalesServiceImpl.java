package lk.ijse.gdse66.helloshoes.service.impl;

import lk.ijse.gdse66.helloshoes.dto.SalesDTO;
import lk.ijse.gdse66.helloshoes.repository.SaleRepo;
import lk.ijse.gdse66.helloshoes.service.SaleService;
import lk.ijse.gdse66.helloshoes.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return (SalesDTO) saleRepo.findById(id)
                .map(sales -> tranformer.convert(sales, Tranformer.ClassType.ORDER_DTO))
                .orElseThrow(() -> new NotFoundException("Order Not Exist"));
    }

    @Override
    public void saveSales(SalesDTO dto) {
        saleRepo.findById(dto.getOrderNo()).ifPresentOrElse(
                sales -> {
                    throw new DuplicateRecordException("Order Already Exist");
                },
                () -> {
                    saleRepo.save(tranformer.convert(dto, Tranformer.ClassType.ORDER_ENTITY));
                });
    }

    @Override
    public void updateSales(SalesDTO dto) {
        saleRepo.findById(dto.getOrderNo()).ifPresentOrElse(
                sales -> {
                    saleRepo.save(tranformer.convert(dto, Tranformer.ClassType.ORDER_ENTITY));
                },
                () -> {
                    throw new NotFoundException("Order Not Exist");
                });
    }

    @Override
    public void deleteSales(String id) {

    }
}
