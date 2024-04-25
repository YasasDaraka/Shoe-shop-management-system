package lk.ijse.gdse66.helloshoes.api;

import lk.ijse.gdse66.helloshoes.auth.request.SignInRequest;
import lk.ijse.gdse66.helloshoes.auth.request.SignUpRequest;
import lk.ijse.gdse66.helloshoes.auth.response.JwtAuthResponse;
import lk.ijse.gdse66.helloshoes.dto.UserDTO;
import lk.ijse.gdse66.helloshoes.service.AuthenticationService;
import lk.ijse.gdse66.helloshoes.service.JwtService;
import lk.ijse.gdse66.helloshoes.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping
    public ResponseEntity<Void> updateUser(@RequestBody UserDTO dto) {
        System.out.println("Received User data: " + dto.toString());
        userService.updateUser(dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(params = "username")
    public ResponseEntity<Void> deleteUser(@RequestParam("username") String username) {
        userService.deleteUser(username);
        return ResponseEntity.noContent().build();
    }
}
