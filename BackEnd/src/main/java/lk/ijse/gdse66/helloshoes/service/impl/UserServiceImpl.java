package lk.ijse.gdse66.helloshoes.service.impl;

import lk.ijse.gdse66.helloshoes.auth.request.SignInRequest;
import lk.ijse.gdse66.helloshoes.auth.request.SignUpRequest;
import lk.ijse.gdse66.helloshoes.dto.UserDTO;
import lk.ijse.gdse66.helloshoes.entity.User;
import lk.ijse.gdse66.helloshoes.repository.UserRepo;
import lk.ijse.gdse66.helloshoes.service.UserService;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
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
                        userRepo.save(new User(user.getId(),dto.getEmail(),passwordEncoder.encode(dto.getPassword()),dto.getRole()));
                },
                () -> {
                    throw new NotFoundException("User Not Exist");
                });
    }

    @Override
    public void deleteUser(String id) {
        userRepo.findByEmail(id).ifPresentOrElse(
                customer -> userRepo.deleteByEmail(id),
                () -> {
                    throw new NotFoundException("User Not Exist");
                }
        );
    }
    @Override
    public boolean checkPassword(UserDTO req) {
        Optional<User> details = userRepo.findByEmail(req.getEmail());
        if (details.isPresent()){
            boolean matches = passwordEncoder.matches(req.getPassword(), details.get().getPassword());
            if (matches) {
                return true;
            }
        }
        return false;
    }
}