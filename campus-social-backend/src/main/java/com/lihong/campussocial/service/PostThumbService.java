package com.lihong.campussocial.service;

import com.lihong.campussocial.model.domain.PostThumb;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author Hongxia
* @description 针对表【post_thumb(帖子点赞记录)】的数据库操作Service
* @createDate 2023-05-23 20:51:48
*/
public interface PostThumbService extends IService<PostThumb> {

    /**
     * 点赞/取消点赞
     * @param userId
     * @param postId
     * @return
     */
    long doThumb(long userId, long postId);

}
