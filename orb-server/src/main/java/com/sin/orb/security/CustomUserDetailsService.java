package com.sin.orb.security;

import com.sin.orb.domain.User;
import com.sin.orb.exception.ResourceNotFoundException;
import com.sin.orb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

/**
 * This class is an implementation of UserDetailsService
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository repository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.repository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = repository.findByEmail(email)
                              .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        user.setAuthorities(Collections.singleton(Role.USER));
        return user;
    }

    /**
     * Loads a user with the passed id from the repository
     *
     * @param id id of the required user
     * @return user instance that implements UserDetails
     * @throws ResourceNotFoundException if the user with the passed id is not found
     */
    @Transactional(readOnly = true)
    public UserDetails loadUserById(Long id) {
        User user = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setAuthorities(Collections.singleton(Role.USER));
        return user;
    }
}