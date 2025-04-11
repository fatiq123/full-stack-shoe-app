package com.shoeapp.repository;

import com.shoeapp.entity.Shoe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShoeRepository extends JpaRepository<Shoe, Long> {
    List<Shoe> findByBrand(String brand);
    List<Shoe> findByCategory(String category);
    List<Shoe> findByPriceBetween(Double minPrice, Double maxPrice);
}
