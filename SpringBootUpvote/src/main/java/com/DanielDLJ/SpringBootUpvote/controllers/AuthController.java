package com.DanielDLJ.SpringBootUpvote.controllers;


import com.DanielDLJ.SpringBootUpvote.model.User;
import com.DanielDLJ.SpringBootUpvote.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository){ this.userRepository = userRepository; }

    @RequestMapping(
            value = "",
            method = RequestMethod.POST)
    public User login(@RequestBody(required=false) User requestUser){
        if(requestUser == null || requestUser.getUsername().equals("")) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "The username is empty.");
        }
        if(requestUser.getPassword().equals(""))
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "The password is empty.");

        User bdUser = userRepository.getUserByusername(requestUser.getUsername());

        if(bdUser != null) {// user exists
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
            if(encoder.matches(requestUser.getPassword(), bdUser.getPassword() )){//check passwords
                return bdUser;
            }else{//wrong password
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "The username or password you entered is incorrect. Please try again.");
            }
        }else{//user not found
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "The email or password you entered is incorrect. Please try again.");
        }
    }
}


