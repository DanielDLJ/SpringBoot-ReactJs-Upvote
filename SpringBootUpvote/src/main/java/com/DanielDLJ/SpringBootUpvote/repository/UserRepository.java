package com.DanielDLJ.SpringBootUpvote.repository;

import com.DanielDLJ.SpringBootUpvote.model.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface UserRepository  extends Neo4jRepository<User, Long> {

    User getUserByusername(String username);
}