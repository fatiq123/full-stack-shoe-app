package com.shoeapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private Long userId;
    private String username;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private String status;
    private List<CartItemResponse> items;

    // Add shipping information
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String phoneNumber;
    private String paymentMethod;
    private String orderNotes;
    private String shippingMethod;
    private String trackingNumber;
    private LocalDateTime shippedDate;
    private LocalDateTime deliveredDate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}