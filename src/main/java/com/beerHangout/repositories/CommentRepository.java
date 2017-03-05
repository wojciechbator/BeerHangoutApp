package com.beerHangout.repositories;

import com.beerHangout.domain.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, Long> {

	List<Comment> findAll();

	Comment findOne(Long id);

	Comment save(Comment comment);

	void delete(Comment comment);
}
