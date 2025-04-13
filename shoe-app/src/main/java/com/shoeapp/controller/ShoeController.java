package com.shoeapp.controller;

import com.shoeapp.dto.request.ShoeRequest;
import com.shoeapp.dto.response.ShoeResponse;
import com.shoeapp.service.ImageService;
import com.shoeapp.service.ShoeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/shoes")
@RequiredArgsConstructor
@Slf4j
public class ShoeController {

    private final ShoeService shoeService;
    private final ImageService imageService;

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


    // New endpoint with image upload
    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShoeResponse> createShoeWithImage(
            @RequestPart("shoe") @Valid ShoeRequest shoeRequest,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {

        log.info("Creating new shoe: {} with image", shoeRequest.getName());

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = imageService.storeImage(imageFile);
            shoeRequest.setImageUrl(imageUrl);
        }

        ShoeResponse createdShoe = shoeService.createShoe(shoeRequest);
        return new ResponseEntity<>(createdShoe, HttpStatus.CREATED);
    }


    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShoeResponse> createShoe(@Valid @RequestBody ShoeRequest shoeRequest) {
        log.info("Creating new shoe: {}", shoeRequest.getName());
        ShoeResponse createdShoe = shoeService.createShoe(shoeRequest);
        return new ResponseEntity<>(createdShoe, HttpStatus.CREATED);
    }



    // Update endpoint with image upload
    @PutMapping(value = "/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShoeResponse> updateShoeWithImage(
            @PathVariable Long id,
            @RequestPart("shoe") @Valid ShoeRequest shoeRequest,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {

        log.info("Updating shoe with id: {} with image", id);

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = imageService.storeImage(imageFile);
            shoeRequest.setImageUrl(imageUrl);
        }

        ShoeResponse updatedShoe = shoeService.updateShoe(id, shoeRequest);
        return ResponseEntity.ok(updatedShoe);
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
