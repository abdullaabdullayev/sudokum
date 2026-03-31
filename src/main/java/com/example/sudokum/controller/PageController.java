package com.example.sudokum.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("/sign-up")
    public String showSignUpPage(){
        return "sign-up";
    }
    @GetMapping("/home-page")
    public String showHomePage(HttpSession session, Model model){
        String user = (String) session.getAttribute("loggedInUser");

        if (user == null) {
            return "redirect:/sign-up";
        }
        model.addAttribute("username", user);
        return "home-page";
    }
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/sign-up";
    }
    @GetMapping("/users/log-in")
    public String showLogInPage(){
        return "log-in";
    }
}
