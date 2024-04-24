package lk.ijse.gdse66.helloshoes.repository;

import lk.ijse.gdse66.helloshoes.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepo extends JpaRepository<Employee,String> {
    @Query(value = "SELECT CAST(SUBSTRING(employeeId, 5) AS SIGNED) AS employeeId FROM Employee ORDER BY employeeId DESC LIMIT 1",nativeQuery = true)
    String getEmployeeIds();
}
