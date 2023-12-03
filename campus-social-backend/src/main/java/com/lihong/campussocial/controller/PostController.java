package com.lihong.campussocial.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lihong.campussocial.common.BaseResponse;
import com.lihong.campussocial.common.ErrorCode;
import com.lihong.campussocial.common.ResultUtil;
import com.lihong.campussocial.exception.BusinessException;
import com.lihong.campussocial.model.domain.Post;
import com.lihong.campussocial.model.domain.User;
import com.lihong.campussocial.model.domain.request.PostDoThumbRequest;
import com.lihong.campussocial.service.PostService;
import com.lihong.campussocial.service.PostThumbService;
import com.lihong.campussocial.service.UserService;
import com.lihong.campussocial.constant.UserConstant;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/post")
@Slf4j
public class PostController {
    @Resource
    PostService postService;
    @Resource
    UserService userService;
    @Resource
    PostThumbService postThumbService;

    @GetMapping("/search/{username}")
    private BaseResponse<List<User>> searchPost(@PathVariable String username,HttpServletRequest request){
        return null;
    }

    @GetMapping("/list")
    private BaseResponse<List<Post>> listPost(HttpServletRequest request){
//        //仅管理员可查询
//        if(!isAdmin(request)){
//            throw  new BusinessException(ErrorCode.NO_AUTH);
//        }
        List<Post> list = postService.list();
        return ResultUtil.success(list);
    }

    @GetMapping("/listwithuser")
    private BaseResponse<List<Post>> listPostWithUser(HttpServletRequest request){
        //通过审核显示
        QueryWrapper<Post> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("review_status",1);
        queryWrapper.orderByDesc("create_time");
        List<Post> postList = postService.list(queryWrapper);
        postList.stream().map(post -> {
            User user = userService.getById(post.getUserId());
            post.setUser(user);
            return null;
        }).collect(Collectors.toList());
        return ResultUtil.success(postList);
    }

    @DeleteMapping("/delete/{id}")
    private BaseResponse<Boolean> deletePost(@PathVariable long id, HttpServletRequest request){
        //仅管理员可删除
       if(!isAdmin(request)){
           throw  new BusinessException(ErrorCode.NO_AUTH);
       }
       if(id <= 0){
           throw  new BusinessException(ErrorCode.PARAMS_ERROR);
       }
        boolean b = postService.removeById(id);
        return ResultUtil.success(b);
    }

    @PutMapping("/update")
    private BaseResponse<Boolean> updatePost(@RequestBody Post post,HttpServletRequest request){
        //仅管理员可修改
        if(!isAdmin(request)){
            throw  new BusinessException(ErrorCode.NO_AUTH);
        }
        if(post == null){
            throw  new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        if(post.getId() <= 0){
            throw  new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean b = postService.updateById(post);
        return ResultUtil.success(true);
    }

    @PostMapping("/add")
    public BaseResponse<Long> addPost(@RequestBody Post post,HttpServletRequest request){
        if(post == null){
            throw  new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long result = postService.addPost(post,request);
        return ResultUtil.success(result);
    }

    @PostMapping("/thumb")
    public BaseResponse<Long> postDoThumb(@RequestBody PostDoThumbRequest postDoThumbRequest, HttpServletRequest request){
        if(postDoThumbRequest == null || postDoThumbRequest.getPostId() <= 0){
            throw  new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser =(User) request.getSession().getAttribute(UserConstant.USER_LOGIN_STATE);
        if(loginUser == null){
            throw  new BusinessException(ErrorCode.NOT_LOGIN);
        }
        Long userId = loginUser.getId();
        Long postId = postDoThumbRequest.getPostId();
        long result = postThumbService.doThumb(userId, postId);
        return ResultUtil.success(result);
    }


    /**
     * 是否为管理员
     * @return
     */
    private boolean isAdmin(HttpServletRequest request){
        //仅管理员可查询
        User user =(User) request.getSession().getAttribute(UserConstant.USER_LOGIN_STATE);
        if(user == null || user.getUserRole() != UserConstant.ADMIN_ROLE){
            return false;
        }
        return true;
    }

}
