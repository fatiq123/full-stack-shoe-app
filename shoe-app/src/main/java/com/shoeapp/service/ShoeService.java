package com.shoeapp.service;

import com.shoeapp.dto.request.ShoeRequest;
import com.shoeapp.dto.response.ShoeResponse;

import java.util.List;

public interface ShoeService {

    public List<ShoeResponse> getAllShoes();
    public ShoeResponse getShoeById(Long id);
    public List<ShoeResponse> getShoesByBrand(String brand);
    public List<ShoeResponse> getShoesByCategory(String category);
    public ShoeResponse createShoe(ShoeRequest shoeRequest);
    public ShoeResponse updateShoe(Long id, ShoeRequest shoeRequest);
    public void deleteShoe(Long id);

}
