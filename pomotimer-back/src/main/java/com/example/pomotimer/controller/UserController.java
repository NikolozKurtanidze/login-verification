package com.example.pomotimer.controller;


import com.example.pomotimer.entity.User;
import com.example.pomotimer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/checkServer")
    boolean checkServer(){
        return true;
    }

    @PutMapping("/registerUser")
    boolean registerUser(@RequestParam(required = true) String username, @RequestParam(required = true) String password, @RequestParam(required = true) String email){
        if(!userService.checkUsername(username, email)) return false;
        return userService.registerUser(username, password, email);
    }

    @GetMapping("/checkCode")
    boolean checkCode(@RequestParam(required = true) String username, @RequestParam(required = true) String verificationCode){
        return userService.checkCode(username, verificationCode);
    }

    @GetMapping("/checkInfo")
    boolean checkUsername(@RequestParam(required = true) String username, @RequestParam(required = true) String email){
        return userService.checkUsername(username, email);
    }

    @GetMapping("/loginUser")
    boolean loginUser(@RequestParam(required = true) String username, @RequestParam(required = true) String password){
        return userService.loginUser(username, password);
    }

    @PostMapping("/addPomo")
    void addPomo(@RequestParam(required = true) Long id){
        userService.addPomo(id);
    }

    @GetMapping("/getUserInfo")
    User getUserInfo(@RequestParam(required = true) String username){
        return userService.getUser(username);
    }

    @PostMapping("/changeVerificationCode")
    void changeVerificationCode(@RequestParam(required = true) String username){
        userService.changeVerificationCode(username);
    }

    @PostMapping("/sendVerificationCode")
    void sendVerificationCode(@RequestParam(required = true) String username) throws MessagingException, UnsupportedEncodingException {
        userService.sendVerificationEmail(username);
    }
}
