package lk.ijse.gdse66.helloshoes.service;
import lk.ijse.gdse66.helloshoes.dto.SupplierDTO;

import java.util.List;

public interface SupplierService {
    List<SupplierDTO> getAllSuppliers();
    SupplierDTO searchSupplier(String id);
    void saveSupplier(SupplierDTO dto);
    void updateSupplier(SupplierDTO dto);
    void deleteSupplier(String id);
    String getSupplierGenId();
}
