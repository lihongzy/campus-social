package com.lihong.campussocial.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lihong.campussocial.common.ErrorCode;
import com.lihong.campussocial.exception.BusinessException;
import com.lihong.campussocial.model.domain.Post;
import com.lihong.campussocial.model.domain.PostThumb;
import com.lihong.campussocial.service.PostService;
import com.lihong.campussocial.service.PostThumbService;
import com.lihong.campussocial.mapper.PostThumbMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
* @author Hongxia
* @description 针对表【post_thumb(帖子点赞记录)】的数据库操作Service实现
* @createDate 2023-05-23 20:51:48
*/
@Service
public class PostThumbServiceImpl extends ServiceImpl<PostThumbMapper, PostThumb>
    implements PostThumbService {

    @Resource
    PostService postService;

    @Override
    public long doThumb(long userId, long postId) {
        //判断帖子是否存在
        Post post = postService.getById(postId);
        if(post == null){
            throw  new BusinessException(ErrorCode.NO_FOUND_ERROR);
        }
        //判断是否已点赞
        synchronized (String.valueOf(userId).intern()){
            return doThumbInner(userId,postId);
        }
    }

    /**
     * 封装了事务方法
     * @param userId
     * @param postId
     * @return
     */
    @Transactional(rollbackFor = Exception.class)
    public int doThumbInner(long userId,long postId){
        PostThumb postThumb = new PostThumb();
        postThumb.setUserid(userId);
        postThumb.setPostid(postId);
        QueryWrapper<PostThumb> wrapper = new QueryWrapper(postThumb);
        long count = this.count(wrapper);
        //已点赞
        if(count > 0){
            boolean result = this.remove(wrapper);
            if(result){
                //帖子点赞数量-1
                postService.update()
                        .eq("id",postId)
//                        .gt("thumb_num",0)
                        .setSql("thumb_num = thumb_num - 1")
                        .update();
                return result ? -1 : 0;
            } else{
                throw  new BusinessException(ErrorCode.SYSTEM_ERROR);
            }
        }else{
            //未点赞
            boolean result = this.save(postThumb);
            if(result){
                //帖子点赞数量+1
                postService.update()
                        .eq("id",postId)
//                        .gt("thumb_num",0)
                        .setSql("thumb_num = thumb_num + 1")
                        .update();
                return result ? 1 : 0;
            } else{
                throw  new BusinessException(ErrorCode.SYSTEM_ERROR);
            }
        }
    }
}




