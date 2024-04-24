package lk.ijse.gdse66.helloshoes.service;
import lk.ijse.gdse66.helloshoes.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {
    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO searchEmployee(String id);
    void saveEmployee(EmployeeDTO dto);
    void updateEmployee(EmployeeDTO dto);
    void deleteEmployee(String id);
    String getEmployeeGenId();
}
