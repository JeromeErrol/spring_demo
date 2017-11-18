package com.example.demo.control.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class IndexController {

    @GetMapping(value = "/admin")
    public String get(Principal principal){
        return "admin";
    }
}
