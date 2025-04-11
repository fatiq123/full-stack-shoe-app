package com.shoeapp.service.impl;

import com.shoeapp.dto.response.CartItemResponse;
import com.shoeapp.dto.response.OrderResponse;
import com.shoeapp.entity.CartItem;
import com.shoeapp.entity.Order;
import com.shoeapp.entity.Shoe;
import com.shoeapp.entity.User;
import com.shoeapp.exception.BadRequestException;
import com.shoeapp.exception.ResourceNotFoundException;
import com.shoeapp.repository.CartItemRepository;
import com.shoeapp.repository.OrderRepository;
import com.shoeapp.repository.ShoeRepository;
import com.shoeapp.repository.UserRepository;
import com.shoeapp.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ShoeRepository shoeRepository;

    @Transactional(readOnly = true)
    public List<OrderResponse> getUserOrders() {
        User user = getCurrentUser();
        List<Order> orders = orderRepository.findByUserOrderByOrderDateDesc(user);

        return orders.stream()
                .map(this::mapToOrderResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long id) {
        User user = getCurrentUser();
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("You don't have permission to view this order");
        }

        return mapToOrderResponse(order);
    }

    @Transactional
    public OrderResponse createOrder() {
        User user = getCurrentUser();
        List<CartItem> cartItems = cartItemRepository.findByUserAndOrderIsNull(user);

        if (cartItems.isEmpty()) {
            throw new BadRequestException("Cart is empty. Cannot create order.");
        }

        // Calculate total amount
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (CartItem item : cartItems) {
            BigDecimal itemPrice = item.getShoe().getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            totalAmount = totalAmount.add(itemPrice);

            // Check if there's enough stock
            Shoe shoe = item.getShoe();
            if (shoe.getStock() < item.getQuantity()) {
                throw new BadRequestException("Not enough stock for " + shoe.getName());
            }

            // Update stock
            shoe.setStock(shoe.getStock() - item.getQuantity());
            shoeRepository.save(shoe);
        }

        // Create order
        Order order = Order.builder()
                .user(user)
                .orderDate(LocalDateTime.now())
                .totalAmount(totalAmount)
                .status("PENDING")
                .build();

        Order savedOrder = orderRepository.save(order);

        // Assign order to cart items
        for (CartItem item : cartItems) {
            item.setOrder(savedOrder);
            cartItemRepository.save(item);
        }

        log.info("Created new order for user: {}, total amount: {}", user.getUsername(), totalAmount);

        return mapToOrderResponse(savedOrder);
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));

        order.setStatus(status);
        Order updatedOrder = orderRepository.save(order);

        log.info("Updated order status to {} for order id: {}", status, id);

        return mapToOrderResponse(updatedOrder);
    }

    private OrderResponse mapToOrderResponse(Order order) {
        List<CartItem> orderItems = order.getItems().stream().collect(Collectors.toList());

        List<CartItemResponse> cartItemResponses = orderItems.stream()
                .map(item -> {
                    Shoe shoe = item.getShoe();
                    BigDecimal totalPrice = shoe.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));

                    return CartItemResponse.builder()
                            .id(item.getId())
                            .shoeId(shoe.getId())
                            .shoeName(shoe.getName())
                            .shoeBrand(shoe.getBrand())
                            .shoeSize(shoe.getSize())
                            .shoeColor(shoe.getColor())
                            .shoePrice(shoe.getPrice())
                            .shoeImageUrl(shoe.getImageUrl())
                            .quantity(item.getQuantity())
                            .totalPrice(totalPrice)
                            .build();
                })
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .username(order.getUser().getUsername())
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .items(cartItemResponses)
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }

    private User getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userDetails.getUsername()));
    }
}
