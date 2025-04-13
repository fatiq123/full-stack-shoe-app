package com.shoeapp.controller;

import com.shoeapp.dto.request.OrderRequest;
import com.shoeapp.dto.response.OrderResponse;
import com.shoeapp.entity.User;
import com.shoeapp.exception.ResourceNotFoundException;
import com.shoeapp.repository.UserRepository;
import com.shoeapp.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getUserOrders() {
        log.info("Fetching user's orders");
        List<OrderResponse> orders = orderService.getUserOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id) {
        log.info("Fetching order with id: {}", id);
        OrderResponse order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

//    @PostMapping
//    public ResponseEntity<OrderResponse> createOrder() {
//        log.info("Creating new order");
//        OrderResponse createdOrder = orderService.createOrder();
//        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
//    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody OrderRequest orderRequest) {
        log.info("Creating new order");

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userDetails.getUsername()));

        OrderResponse createdOrder = orderService.createOrder(orderRequest, user);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        log.info("Updating order status for order id: {} to {}", id, status);
        OrderResponse updatedOrder = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(updatedOrder);
    }








    @PutMapping("/{id}/tracking")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderResponse> updateTrackingInfo(
            @PathVariable Long id,
            @RequestParam String trackingNumber) {
        log.info("Updating tracking information for order id: {}", id);
        OrderResponse updatedOrder = orderService.updateTrackingNumber(id, trackingNumber);
        return ResponseEntity.ok(updatedOrder);
    }

    @PutMapping("/{id}/shipped")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderResponse> markAsShipped(@PathVariable Long id) {
        log.info("Marking order id: {} as shipped", id);
        OrderResponse updatedOrder = orderService.markAsShipped(id);
        return ResponseEntity.ok(updatedOrder);
    }

    @PutMapping("/{id}/delivered")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderResponse> markAsDelivered(@PathVariable Long id) {
        log.info("Marking order id: {} as delivered", id);
        OrderResponse updatedOrder = orderService.markAsDelivered(id);
        return ResponseEntity.ok(updatedOrder);
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getOrderStatistics(
            @RequestParam(required = false) String timeframe) {
        log.info("Fetching order statistics with timeframe: {}", timeframe);
        return ResponseEntity.ok(orderService.getOrderStatistics(timeframe));
    }
}
