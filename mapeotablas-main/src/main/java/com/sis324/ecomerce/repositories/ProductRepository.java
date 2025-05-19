package com.sis324.ecomerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sis324.ecomerce.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
