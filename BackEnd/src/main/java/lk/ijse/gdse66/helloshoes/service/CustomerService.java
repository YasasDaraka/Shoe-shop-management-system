package lk.ijse.gdse66.helloshoes.service;


import lk.ijse.gdse66.helloshoes.dto.CustomerDTO;
import lk.ijse.gdse66.helloshoes.dto.MessageDTO;

import java.util.List;

public interface CustomerService {
    List<CustomerDTO> getAllCustomer();
    CustomerDTO searchCustomer(String id);
    void saveCustomer(CustomerDTO dto);
    void updateCustomer(CustomerDTO dto);
    void deleteCustomer(String id);
    String getCustomerGenId();
    Integer getTotalCustomerCount();
    void sendOffer(MessageDTO dto);
}
