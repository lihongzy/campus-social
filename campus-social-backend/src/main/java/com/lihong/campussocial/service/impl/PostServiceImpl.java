package com.lihong.campussocial.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lihong.campussocial.common.ErrorCode;
import com.lihong.campussocial.exception.BusinessException;
import com.lihong.campussocial.mapper.PostMapper;
import com.lihong.campussocial.model.domain.Post;
import com.lihong.campussocial.model.domain.User;
import com.lihong.campussocial.service.PostService;
import com.lihong.campussocial.constant.UserConstant;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class PostServiceImpl  extends ServiceImpl<PostMapper, Post> implements PostService {

    /**
     * 不雅词汇数组
     */
    private static final String[] PROFANITY_WORDS = {
            "操你妈",
            "滚你妈",
            "吃屎",
            "去死",
            "鸡巴",

    };

    @Override
    public Long addPost(Post post, HttpServletRequest request) {
        if(post == null){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        //检查用户是否登录
        User loginUser = (User)request.getSession().getAttribute(UserConstant.USER_LOGIN_STATE);
        if(loginUser == null){
            throw new BusinessException(ErrorCode.NOT_LOGIN,"请先登录");
        }
        post.setUserId(loginUser.getId());
        //检查帖子是否合法
        validPost(post);
        //保存帖子
        boolean saveResult = this.save(post);
        if(!saveResult){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"帖子信息保存失败");
        }
        return post.getId();
    }

    @Override
    public void validPost(Post post) {
        String content = post.getContent();
        if(StringUtils.isAnyBlank(post.getContent())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"帖子内容不能为空");
        }
        if(content.length() > 8192){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"帖子内容过长");
        }
        if(containsProfanity(content)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"请文明发言");
        }
    }

    /**
     * 检测是否包含不文明词汇
     * @param content
     * @return
     */
    public static boolean containsProfanity(String content) {
        for (String word : PROFANITY_WORDS) {
            if (content.toLowerCase().contains(word)) {
                return true;
            }
        }
        return false;
    }
}
