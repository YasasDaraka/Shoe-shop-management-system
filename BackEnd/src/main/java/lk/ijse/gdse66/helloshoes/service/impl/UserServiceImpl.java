package lk.ijse.gdse66.helloshoes.service.impl;

import lk.ijse.gdse66.helloshoes.dto.CustomerDTO;
import lk.ijse.gdse66.helloshoes.dto.UserDTO;
import lk.ijse.gdse66.helloshoes.entity.User;
import lk.ijse.gdse66.helloshoes.repository.UserRepo;
import lk.ijse.gdse66.helloshoes.service.UserService;
import lk.ijse.gdse66.helloshoes.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final ModelMapper mapper;
    @Autowired
    Tranformer tranformer;
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

    @Override
    public UserDTO searchUser(String id){
        return (UserDTO) userRepo.findByEmail(id)
                .map(user -> tranformer.convert(user, Tranformer.ClassType.USER_DTO))
                .orElseThrow(() -> new NotFoundException("User Not Exist"));
    }

    @Override
    public void updateUser(UserDTO dto) {
        userRepo.findByEmail(dto.getEmail()).ifPresentOrElse(
                user -> {
                    System.out.println(user);
                        userRepo.save(new User(user.getId(),dto.getEmail(),dto.getPassword(),dto.getRole()));
                },
                () -> {
                    throw new NotFoundException("User Not Exist");
                });
    }

    @Override
    public void deleteUser(String id) {
        userRepo.findByEmail(id).ifPresentOrElse(
                customer -> userRepo.deleteById(id),
                () -> {
                    throw new NotFoundException("User Not Exist");
                }
        );
    }

}
