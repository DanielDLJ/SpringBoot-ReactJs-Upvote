package com.DanielDLJ.SpringBootUpvote.repository;


import com.DanielDLJ.SpringBootUpvote.model.Post;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends Neo4jRepository<Post, Long> {

    @Query( " MATCH (user) WHERE ID(user) = $userId " +
            " MERGE (post:Post {content: $content, date: $date }) " +
            " MERGE (user)-[r:wrote]->(post) " +
            " RETURN post ")
    Post createNewPost(@Param("userId") Long userId,
                       @Param("content") String content,
                       @Param("date") String date);


    @Query("  MATCH (user:User) WHERE ID(user) = $userId " +
            " MATCH (post:Post) WHERE ID(post) = $postId " +
            " MERGE (user)-[r:Like]->(post) " +
            " RETURN post ")
    Post setLikePost(@Param("userId") Long userId,
                     @Param("postId") Long postId);

    @Query("  MATCH (user:User) WHERE ID(user) = $userId " +
            " MATCH (post:Post) WHERE ID(post) = $postId " +
            " OPTIONAL MATCH (user)-[r:Like]->(post) " +
            " DELETE r " +
            " RETURN post ")
    Post setDislikePost(@Param("userId") Long userId,
                        @Param("postId") Long postId);
}
