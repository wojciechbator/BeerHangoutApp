package com.beerHangout.controllers;

import com.beerHangout.models.Comment;
import org.apache.log4j.Logger;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by wojciech on 03.05.17.
 */
@Controller
@RequestMapping("/")
public class ChatController {

    private final static Logger logger = Logger.getLogger(ChatController.class);
    @MessageMapping("/chat")
    @SendTo("/topic/message")
    public Comment sendMessage(@RequestBody Comment comment) {
        // May be an overkill if we'll start to chat seriously
        logger.info("New message has been sent. Author is: " + comment.getAuthor());
        return new Comment(comment.getId(), comment.getAuthor(), comment.getContent(), comment.getTimestamp());
    }
}
