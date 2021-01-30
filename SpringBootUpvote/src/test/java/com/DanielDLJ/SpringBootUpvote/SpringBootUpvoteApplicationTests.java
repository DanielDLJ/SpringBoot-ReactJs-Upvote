package com.DanielDLJ.SpringBootUpvote;

import com.DanielDLJ.SpringBootUpvote.model.Post;
import com.DanielDLJ.SpringBootUpvote.model.User;
import com.DanielDLJ.SpringBootUpvote.repository.PostRepository;
import com.DanielDLJ.SpringBootUpvote.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.server.ResponseStatusException;

import javax.websocket.Session;
import java.util.Optional;
//import org.springframework.util.Assert;

@ExtendWith(SpringExtension.class)
//@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(properties = { "spring.neo4j.uri=bolt://localhost:7688" })
class SpringBootUpvoteApplicationTests {

	@Autowired
	UserRepository userRepository;
	@Autowired
	PostRepository postRepository;

	@Test
	public void shouldAllowUserCreation() {
		User newUser = new User("Ricardo", "12345678910");
		User foundUser =  userRepository.save(newUser);
		Assertions.assertEquals(foundUser.getUsername(), "Ricardo");
	}

	@Test
	public void shouldAllowCreationPost() {
		User newUser = new User("Ricardo", "12345678910");
		User foundUser =  userRepository.save(newUser);

		Post newPost = new Post("Que post", "2012-12-12 14:14:14");
		newPost = postRepository.createNewPost(foundUser.getId(),
				newPost.getContent(),
				newPost.getDate());
		Optional<Post> foundPost = postRepository.findById(newPost.getId());
		Assertions.assertEquals(foundPost.get().getContent(), newPost.getContent());
	}

	@Test
	public void shouldAllowPostLike() {
		User newUser = new User("Beto", "12345678910");
		User foundUser = userRepository.save(newUser);

		Post newPost = new Post("Mega Post", "2013-13-13 13:13:13");
		//Create Post
		newPost = postRepository.createNewPost(foundUser.getId(),
				newPost.getContent(),
				newPost.getDate());

		//Get recorded post
		Optional<Post> foundCreatePost = postRepository.findById(newPost.getId());

		postRepository.setLikePost(foundUser.getId(), foundCreatePost.get().getId());
		foundCreatePost = postRepository.findById(newPost.getId());
		//Check user liked
		Assertions.assertTrue(foundCreatePost.get().getLiked_users()
					.stream()
					.anyMatch(o -> o.getId()
							.equals(foundUser.getId())));
	}

	@Test
	public void shouldAllowPostDisLike() {
		User newUser = new User("Ana", "12345678910");
		User foundUser = userRepository.save(newUser);

		Post newPost = new Post("Mega Post", "2020-20-20 20:20:20");
		//Create Post
		newPost = postRepository.createNewPost(foundUser.getId(),
				newPost.getContent(),
				newPost.getDate());

		//Get recorded post
		Optional<Post> foundCreatePost = postRepository.findById(newPost.getId());

		postRepository.setLikePost(foundUser.getId(), foundCreatePost.get().getId());
		postRepository.setDislikePost(foundUser.getId(), foundCreatePost.get().getId());
		foundCreatePost = postRepository.findById(newPost.getId());
		//Check user liked
		Assertions.assertTrue(foundCreatePost.get().getLiked_users()
				.stream()
				.noneMatch(o -> o.getId()
						.equals(foundUser.getId())));
	}

	//Delete all data of bd
	@AfterAll
	public void deleteAllTestBD(){
		userRepository.deleteAll();
		postRepository.deleteAll();
		Assertions.assertTrue(true);
	}

}
//