package com.beerHangout.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.script.ScriptTemplateConfigurer;
import org.springframework.web.servlet.view.script.ScriptTemplateViewResolver;

/**
 * Ważne, konfig view resolvera pod react
 */
@Configuration
public class ViewConfig {

    private static final String[] scripts = {
            "static/js/polyfill.js",
            "static/js/render.js",
            "static/app/bundle.js"
    };

    @Bean
    public ViewResolver reactViewResolver() {
        ScriptTemplateViewResolver viewResolver = new ScriptTemplateViewResolver();
        //index.txt :) Kotwica dla naszego reacta
        viewResolver.setPrefix("templates/");
        viewResolver.setSuffix(".txt");
        return viewResolver;
    }

    @Bean
    public ScriptTemplateConfigurer reactConfigurer() {
        ScriptTemplateConfigurer configurer = new ScriptTemplateConfigurer();

        configurer.setEngineName("nashorn");
        configurer.setScripts(scripts);
        configurer.setRenderFunction("render");
        configurer.setSharedEngine(false);

        return configurer;
    }

}
