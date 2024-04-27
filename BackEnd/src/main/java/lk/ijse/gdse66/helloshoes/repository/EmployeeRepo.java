package lk.ijse.gdse66.helloshoes.repository;

import lk.ijse.gdse66.helloshoes.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepo extends JpaRepository<Employee,String> {
    @Query(value = "SELECT CAST(SUBSTRING(employee_id, 5) AS SIGNED) AS employee_id FROM employee ORDER BY employee_id DESC LIMIT 1",nativeQuery = true)
    String getEmployeeIds();
}
