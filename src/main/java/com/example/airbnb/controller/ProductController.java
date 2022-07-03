package com.example.airbnb.controller;

import com.example.airbnb.model.Product;
import com.example.airbnb.service.impl.CategoryServiceImpl;
import com.example.airbnb.service.impl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("users/api/products")
public class ProductController {
    @Autowired
    private ProductServiceImpl productService;
    @Autowired
    private CategoryServiceImpl categoryService;

//    @PostMapping
//    public ResponseEntity<Product> saveProduct(@Valid @RequestBody Product product) {
//        return new ResponseEntity<>(productService.save(product), HttpStatus.CREATED);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
//        Optional<Product> productOptional = productService.findById(id);
//        if (!productOptional.isPresent()) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        product.setId(productOptional.get().getId());
//        return new ResponseEntity<>(productService.save(product), HttpStatus.OK);
//    }

    @PostMapping
    public ResponseEntity<Product> handleFileUpload(@RequestParam("file") MultipartFile file, Product product) {
        String fileName = file.getOriginalFilename();
        product.setImage(fileName);
        try {
            file.transferTo(new File("C:\\Users\\hongh\\IdeaProjects\\jwtSpringBoot\\src\\main\\resources\\templates\\image\\" + fileName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return new ResponseEntity<>(productService.save(product), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestParam("file") MultipartFile file,@Valid Product product) {
        String fileName = file.getOriginalFilename();
        if (fileName.equals("")){
            product.setImage(productService.findById(id).get().getImage());
        }else {
            product.setImage(fileName);
            try {
                file.transferTo(new File("C:\\Users\\hongh\\IdeaProjects\\jwtSpringBoot\\src\\main\\resources\\templates\\image\\" + fileName));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        product.setId(id);
        return new ResponseEntity<>(productService.save(product), HttpStatus.OK);
    }


    @GetMapping("/category_id/{id}")
    public ResponseEntity<Iterable<Product>> findAllByCategory_Id(@PathVariable Long id) {
        List<Product> products = (List<Product>) productService.findAllByCategoryId(id);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> showViewById(@PathVariable Long id) {
        Optional<Product> product = productService.findById(id);
        return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        Optional<Product> questionOptional = productService.findById(id);
        if(!questionOptional.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.remove(id);
        return new ResponseEntity<>(questionOptional.get(),HttpStatus.OK);
    }

    @GetMapping("/find-by-name/{name}")
    public ResponseEntity<Iterable<Product>> showViewById(@PathVariable String name) {
        Iterable<Product> product = productService.findAllByCategoryName(name);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/find-by-price")
    public ResponseEntity<Iterable<Product>> showViewById(@RequestParam int from, @RequestParam int to) {
        Iterable<Product> product = productService.findAllByPriceBetween(from, to);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

}
