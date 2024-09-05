package com.vinodh.todo.Todo;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import jakarta.validation.Valid;

@Service
public class TodoService {
    private static List<Todo> todos = new ArrayList<>();
    private static int todoCount =0;
    static{
        todos.add(new Todo(++todoCount,"vinodh","Learn Spring boot", LocalDate.now().plusMonths(2),false));
        todos.add(new Todo(++todoCount,"raj","Learn Spring Azure", LocalDate.now().plusMonths(3),false));
        todos.add(new Todo(++todoCount,"m","Learn Spring AWS", LocalDate.now().plusMonths(7),false));
    }
    public List<Todo> findByUsername(String username)
    {
        Predicate<? super Todo> predicate = todo -> todo.getUsername().equalsIgnoreCase(username);
        return todos.stream().filter(predicate).toList();
    }
    public void addTodo(String username, String description, LocalDate targetDate, boolean done)
    {
        Todo todo = new Todo(++todoCount,username,description,targetDate,done);
        todos.add(todo);
    }
    public void deleteById(int id)
    {
        Predicate<? super Todo> predicate
                = todo -> todo.getId()==id;
        todos.removeIf(predicate);
    }
    public Todo findById(int id)
    {
        Predicate<? super Todo> predicate
                = todo -> todo.getId()==id;
        return todos.stream().filter(predicate).findFirst().get();

    }
    public void updateTodo(@Valid Todo todo)
    {
        deleteById(todo.getId());
        todos.add(todo);
    }
}
