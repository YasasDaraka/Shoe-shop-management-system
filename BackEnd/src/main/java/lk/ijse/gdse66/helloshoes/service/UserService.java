package lk.ijse.gdse66.helloshoes.service;

import lk.ijse.gdse66.helloshoes.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailService();
    void Save(UserDTO userDTO);
    UserDTO searchUser(String id);
    void updateUser(UserDTO dto);
    void deleteUser(UserDTO dto,String role);
    boolean checkPassword(UserDTO req);
}
