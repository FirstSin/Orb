package com.sin.orb.controller;

import com.sin.orb.domain.User;
import com.sin.orb.dto.UserDto;
import com.sin.orb.mapper.UserMapper;
import com.sin.orb.security.CurrentUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserDto> getCurrentUser(@CurrentUser User user) {
        return ResponseEntity.ok(UserMapper.INSTANCE.toDto(user));
    }
}
