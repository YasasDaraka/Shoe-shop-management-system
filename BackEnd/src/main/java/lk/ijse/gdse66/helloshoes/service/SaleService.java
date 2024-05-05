package lk.ijse.gdse66.helloshoes.service;

import lk.ijse.gdse66.helloshoes.dto.AdminPanelDTO;
import lk.ijse.gdse66.helloshoes.dto.SalesDTO;
import lk.ijse.gdse66.helloshoes.entity.AdminPanel;

import java.util.List;

public interface SaleService {

    AdminPanelDTO getAdminPanelDetails();
    SalesDTO searchSales(String id);
    void saveSales(SalesDTO dto);
    void updateSales(SalesDTO dto);
    void deleteSales(String id);
    String getOrderGenId();
    AdminPanel getAdminPanel();
}
