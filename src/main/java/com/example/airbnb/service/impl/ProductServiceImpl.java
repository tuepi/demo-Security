package com.example.airbnb.service.impl;

import com.example.airbnb.model.Product;
import com.example.airbnb.repository.IProductRepository;
import com.example.airbnb.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService {
    @Autowired
    private IProductRepository productRepository;

    @Override
    public Iterable<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void remove(Long id) {
        productRepository.deleteById(id);
    }

    public Iterable<Product> findAllByCategoryId(Long id){
        if (id == 0) {
            return productRepository.findAll();
        }
        return productRepository.findAllByCategoryId(id);
    }

    public Iterable<Product> findAllByCategoryName(String name){
        return productRepository.findAllByCategoryName(name);
    }

    public Iterable<Product> findAllByPriceBetween(int from, int to){
        return productRepository.findAllByPriceBetween(from, to);
    }
}
