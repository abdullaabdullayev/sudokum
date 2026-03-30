package com.example.sudokum.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreateRequest {

    @NotBlank
    @Email
    String email;

    @NotBlank
    @Size(min = 3, max = 12)
    String username;

    @NotBlank
    @Size(min = 8, max = 20)
    String password;
}
