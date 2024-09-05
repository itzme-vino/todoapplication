package com.vinodh.todo.Todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
    public List<Todo> findByUsername(String username);
}
