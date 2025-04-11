package com.shoeapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {
    private Long id;
    private Long shoeId;
    private String shoeName;
    private String shoeBrand;
    private String shoeSize;
    private String shoeColor;
    private BigDecimal shoePrice;
    private String shoeImageUrl;
    private Integer quantity;
    private BigDecimal totalPrice;
}