package lk.ijse.gdse66.helloshoes.api;

import lk.ijse.gdse66.helloshoes.auth.request.SignInRequest;
import lk.ijse.gdse66.helloshoes.auth.request.SignUpRequest;
import lk.ijse.gdse66.helloshoes.auth.response.JwtAuthResponse;
import lk.ijse.gdse66.helloshoes.dto.UserDTO;
import lk.ijse.gdse66.helloshoes.service.AuthenticationService;
import lk.ijse.gdse66.helloshoes.service.UserService;
import lk.ijse.gdse66.helloshoes.service.util.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthResponse> signIn(
            @RequestBody SignInRequest signInRequest){
        return ResponseEntity.ok(
                authenticationService.signIn(signInRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthResponse> signUp(
            @RequestBody SignUpRequest signUpRequest){
        System.out.println(signUpRequest);
        return ResponseEntity.ok(
                authenticationService.signUp(signUpRequest));
    }
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/search/{id}")
    public UserDTO getUser(@PathVariable("id") String id) {
        return userService.searchUser(id);
    }
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/getall/{id}")
    public ResponseEntity<List<UserDTO>> getAllUser(@PathVariable("id") String id) {
        if ("user".equals(id)) {
            List<UserDTO> users = userService.findAllByRole("USER");
            return ResponseEntity.ok(users);
        } else if ("admin".equals(id)) {
            List<UserDTO> admins = userService.findAllByRole("ADMIN");
            return ResponseEntity.ok(admins);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "/pass")
    public ResponseEntity<Boolean> checkPassword(@RequestBody UserDTO dto) {
        System.out.println(dto.toString());
        boolean isCorrect = userService.checkPassword(dto);
        return ResponseEntity.ok(isCorrect);
    }
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping(path = "/admin")
    public ResponseEntity<Void> deleteAdmin(@RequestBody UserDTO dto) {
            userService.deleteUser(dto, Role.ADMIN);
        return ResponseEntity.noContent().build();
    }
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping(path = "/user")
    public ResponseEntity<Void> deleteUser(@RequestBody UserDTO dto) {
        userService.deleteUser(dto,Role.USER);
        return ResponseEntity.noContent().build();
    }
    @PutMapping(path = "/admin")
    public ResponseEntity<Void> updateAdmin(@RequestBody UserDTO dto) {
        System.out.println("Received user data: " + dto.toString());
        userService.updateUser(dto,"ADMIN");
        return ResponseEntity.noContent().build();
    }
    @PutMapping(path = "/user")
    public ResponseEntity<Void> updateUser(@RequestBody UserDTO dto) {
        System.out.println("Received user data: " + dto.toString());
        userService.updateUser(dto,"USER");
        return ResponseEntity.noContent().build();
    }
}
