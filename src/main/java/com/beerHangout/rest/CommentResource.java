package com.beerHangout.rest;

import com.beerHangout.domain.Comment;
import com.beerHangout.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentResource {

	private final CommentRepository commentRepository;

	@Autowired
	public CommentResource(CommentRepository commentRepository) {
		this.commentRepository = commentRepository;
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<Comment> getAllComments() {
		return commentRepository.findAll();
	}

	@RequestMapping(method = RequestMethod.POST)
	public Comment createComment(@Valid @RequestBody Comment comment) {
		return commentRepository.save(comment);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public ResponseEntity<Comment> getCommentById(@PathVariable("id") String id) {
		Comment comment = commentRepository.findOne(id);
		if(comment == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(comment, HttpStatus.OK);
		}
	}

	@RequestMapping(value="{id}", method = RequestMethod.PUT)
	public ResponseEntity<Comment> updateComment(@Valid @RequestBody Comment comment, @PathVariable("id") String id) {
		Comment commentData = commentRepository.findOne(id);
		if(commentData == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		commentData.setAuthor(comment.getAuthor());
		commentData.setContent(comment.getContent());
		Comment updatedComment = commentRepository.save(commentData);
		return new ResponseEntity<>(updatedComment, HttpStatus.OK);
	}

	@RequestMapping(value="{id}", method = RequestMethod.DELETE)
	public void deleteComment(@Valid @PathVariable("id") String id) {
		commentRepository.delete(id);
	}
}

