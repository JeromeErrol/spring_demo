package com.example.demo.model.repositories;

import com.example.demo.model.entities.Account;
import com.example.demo.model.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
