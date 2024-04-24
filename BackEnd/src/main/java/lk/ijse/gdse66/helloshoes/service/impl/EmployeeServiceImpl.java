package lk.ijse.gdse66.helloshoes.service.impl;

import lk.ijse.gdse66.helloshoes.dto.EmployeeDTO;
import lk.ijse.gdse66.helloshoes.repository.EmployeeRepo;
import lk.ijse.gdse66.helloshoes.service.EmployeeService;
import lk.ijse.gdse66.helloshoes.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.IdGenerator;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeRepo employeeRepo;
    @Autowired
    Tranformer tranformer;
    @Autowired
    IdGenerator generator;
    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return tranformer.convert(employeeRepo.findAll(), Tranformer.ClassType.EMP_DTO_LIST);
    }

    @Override
    public EmployeeDTO searchEmployee(String id) {
        return (EmployeeDTO) employeeRepo.findById(id)
                .map(emp -> tranformer.convert(emp, Tranformer.ClassType.EMP_DTO))
                .orElseThrow(() -> new NotFoundException("Employee Not Exist"));
    }

    @Override
    public void saveEmployee(EmployeeDTO dto) {
        employeeRepo.findById(dto.getEmployeeId()).ifPresentOrElse(
                customer -> {
                    throw new DuplicateRecordException("Employee Already Exist");
                },
                () -> {
                    String proPic = dto.getProPic();
                    /*if (proPic != null && proPic.startsWith("data:image/png;base64,")) {
                        String base64Data = dto.getProPic().substring(dto.getProPic().indexOf(",") + 1);
                        byte[] imageData = Base64.getDecoder().decode(base64Data);
                        String uploadsDirectory = "E:\\Spring Project\\BackEnd\\src\\main\\resources\\cusGallery";
                        String filename = dto.getCustomerId() + ".png";
                        String filePath = uploadsDirectory + File.separator + filename;
                        try {
                            FileUtils.writeByteArrayToFile(new File(filePath), imageData);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }*/
                    /*if (proPic != null && !proPic.startsWith("data:image/png;base64,")) {
                        Base64.getEncoder().encodeToString(profilePic.getBytes());
                    }*/
                    employeeRepo.save(tranformer.convert(dto, Tranformer.ClassType.EMP_ENTITY));
                });
    }

    @Override
    public void updateEmployee(EmployeeDTO dto) {
        employeeRepo.findById(dto.getEmployeeId()).ifPresentOrElse(
                customer -> {
                    String proPic = dto.getProPic();
                    if (proPic != null) {
                        employeeRepo.save(tranformer.convert(dto, Tranformer.ClassType.CUS_ENTITY));
                    } else {
                        throw new NotFoundException("Employee ProPic Not Exist");
                    }
                },
                () -> {
                    throw new NotFoundException("Employee Not Exist");
                });
    }

    @Override
    public void deleteEmployee(String id) {
        employeeRepo.findById(id).ifPresentOrElse(
                customer -> employeeRepo.deleteById(id),
                () -> {
                    throw new NotFoundException("Employee Not Exist");
                }
        );
    }

    @Override
    public String getEmployeeGenId() {
        return generator.getGenerateID(employeeRepo.getEmployeeIds(), IdGenerator.GenerateTypes.EMPLOYEE);
    }
}
