package com.beerHangout.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "comments")
public class Comment {
	@Id
	private String id;
	private String author;
	private String content;
	private long timestamp;
}
