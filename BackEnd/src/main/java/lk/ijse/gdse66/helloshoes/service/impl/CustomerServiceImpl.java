package lk.ijse.gdse66.helloshoes.service.impl;

import lk.ijse.gdse66.helloshoes.dto.CustomerDTO;
import lk.ijse.gdse66.helloshoes.repository.CustomerRepo;
import lk.ijse.gdse66.helloshoes.service.CustomerService;
import lk.ijse.gdse66.helloshoes.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.IdGenerator;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    CustomerRepo customerRepo;
    @Autowired
    Tranformer tranformer;
    @Autowired
    IdGenerator generator;
    @Override
    public List<CustomerDTO> getAllCustomer() {
        return tranformer.convert(customerRepo.findAll(), Tranformer.ClassType.CUS_DTO_LIST);
    }

    @Override
    public CustomerDTO searchCustomer(String id) {
        return (CustomerDTO) customerRepo.findById(id)
                .map(cus -> tranformer.convert(cus, Tranformer.ClassType.CUS_DTO))
                .orElseThrow(() -> new NotFoundException("Customer Not Exist"));
    }

    @Override
    public void saveCustomer(CustomerDTO dto) {
        customerRepo.findById(dto.getCustomerId()).ifPresentOrElse(
                customer -> {
                    throw new DuplicateRecordException("Customer Already Exist");
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
                    customerRepo.save(tranformer.convert(dto, Tranformer.ClassType.CUS_ENTITY));
                });
    }

    @Override
    public void updateCustomer(CustomerDTO dto) {
        customerRepo.findById(dto.getCustomerId()).ifPresentOrElse(
                customer -> {
                    String proPic = dto.getProPic();
                    if (proPic != null) {
                        customerRepo.save(tranformer.convert(dto, Tranformer.ClassType.CUS_ENTITY));
                    } else {
                        throw new NotFoundException("Customer ProPic Not Exist");
                    }
                },
                () -> {
                    throw new NotFoundException("Customer Not Exist");
                });
    }

    @Override
    public void deleteCustomer(String id) {
        customerRepo.findById(id).ifPresentOrElse(
                customer -> customerRepo.deleteById(id),
                () -> {
                    throw new NotFoundException("Customer Not Exist");
                }
        );
    }

    @Override
    public String getCustomerGenId() {
        return generator.getGenerateID(customerRepo.getCusId(), IdGenerator.GenerateTypes.CUSTOMER);
    }
}
