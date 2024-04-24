package lk.ijse.gdse66.helloshoes.service;


import lk.ijse.gdse66.helloshoes.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailService();
    void Save(UserDTO userDTO);
}
