package com.shoeapp.repository;

import com.shoeapp.entity.CartItem;
import com.shoeapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserAndOrderIsNull(User user);
    Optional<CartItem> findByUserIdAndShoeIdAndOrderIsNull(Long userId, Long shoeId);
}
