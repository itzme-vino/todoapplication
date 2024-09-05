package com.vinodh.todo.Login;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;


@Controller
@SessionAttributes("username")
public class WelcomeController {
    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String GotoWelcomePage(ModelMap model)
    {
        model.put("username",getLoggedInUsername());
        return "welcome";

    }
    private String getLoggedInUsername()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
