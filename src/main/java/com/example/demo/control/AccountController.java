package com.example.demo.control;

import com.example.demo.model.entities.Account;
import com.example.demo.model.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }

    @PostMapping("/register")
    public Account register(@RequestBody Account account) {
        account.setRole("ROLE_USER");
        accountRepository.save(account);
        return account;
    }
}
