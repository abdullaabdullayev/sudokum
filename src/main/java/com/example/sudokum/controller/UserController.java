package com.example.sudokum.controller;

import com.example.sudokum.model.entity.User;
import com.example.sudokum.repository.UserRepository;
import com.example.sudokum.requests.UserCreateRequest;
import com.example.sudokum.requests.UserLogInRequest;
import com.example.sudokum.responses.UserResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserController {

    UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody @Valid UserCreateRequest userCreateRequest, HttpSession session) {

        User user = new User();

        String username = userCreateRequest.getUsername();
        String email = userCreateRequest.getEmail();
        String password = userCreateRequest.getPassword();

        if(userRepository.existsUserByUsername(username)){
            return ResponseEntity
                    .badRequest()
                    .body("This username is already taken!");
        } else if (userRepository.existsUserByEmail(email)) {
            return ResponseEntity
                    .badRequest()
                    .body("This email already exists!");
        }
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(password);
        User saved = userRepository.save(user);
        UserResponse userResponse = UserResponse.from(saved);
        session.setAttribute("loggedInUser", userResponse.getUsername());
        return ResponseEntity.ok(userResponse);
    }

    @PostMapping("/log-in")
    public ResponseEntity<?> loginUser(@RequestBody UserLogInRequest userLogInRequest, HttpSession session){
        String username = userLogInRequest.getUsername();
        String password = userLogInRequest.getPassword();

        if (userRepository.existsUserByUsername(username)){
            User user = userRepository.findUserByUsername(username);
            if(Objects.equals(password, user.getPassword())){
                session.setAttribute("loggedInUser",username);
                return ResponseEntity.ok().body("Login successful!");
            }else {
                return ResponseEntity.badRequest().body("username or password is incorrect");
            }
        }else {
            return ResponseEntity.badRequest().body("username or password is incorrect");
        }
    }

}
