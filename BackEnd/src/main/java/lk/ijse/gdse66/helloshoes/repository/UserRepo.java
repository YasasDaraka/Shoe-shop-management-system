package lk.ijse.gdse66.helloshoes.repository;


import lk.ijse.gdse66.helloshoes.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,String> {
    Optional<User> findByEmail(String email);
    void deleteByEmail(String email);
}
