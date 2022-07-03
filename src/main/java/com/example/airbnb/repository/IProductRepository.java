package com.example.airbnb.repository;

import com.example.airbnb.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {
    Iterable<Product> findAllByCategoryId(Long id);

    Iterable<Product> findAllByCategoryName(String name);

    Iterable<Product> findAllByPriceBetween(int from, int to);
}
