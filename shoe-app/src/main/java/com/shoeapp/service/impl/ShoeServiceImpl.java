package com.shoeapp.service.impl;

import com.shoeapp.dto.request.ShoeRequest;
import com.shoeapp.dto.response.ShoeResponse;
import com.shoeapp.entity.Shoe;
import com.shoeapp.exception.ResourceNotFoundException;
import com.shoeapp.repository.ShoeRepository;
import com.shoeapp.service.ShoeService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShoeServiceImpl implements ShoeService {

    private final ShoeRepository shoeRepository;

    @Transactional(readOnly = true)
    public List<ShoeResponse> getAllShoes() {
        List<Shoe> shoes = shoeRepository.findAll();
        return shoes.stream()
                .map(this::mapToShoeResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ShoeResponse getShoeById(Long id) {
        Shoe shoe = shoeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shoe", "id", id));

        return mapToShoeResponse(shoe);
    }

    @Transactional(readOnly = true)
    public List<ShoeResponse> getShoesByBrand(String brand) {
        List<Shoe> shoes = shoeRepository.findByBrand(brand);
        return shoes.stream()
                .map(this::mapToShoeResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ShoeResponse> getShoesByCategory(String category) {
        List<Shoe> shoes = shoeRepository.findByCategory(category);
        return shoes.stream()
                .map(this::mapToShoeResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ShoeResponse createShoe(ShoeRequest shoeRequest) {
        Shoe shoe = Shoe.builder()
                .name(shoeRequest.getName())
                .brand(shoeRequest.getBrand())
                .category(shoeRequest.getCategory())
                .size(shoeRequest.getSize())
                .color(shoeRequest.getColor())
                .price(shoeRequest.getPrice())
                .stock(shoeRequest.getStock())
                .description(shoeRequest.getDescription())
                .imageUrl(shoeRequest.getImageUrl())
                .build();

        Shoe savedShoe = shoeRepository.save(shoe);
        log.info("Created new shoe: {}", savedShoe.getName());

        return mapToShoeResponse(savedShoe);
    }

    @Transactional
    public ShoeResponse updateShoe(Long id, ShoeRequest shoeRequest) {
        Shoe shoe = shoeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shoe", "id", id));

        shoe.setName(shoeRequest.getName());
        shoe.setBrand(shoeRequest.getBrand());
        shoe.setCategory(shoeRequest.getCategory());
        shoe.setSize(shoeRequest.getSize());
        shoe.setColor(shoeRequest.getColor());
        shoe.setPrice(shoeRequest.getPrice());
        shoe.setStock(shoeRequest.getStock());
        shoe.setDescription(shoeRequest.getDescription());
        shoe.setImageUrl(shoeRequest.getImageUrl());

        Shoe updatedShoe = shoeRepository.save(shoe);
        log.info("Updated shoe: {}", updatedShoe.getName());

        return mapToShoeResponse(updatedShoe);
    }

    @Transactional
    public void deleteShoe(Long id) {
        Shoe shoe = shoeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shoe", "id", id));

        shoeRepository.delete(shoe);
        log.info("Deleted shoe: {}", shoe.getName());
    }

    private ShoeResponse mapToShoeResponse(Shoe shoe) {
        return ShoeResponse.builder()
                .id(shoe.getId())
                .name(shoe.getName())
                .brand(shoe.getBrand())
                .category(shoe.getCategory())
                .size(shoe.getSize())
                .color(shoe.getColor())
                .price(shoe.getPrice())
                .stock(shoe.getStock())
                .description(shoe.getDescription())
                .imageUrl(shoe.getImageUrl())
                .createdAt(shoe.getCreatedAt())
                .updatedAt(shoe.getUpdatedAt())
                .build();
    }
}
