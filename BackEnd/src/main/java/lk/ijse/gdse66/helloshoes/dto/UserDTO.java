package lk.ijse.gdse66.helloshoes.dto;

import lk.ijse.gdse66.helloshoes.service.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private String id;
    private String email;
    private String password;
    private Role role;
}
