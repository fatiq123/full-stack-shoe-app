package com.shoeapp.service;

import com.shoeapp.dto.request.CartItemRequest;
import com.shoeapp.dto.response.CartItemResponse;
import com.shoeapp.dto.response.CartResponse;

public interface CartService {

    public CartResponse getCart();
    public CartItemResponse addToCart(CartItemRequest cartItemRequest);
    public CartItemResponse updateCartItem(Long itemId, CartItemRequest cartItemRequest);
    public void removeFromCart(Long itemId);
    public void clearCart();


}
