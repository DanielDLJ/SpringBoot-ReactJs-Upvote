package com.DanielDLJ.SpringBootUpvote.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.List;

@Node
public class Post {
    @Id
    @GeneratedValue
    private Long id;

    private String content = "";
    private String date = "";


    @Relationship(type = "Like", direction = Relationship.Direction.INCOMING)
    @JsonIgnoreProperties("liked_posts")
    private List<User> liked_users = new ArrayList<>();

    public Post() {
    }

    public Post(String content, String date) {
        this.content = content;
        this.date = date;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getContent() { return content; }

    public void setContent(String content) { this.content = content; }

    public String getDate() { return date; }

    public void setDate(String date) { this.date = date; }

    public List<User> getLiked_users() { return liked_users; }

    public void setLiked_users(List<User> liked_users) { this.liked_users = liked_users; }
}

