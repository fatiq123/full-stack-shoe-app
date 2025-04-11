package com.shoeapp.controller;

import com.shoeapp.dto.request.ShoeRequest;
import com.shoeapp.dto.response.ShoeResponse;
import com.shoeapp.service.ShoeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shoes")
@RequiredArgsConstructor
@Slf4j
public class ShoeController {

    private final ShoeService shoeService;

    @GetMapping
    public ResponseEntity<List<ShoeResponse>> getAllShoes() {
        log.info("Fetching all shoes");
        List<ShoeResponse> shoes = shoeService.getAllShoes();
        return ResponseEntity.ok(shoes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShoeResponse> getShoeById(@PathVariable Long id) {
        log.info("Fetching shoe with id: {}", id);
        ShoeResponse shoe = shoeService.getShoeById(id);
        return ResponseEntity.ok(shoe);
    }

    @GetMapping("/brand/{brand}")
    public ResponseEntity<List<ShoeResponse>> getShoesByBrand(@PathVariable String brand) {
        log.info("Fetching shoes with brand: {}", brand);
        List<ShoeResponse> shoes = shoeService.getShoesByBrand(brand);
        return ResponseEntity.ok(shoes);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ShoeResponse>> getShoesByCategory(@PathVariable String category) {
        log.info("Fetching shoes with category: {}", category);
        List<ShoeResponse> shoes = shoeService.getShoesByCategory(category);
        return ResponseEntity.ok(shoes);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShoeResponse> createShoe(@Valid @RequestBody ShoeRequest shoeRequest) {
        log.info("Creating new shoe: {}", shoeRequest.getName());
        ShoeResponse createdShoe = shoeService.createShoe(shoeRequest);
        return new ResponseEntity<>(createdShoe, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShoeResponse> updateShoe(
            @PathVariable Long id,
            @Valid @RequestBody ShoeRequest shoeRequest) {
        log.info("Updating shoe with id: {}", id);
        ShoeResponse updatedShoe = shoeService.updateShoe(id, shoeRequest);
        return ResponseEntity.ok(updatedShoe);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteShoe(@PathVariable Long id) {
        log.info("Deleting shoe with id: {}", id);
        shoeService.deleteShoe(id);
        return ResponseEntity.noContent().build();
    }
}
