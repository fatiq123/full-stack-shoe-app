package com.shoeapp.service;

import com.shoeapp.dto.request.OrderRequest;
import com.shoeapp.dto.response.OrderResponse;
import com.shoeapp.entity.User;

import java.util.List;
import java.util.Map;

public interface OrderService {

    public List<OrderResponse> getUserOrders();
    public OrderResponse getOrderById(Long id);
//    public OrderResponse createOrder();
    public OrderResponse createOrder(OrderRequest orderRequest, User user);
    public OrderResponse updateOrderStatus(Long id, String status);

    public OrderResponse updateTrackingNumber(Long id, String trackingNumber);
    public OrderResponse markAsShipped(Long id);
    public OrderResponse markAsDelivered(Long id);
    public Map<String, Object> getOrderStatistics(String timeframe);

}
