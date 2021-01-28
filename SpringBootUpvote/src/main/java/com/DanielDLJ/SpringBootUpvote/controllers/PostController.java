package com.DanielDLJ.SpringBootUpvote.controllers;


import com.DanielDLJ.SpringBootUpvote.model.Post;
import com.DanielDLJ.SpringBootUpvote.model.PostUser;
import com.DanielDLJ.SpringBootUpvote.model.User;
import com.DanielDLJ.SpringBootUpvote.repository.PostRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostRepository postRepository;

    public PostController(PostRepository postRepository){ this.postRepository = postRepository; }

    @GetMapping
    public Iterable<Post> findAll() { return postRepository.findAll(Sort.by(Sort.Direction.DESC, "date")); };

    @RequestMapping(
            value = "",
            method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Iterable<Post> register(@RequestBody (required=false) PostUser requestData){

        if(requestData == null || requestData.getUser() == null || requestData.getUser().getId() == null)
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "The User id is empty.");
        if(requestData.getPost() == null || requestData.getPost().getContent() == null)
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "The content id is empty.");

        Date date = new Date();
        String newDate = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss").format(date);

        //create
        postRepository.createNewPost(requestData.getUser().getId(),
                requestData.getPost().getContent(),
                newDate);
        //return node
        Iterable<Post> posts = postRepository.findAll(Sort.by(Sort.Direction.DESC, "date"));
        for (Post item : posts) {
            if (item.containsUserIn_liked_users(requestData.getUser().getId())) {
                item.setLoggedUserLiked(true);
            }
            System.out.println(item);
        }
        return posts;
    }

    @RequestMapping(
            value = "/like",
            method = RequestMethod.POST)
    public Optional<Post> likePost(@RequestBody (required=false) PostUser requestData){

        if(requestData == null || requestData.getUser() == null || requestData.getUser().getId() == null)
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "The User id is empty.");
        if(requestData.getPost() == null || requestData.getPost().getId() == null)
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "The Post id is empty.");

        //set relationship
        postRepository.setLikePost(requestData.getUser().getId(), requestData.getPost().getId());
        //return node
        return getPost(requestData);
    }

    private Optional<Post> getPost(@RequestBody(required = false) PostUser requestData) {
        Optional<Post> post = postRepository.findById(requestData.getPost().getId());
        if (post.isPresent()) {
            Post auxPost = post.get();
            auxPost.setLoggedUserLiked(auxPost.containsUserIn_liked_users(requestData.getUser().getId()));
            post = Optional.of(auxPost);
        }
        return post;
    }

    @RequestMapping(
            value = "/dislike",
            method = RequestMethod.POST)
    public Optional<Post> dislikePost(@RequestBody (required=false) PostUser requestData){

        if(requestData == null || requestData.getUser() == null || requestData.getUser().getId() == null)
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "The User id is empty.");
        if(requestData.getPost() == null || requestData.getPost().getId() == null)
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "The Post id is empty.");

        //delete relationship if exists
        postRepository.setDislikePost(requestData.getUser().getId(), requestData.getPost().getId());
        //return node
        return getPost(requestData);
    }

    @RequestMapping(
            value = "/byUser",
            method = RequestMethod.POST)
    public Iterable<Post> findAll(@RequestBody (required=false) User user){

        if(user == null ||  user.getId() == null)
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "The User id is empty.");

        Iterable<Post> posts = postRepository.findAll(Sort.by(Sort.Direction.DESC, "date"));
        for (Post item : posts) {
            if (item.containsUserIn_liked_users(user.getId())) {
                item.setLoggedUserLiked(true);
            }
            System.out.println(item);
        }
        return posts;
    };

}
