package com.lihong.campussocial.service;

import com.lihong.campussocial.model.domain.Post;
import org.junit.jupiter.api.Test;

import javax.annotation.Resource;

class PostServiceTest {
    @Resource
    PostService postService;

    @Test
    void testAddPost(){
        Post post = new Post();
        post.setContent("测试发布帖子功能");
        postService.addPost(post,null);
    }

}