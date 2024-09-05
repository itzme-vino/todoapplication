package com.vinodh.todo.Todo;

import com.vinodh.todo.Login.WelcomeController;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.time.LocalDate;
import java.util.List;

@Controller
@SessionAttributes("username")
public class TodoControllerJpa {
    private WelcomeController welcomeController;
    public TodoControllerJpa(TodoRepository todoRepository)
    {
        super();
        this.todoRepository = todoRepository;
    }
    private TodoRepository todoRepository;

    @RequestMapping("list-todos")
    public String listTodos(ModelMap modelMap) {
        String username = getLoggedInUsername(modelMap);
        List<Todo> todos = todoRepository.findByUsername(username);
        modelMap.addAttribute("todos", todos);
        return "listTodos";
    }
    @RequestMapping(value = "add-todos",method = RequestMethod.GET)
    public String showNewTodoPage(ModelMap model)
    {
        String username = getLoggedInUsername(model);
        Todo todo = new Todo(0,username, "",LocalDate.now().plusDays(3),false);
        model.put("todo",todo);
        return "add-todos";
    }
    @RequestMapping(value = "add-todos",method = RequestMethod.POST)
    public String addNewTodo(ModelMap model, @Valid Todo todo, BindingResult result)
    {
        if(result.hasErrors())
        {
            return "add-todos";
        }
        String username = getLoggedInUsername(model);
        todo.setUsername(username);
        todoRepository.save(todo);
//        todoService.addTodo(username, todo.getDescription(), todo.getTargetDate(),todo.isDone());
        return "redirect:list-todos";
    }
    @RequestMapping("delete-todo")
    public String deleteTodo(@RequestParam int id)
    {
        todoRepository.deleteById(id);
        return "redirect:list-todos";
    }
    @RequestMapping(value = "update-todo", method = RequestMethod.GET)
    public String showupdateTodo(@RequestParam int id, ModelMap model)
    {
        Todo todo = todoRepository.findById(id).get();
        model.addAttribute("todo",todo);
        return "add-todos";
    }
    @RequestMapping(value = "update-todo",method = RequestMethod.POST)
    public String updateTodo(ModelMap model, @Valid Todo todo, BindingResult result)
    {
        if(result.hasErrors())
        {
            return "add-todos";
        }
        String username = getLoggedInUsername(model);
        todo.setUsername(username);
        todoRepository.save(todo);
        return "redirect:list-todos";
    }
    private String getLoggedInUsername(ModelMap modelMap)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
