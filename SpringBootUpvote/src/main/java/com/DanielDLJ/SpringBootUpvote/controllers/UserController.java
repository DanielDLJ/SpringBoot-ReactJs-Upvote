package com.DanielDLJ.SpringBootUpvote.controllers;


import com.DanielDLJ.SpringBootUpvote.model.User;
import com.DanielDLJ.SpringBootUpvote.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository){ this.userRepository = userRepository; }


    @GetMapping
    public Iterable<User> findAll() { return userRepository.findAll(); };


    @GetMapping("/{username}")
    public User getUserByUserName(@PathVariable String username){
        return userRepository.getUserByusername(username);
    }


    @RequestMapping(
            value = "",
            method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@RequestBody (required=false) User requestUser){
        if(requestUser == null || requestUser.getUsername().equals(""))
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "The username is empty.");
        if(requestUser.getPassword().equals(""))
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "The password is empty.");

        User bdUser = userRepository.getUserByusername(requestUser.getUsername());

        if(bdUser != null)
            throw new ResponseStatusException(HttpStatus.CONFLICT, "The username already exists.");
        else{
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12); // Strength set as 12
            requestUser.setPassword(encoder.encode(requestUser.getPassword()));
            return userRepository.save(requestUser);
        }
    }
}
