package com.lihong.campussocial.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.lihong.campussocial.model.domain.User;

import javax.servlet.http.HttpServletRequest;

/**
* @author Hongxia
* @description 针对表【user(用户表)】的数据库操作Service
* @createDate 2023-05-03 20:30:54
*/
public interface UserService extends IService<User> {
    /**
     * 用户注册
     * @param userAccount 用户账号
     * @param userPassword 用户密码
     * @param checkPassword 校验密码
     * @return 用户id
     */
    long userRegister(String userAccount,String userPassword,String checkPassword);

    /**
     * 用户登录
     * @param userAccount 用户账号
     * @param userPassword 用户密码
     * @param request
     * @return 用户信息
     */
    User userLogin(String userAccount, String userPassword, HttpServletRequest request);

    /**
     * 用户信息脱敏
     * @param loginUser
     * @return
     */
    User getSafetyUser(User loginUser);

    /**
     * 用户注销
     * @return
     */
    int userLogout(HttpServletRequest request);

    /**
     * 添加用户（管理员）
     * @param user
     * @return
     */
    long userAdd(User user);
}
