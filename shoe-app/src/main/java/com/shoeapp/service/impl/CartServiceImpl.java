package com.shoeapp.service.impl;

import com.shoeapp.dto.request.CartItemRequest;
import com.shoeapp.dto.response.CartItemResponse;
import com.shoeapp.dto.response.CartResponse;
import com.shoeapp.entity.CartItem;
import com.shoeapp.entity.Shoe;
import com.shoeapp.entity.User;
import com.shoeapp.exception.BadRequestException;
import com.shoeapp.exception.ResourceNotFoundException;
import com.shoeapp.repository.CartItemRepository;
import com.shoeapp.repository.ShoeRepository;
import com.shoeapp.repository.UserRepository;
import com.shoeapp.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartServiceImpl implements CartService {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ShoeRepository shoeRepository;

    @Transactional(readOnly = true)
    public CartResponse getCart() {
        User user = getCurrentUser();
        List<CartItem> cartItems = cartItemRepository.findByUserAndOrderIsNull(user);

        List<CartItemResponse> cartItemResponses = cartItems.stream()
                .map(this::mapToCartItemResponse)
                .collect(Collectors.toList());

        BigDecimal totalPrice = cartItemResponses.stream()
                .map(CartItemResponse::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int totalItems = cartItemResponses.stream()
                .mapToInt(CartItemResponse::getQuantity)
                .sum();

        return CartResponse.builder()
                .items(cartItemResponses)
                .totalPrice(totalPrice)
                .totalItems(totalItems)
                .build();
    }

    @Transactional
    public CartItemResponse addToCart(CartItemRequest cartItemRequest) {
        User user = getCurrentUser();
        Shoe shoe = shoeRepository.findById(cartItemRequest.getShoeId())
                .orElseThrow(() -> new ResourceNotFoundException("Shoe", "id", cartItemRequest.getShoeId()));

        if (shoe.getStock() < cartItemRequest.getQuantity()) {
            throw new BadRequestException("Not enough stock available");
        }

        CartItem cartItem = cartItemRepository
                .findByUserIdAndShoeIdAndOrderIsNull(user.getId(), shoe.getId())
                .orElse(null);

        if (cartItem != null) {
            // Update existing item
            cartItem.setQuantity(cartItem.getQuantity() + cartItemRequest.getQuantity());
        } else {
            // Create new item
            cartItem = CartItem.builder()
                    .user(user)
                    .shoe(shoe)
                    .quantity(cartItemRequest.getQuantity())
                    .build();
        }

        CartItem savedCartItem = cartItemRepository.save(cartItem);
        log.info("Added/Updated cart item for user: {}, shoe: {}", user.getUsername(), shoe.getName());

        return mapToCartItemResponse(savedCartItem);
    }

    @Transactional
    public CartItemResponse updateCartItem(Long itemId, CartItemRequest cartItemRequest) {
        User user = getCurrentUser();
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart Item", "id", itemId));

        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("You don't have permission to update this cart item");
        }

        if (cartItem.getOrder() != null) {
            throw new BadRequestException("Cannot update item in completed order");
        }

        Shoe shoe = cartItem.getShoe();
        if (shoe.getStock() < cartItemRequest.getQuantity()) {
            throw new BadRequestException("Not enough stock available");
        }

        cartItem.setQuantity(cartItemRequest.getQuantity());
        CartItem updatedCartItem = cartItemRepository.save(cartItem);
        log.info("Updated cart item quantity for user: {}, shoe: {}", user.getUsername(), shoe.getName());

        return mapToCartItemResponse(updatedCartItem);
    }

    @Transactional
    public void removeFromCart(Long itemId) {
        User user = getCurrentUser();
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart Item", "id", itemId));

        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("You don't have permission to remove this cart item");
        }

        if (cartItem.getOrder() != null) {
            throw new BadRequestException("Cannot remove item from completed order");
        }

        cartItemRepository.delete(cartItem);
        log.info("Removed cart item for user: {}, shoe: {}", user.getUsername(), cartItem.getShoe().getName());
    }

    @Transactional
    public void clearCart() {
        User user = getCurrentUser();
        List<CartItem> cartItems = cartItemRepository.findByUserAndOrderIsNull(user);

        cartItemRepository.deleteAll(cartItems);
        log.info("Cleared cart for user: {}", user.getUsername());
    }

    private CartItemResponse mapToCartItemResponse(CartItem cartItem) {
        Shoe shoe = cartItem.getShoe();
        BigDecimal totalPrice = shoe.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));

        return CartItemResponse.builder()
                .id(cartItem.getId())
                .shoeId(shoe.getId())
                .shoeName(shoe.getName())
                .shoeBrand(shoe.getBrand())
                .shoeSize(shoe.getSize())
                .shoeColor(shoe.getColor())
                .shoePrice(shoe.getPrice())
                .shoeImageUrl(shoe.getImageUrl())
                .quantity(cartItem.getQuantity())
                .totalPrice(totalPrice)
                .build();
    }

    private User getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userDetails.getUsername()));
    }
}
