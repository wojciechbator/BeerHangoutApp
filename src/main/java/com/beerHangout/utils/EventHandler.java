package com.beerHangout.utils;

import com.beerHangout.models.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

/**
 * Created by wojciech on 06.05.17.
 */
@Component
@RepositoryEventHandler(Comment.class)
public class EventHandler {

    private final SimpMessagingTemplate websocket;
    private final EntityLinks entityLinks;

    @Autowired
    public EventHandler(SimpMessagingTemplate websocket,
                        EntityLinks entityLinks) {
        this.websocket = websocket;
        this.entityLinks = entityLinks;
    }

    @HandleAfterCreate
    public void newComment(Comment comment) {
        this.websocket.convertAndSend(
                "/topic/newComment", getPath(comment));
    }

    @HandleAfterDelete
    public void deleteEmployee(Comment comment) {
        this.websocket.convertAndSend(
                "/topic/deleteComment", getPath(comment));
    }

    @HandleAfterSave
    public void updateEmployee(Comment comment) {
        this.websocket.convertAndSend(
                "/topic/updateComment", getPath(comment));
    }

    private String getPath(Comment comment) {
        return this.entityLinks.linkForSingleResource(comment.getClass(),
                comment.getId()).toUri().getPath();
    }

}
