package lk.ijse.gdse66.helloshoes.dto;

import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "email can not be null")
    private String email;
    @NotBlank(message = "password can not be null")
    private String password;
    @NotBlank(message = "role can not be null")
    private Role role;
}
