package com.shoeapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Data
//@Builder
////@NoArgsConstructor
////@AllArgsConstructor
//public class OrderRequest {
//    // No additional fields needed as the order will be created from the current user's cart
//
//}


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    // Shipping information
    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State/Province is required")
    private String state;

    @NotBlank(message = "ZIP/Postal code is required")
    private String zipCode;

    @NotBlank(message = "Country is required")
    private String country;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9\\+\\-\\s]+$", message = "Invalid phone number format")
    private String phoneNumber;

    // Payment information (in a real app, you'd use a payment processor)
    private String paymentMethod; // CREDIT_CARD, PAYPAL, etc.

    // Optional notes
    private String orderNotes;

    // If we want to support different shipping methods
    private String shippingMethod; // STANDARD, EXPRESS, etc.
}