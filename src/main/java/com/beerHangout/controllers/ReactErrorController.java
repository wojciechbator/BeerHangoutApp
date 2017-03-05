package com.beerHangout.controllers;

import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.beerHangout.utils.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.AbstractErrorController;
import org.springframework.boot.autoconfigure.web.ErrorAttributes;
import org.springframework.boot.autoconfigure.web.ErrorProperties;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/error")
public class ReactErrorController extends AbstractErrorController {

    private final ServerProperties serverProperties;

    @Autowired
    public ReactErrorController(ErrorAttributes errorAttributes, ServerProperties serverProperties) {
        super(errorAttributes);
        this.serverProperties = serverProperties;
    }

    @RequestMapping(produces = "text/html")
    public String errorHtml(Model model, HttpServletRequest request, HttpServletResponse response) {
        response.setStatus(getStatus(request).value());
        model.addAttribute("errors", getErrorAttributes(request, isIncludeStackTrace(request)));
        State.populateModel(model, request);
        return "index";
    }

    @RequestMapping
    @ResponseBody
    public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
        Map<String, Object> body = getErrorAttributes(request, isIncludeStackTrace(request));
        HttpStatus status = getStatus(request);
        return new ResponseEntity<>(body, status);
    }

    @Override
    public String getErrorPath() {
        return this.serverProperties.getError().getPath();
    }

    protected boolean isIncludeStackTrace(HttpServletRequest request) {
        ErrorProperties.IncludeStacktrace include = serverProperties.getError().getIncludeStacktrace();

        return include == ErrorProperties.IncludeStacktrace.ALWAYS ||
                include == ErrorProperties.IncludeStacktrace.ON_TRACE_PARAM && getTraceParameter(request);
    }
}
