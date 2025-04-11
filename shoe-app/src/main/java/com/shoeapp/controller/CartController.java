package com.shoeapp.controller;

import com.shoeapp.dto.request.CartItemRequest;
import com.shoeapp.dto.response.CartItemResponse;
import com.shoeapp.dto.response.CartResponse;
import com.shoeapp.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Slf4j
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getCart() {
        log.info("Fetching user's cart");
        CartResponse cart = cartService.getCart();
        return ResponseEntity.ok(cart);
    }

    @PostMapping
    public ResponseEntity<CartItemResponse> addToCart(@Valid @RequestBody CartItemRequest cartItemRequest) {
        log.info("Adding item to cart: {}", cartItemRequest);
        CartItemResponse cartItem = cartService.addToCart(cartItemRequest);
        return new ResponseEntity<>(cartItem, HttpStatus.CREATED);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<CartItemResponse> updateCartItem(
            @PathVariable Long itemId,
            @Valid @RequestBody CartItemRequest cartItemRequest) {
        log.info("Updating cart item with id: {}", itemId);
        CartItemResponse updatedItem = cartService.updateCartItem(itemId, cartItemRequest);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long itemId) {
        log.info("Removing item from cart: {}", itemId);
        cartService.removeFromCart(itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart() {
        log.info("Clearing user's cart");
        cartService.clearCart();
        return ResponseEntity.noContent().build();
    }
}
