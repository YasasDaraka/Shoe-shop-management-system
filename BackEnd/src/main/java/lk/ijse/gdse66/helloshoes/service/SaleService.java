package lk.ijse.gdse66.helloshoes.service;

import lk.ijse.gdse66.helloshoes.dto.SalesDTO;

import java.util.List;

public interface SaleService {

    List<SalesDTO> getAllSales();
    SalesDTO searchSales(String id);
    void saveSales(SalesDTO dto);
    void updateSales(SalesDTO dto);
    void deleteSales(String id);
    String getOrderGenId();
}
