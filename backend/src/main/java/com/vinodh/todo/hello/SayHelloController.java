package com.vinodh.todo.hello;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class SayHelloController {
    @RequestMapping("/sayhellojsp")
    public String sayHello()
    {
    return "sayhello";
    }

}
