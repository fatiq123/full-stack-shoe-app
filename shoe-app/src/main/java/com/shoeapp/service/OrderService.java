package com.shoeapp.service;

import com.shoeapp.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {

    public List<OrderResponse> getUserOrders();
    public OrderResponse getOrderById(Long id);
    public OrderResponse createOrder();
    public OrderResponse updateOrderStatus(Long id, String status);


}
