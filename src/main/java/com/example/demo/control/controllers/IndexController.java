package com.example.demo.control.controllers;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class IndexController {

    @GetMapping(value = "/admin")
    public String getAdmin(Principal principal){
        return "admin";
    }

    @GetMapping(value = "/register")
    public String getAbout(Principal principal){
        return "register";
    }

    @GetMapping("/logout")
    public String logout(){
        SecurityContextHolder.clearContext();
        return "redirect:/index.html";
    }
}
