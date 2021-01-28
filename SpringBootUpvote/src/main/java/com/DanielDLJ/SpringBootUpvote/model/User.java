package com.DanielDLJ.SpringBootUpvote.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.List;


@Node
public class User {
    @Id
    @GeneratedValue
    private Long id;

    private String username = "";
    private String password = "";


    @Relationship(type = "Like")
    @JsonIgnoreProperties("liked_users")
    private List<Post> liked_posts = new ArrayList<>();

    public User() {
    }

    public User(String username, String password, List<Post> liked_posts) {
        this.username = username;
        this.password = password;
        this.liked_posts = liked_posts;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public List<Post> getLiked_posts() { return liked_posts; }

    public void setLiked_posts(List<Post> liked_posts) { this.liked_posts = liked_posts; }

}
