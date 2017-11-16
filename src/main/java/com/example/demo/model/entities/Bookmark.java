package com.example.demo.model.entities;

import javax.persistence.*;

@Entity
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @ManyToOne
    private Account account;

    protected Bookmark() {

    }

    public Bookmark(String title) {
        this.title = title;
    }


    public Bookmark(String title, Account account) {
        this.title = title;
        this.account = account;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
