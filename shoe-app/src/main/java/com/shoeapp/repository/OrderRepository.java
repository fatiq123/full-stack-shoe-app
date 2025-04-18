package com.shoeapp.repository;

import com.shoeapp.entity.Order;
import com.shoeapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    List<Order> findByUserOrderByOrderDateDesc(User user);

    // Add to OrderRepository interface
    List<Order> findByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
