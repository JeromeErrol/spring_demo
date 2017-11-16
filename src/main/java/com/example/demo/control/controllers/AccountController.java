package com.example.demo.control.controllers;

import com.example.demo.model.entities.Bookmark;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class AccountController {

    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }
}
