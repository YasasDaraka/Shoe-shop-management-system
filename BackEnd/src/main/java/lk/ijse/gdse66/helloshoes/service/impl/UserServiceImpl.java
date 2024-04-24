package lk.ijse.gdse66.helloshoes.service.impl;



import lk.ijse.gdse66.helloshoes.dto.UserDTO;
import lk.ijse.gdse66.helloshoes.entity.User;
import lk.ijse.gdse66.helloshoes.repository.UserRepo;
import lk.ijse.gdse66.helloshoes.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final ModelMapper mapper;

    @Override
    public UserDetailsService userDetailService() {
        return username -> userRepo.findByEmail(username)
                .orElseThrow(() -> new
                        UsernameNotFoundException(
                                "user not found"));
    }

    @Override
    public void Save(UserDTO userDTO) {
        userRepo.save(mapper.map(userDTO, User.class));
    }
}
