package com.DanielDLJ.SpringBootUpvote.model;


public class PostUser {
    private User user;
    private Post post;

    public PostUser() {
    }

    public PostUser(User user, Post post) {
        this.user = user;
        this.post = post;
    }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public Post getPost() { return post; }

    public void setPost(Post post) { this.post = post; }
}
