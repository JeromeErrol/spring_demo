package com.example.demo.control;

import com.example.demo.control.exceptions.UserNotFoundException;
import com.example.demo.model.entities.Account;
import com.example.demo.model.entities.Bookmark;
import com.example.demo.model.repositories.AccountRepository;
import com.example.demo.model.repositories.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
public class BookmarkController {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private AccountRepository accountRepository;

    @RequestMapping(value = "/bookmarks/custom", method = RequestMethod.POST)
    public ResponseEntity<Bookmark> add(Principal principal, @RequestBody Bookmark bookmark) {
        Optional<Account> account = accountRepository.findByUsername(principal.getName());
        if (account.isPresent()) {
            bookmark.setAccount(account.get());
            bookmarkRepository.save(bookmark);
            return new ResponseEntity<Bookmark>(bookmark, HttpStatus.CREATED);
        } else {
            throw new UserNotFoundException("user with username " + principal.getName() + " does not exist");
        }
    }

    @GetMapping(value = "bookmarks/custom")
    public ResponseEntity<List<Bookmark>> get(Principal principal){
        Optional<Account> accountOptional = accountRepository.findByUsername(principal.getName());
        if (accountOptional.isPresent()) {
            return new ResponseEntity<>(accountOptional.get().getBookmarks(), HttpStatus.OK);
        } else {
            throw new UserNotFoundException("user with username " + principal.getName() + " does not exist");
        }
    }

}
