package com.risingForce.repositories;

import com.risingForce.domain.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
	List<Comment> findAll();
	Comment findOne(String id);
	Comment save(Comment comment);
	void delete(Comment comment);
}
