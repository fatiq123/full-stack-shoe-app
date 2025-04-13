package com.shoeapp.service.impl;

import com.shoeapp.dto.request.OrderRequest;
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
import java.util.*;
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

    /*@Transactional
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
    }*/


    @Transactional
    public OrderResponse createOrder(OrderRequest orderRequest, User user) {
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

        // Create order with shipping details
        Order order = Order.builder()
                .user(user)
                .orderDate(LocalDateTime.now())
                .totalAmount(totalAmount)
                .status("PENDING")
                .firstName(orderRequest.getFirstName())
                .lastName(orderRequest.getLastName())
                .address(orderRequest.getAddress())
                .city(orderRequest.getCity())
                .state(orderRequest.getState())
                .zipCode(orderRequest.getZipCode())
                .country(orderRequest.getCountry())
                .phoneNumber(orderRequest.getPhoneNumber())
                .paymentMethod(orderRequest.getPaymentMethod())
                .orderNotes(orderRequest.getOrderNotes())
                .shippingMethod(orderRequest.getShippingMethod())
                // new field here
                .items(new HashSet<>(cartItems))  // Initialize items here
                .build();

       /* Order savedOrder = orderRepository.save(order);

       *//* // Assign order to cart items
        for (CartItem item : cartItems) {
            item.setOrder(savedOrder);
            cartItemRepository.save(item);
        }*//*

        // Assign order to cart items and update the order's items collection
        Set<CartItem> orderItems = new HashSet<>();
        for (CartItem item : cartItems) {
            item.setOrder(savedOrder);
            CartItem savedItem = cartItemRepository.save(item);
            orderItems.add(savedItem);
        }

        // Update the order's items collection
        savedOrder.setItems(orderItems);
        savedOrder = orderRepository.save(savedOrder);
*/


        // Assign order to cart items
        for (CartItem item : cartItems) {
            item.setOrder(order);
        }

        // --------------
        order.setUser(user);
        order.setItems(new HashSet<>(cartItems));
        cartItems.forEach(item -> item.setOrder(order));
        orderRepository.save(order);

        // Save order (cascades to cart items if configured)
        Order savedOrder = orderRepository.save(order);

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

   /* private OrderResponse mapToOrderResponse(Order order) {
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
    }*/



    // Update the mapping method to include the new fields
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
                // Include shipping details
                .firstName(order.getFirstName())
                .lastName(order.getLastName())
                .address(order.getAddress())
                .city(order.getCity())
                .state(order.getState())
                .zipCode(order.getZipCode())
                .country(order.getCountry())
                .phoneNumber(order.getPhoneNumber())
                .paymentMethod(order.getPaymentMethod())
                .orderNotes(order.getOrderNotes())
                .shippingMethod(order.getShippingMethod())
                .trackingNumber(order.getTrackingNumber())
                .shippedDate(order.getShippedDate())
                .deliveredDate(order.getDeliveredDate())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }




    private User getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userDetails.getUsername()));
    }





    @Transactional
    public OrderResponse updateTrackingNumber(Long id, String trackingNumber) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));

        order.setTrackingNumber(trackingNumber);
        if (order.getStatus().equals("PENDING") || order.getStatus().equals("PROCESSING")) {
            order.setStatus("SHIPPED");
            order.setShippedDate(LocalDateTime.now());
        }

        Order updatedOrder = orderRepository.save(order);
        log.info("Updated tracking number for order id: {} to {}", id, trackingNumber);

        return mapToOrderResponse(updatedOrder);
    }

    @Transactional
    public OrderResponse markAsShipped(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));

        order.setStatus("SHIPPED");
        order.setShippedDate(LocalDateTime.now());

        Order updatedOrder = orderRepository.save(order);
        log.info("Marked order id: {} as shipped", id);

        return mapToOrderResponse(updatedOrder);
    }

    @Transactional
    public OrderResponse markAsDelivered(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));

        order.setStatus("DELIVERED");
        order.setDeliveredDate(LocalDateTime.now());

        Order updatedOrder = orderRepository.save(order);
        log.info("Marked order id: {} as delivered", id);

        return mapToOrderResponse(updatedOrder);
    }

    public Map<String, Object> getOrderStatistics(String timeframe) {
        LocalDateTime startDate;
        LocalDateTime endDate = LocalDateTime.now();

        if (timeframe == null || timeframe.equals("all")) {
            startDate = LocalDateTime.now().minusYears(10); // Just a very old date to get all orders
        } else if (timeframe.equals("today")) {
            startDate = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        } else if (timeframe.equals("week")) {
            startDate = LocalDateTime.now().minusDays(7);
        } else if (timeframe.equals("month")) {
            startDate = LocalDateTime.now().minusMonths(1);
        } else if (timeframe.equals("year")) {
            startDate = LocalDateTime.now().minusYears(1);
        } else {
            throw new BadRequestException("Invalid timeframe parameter. Valid values: all, today, week, month, year");
        }

        List<Order> orders = orderRepository.findByOrderDateBetween(startDate, endDate);

        // Calculate statistics
        BigDecimal totalRevenue = orders.stream()
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long totalOrders = orders.size();

        long pendingOrders = orders.stream()
                .filter(order -> order.getStatus().equals("PENDING"))
                .count();

        long processingOrders = orders.stream()
                .filter(order -> order.getStatus().equals("PROCESSING"))
                .count();

        long shippedOrders = orders.stream()
                .filter(order -> order.getStatus().equals("SHIPPED"))
                .count();

        long deliveredOrders = orders.stream()
                .filter(order -> order.getStatus().equals("DELIVERED"))
                .count();

        long cancelledOrders = orders.stream()
                .filter(order -> order.getStatus().equals("CANCELLED"))
                .count();

        // Group orders by date (daily count)
        Map<String, Long> ordersByDate = orders.stream()
                .collect(Collectors.groupingBy(
                        order -> order.getOrderDate().toLocalDate().toString(),
                        Collectors.counting()
                ));

        Map<String, Object> statistics = new HashMap<>();
        statistics.put("timeframe", timeframe != null ? timeframe : "all");
        statistics.put("totalRevenue", totalRevenue);
        statistics.put("totalOrders", totalOrders);
        statistics.put("pendingOrders", pendingOrders);
        statistics.put("processingOrders", processingOrders);
        statistics.put("shippedOrders", shippedOrders);
        statistics.put("deliveredOrders", deliveredOrders);
        statistics.put("cancelledOrders", cancelledOrders);
        statistics.put("ordersByDate", ordersByDate);

        return statistics;
    }

}
