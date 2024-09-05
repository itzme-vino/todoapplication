package com.vinodh.todo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import java.util.function.Function;

@Configuration
public class SpringSecurityConfiguration {
//    InMemoryUserDetailsManager
//    InMemoryUserDetailsManager(UserDetails... users)
    @Bean
    public InMemoryUserDetailsManager createUserDetailsConfigurer(){

        UserDetails userDetails1 = (UserDetails) createNewUser("vinodh","dummy");
        UserDetails userDetails2 = (UserDetails) createNewUser("vinodh1","dummy");


        return new InMemoryUserDetailsManager(userDetails1, userDetails2);
    }

    private UserDetails createNewUser(String username, String password) {
        Function<String, String> passwordEncoder = input-> passwordEncoder().encode(input);
        UserDetails userDetails = User
                .builder()
                .passwordEncoder(passwordEncoder)
                .username(username)
                .password(password)
                .roles("USER","ADMIN")
                .build();
        return userDetails;
    }

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(
                auth -> auth.anyRequest().authenticated()
        );
        http.formLogin(Customizer.withDefaults());
        http.csrf(csrf -> csrf.disable());
        http.headers(header -> header.frameOptions(frameOptions -> frameOptions.disable()));

        return http.build();
    }

}
