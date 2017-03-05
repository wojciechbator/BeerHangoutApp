package com.beerHangout.controllers;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import com.beerHangout.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.beerHangout.utils.State.populateModel;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class HomeController {

    private final CommentRepository repository;

	@Autowired
	public HomeController(CommentRepository repository) {
		this.repository = repository;
	}

    @RequestMapping(value = "/", method = GET)
    public String index(Model model, HttpServletRequest request) {
		populateModel(model, request);
        model.addAttribute("comments", getCommentsState());
        return "index";
    }

	private Map<String, Object> getCommentsState() {
		Map<String,Object> state = new HashMap<>();
		state.put("status", "loaded");
		state.put("data", repository.findAll());
		return state;
	}
}
