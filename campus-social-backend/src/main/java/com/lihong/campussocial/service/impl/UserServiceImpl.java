package com.lihong.campussocial.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.lihong.campussocial.common.ErrorCode;
import com.lihong.campussocial.exception.BusinessException;
import com.lihong.campussocial.mapper.UserMapper;
import com.lihong.campussocial.model.domain.User;
import com.lihong.campussocial.service.UserService;
import com.lihong.campussocial.constant.UserConstant;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
* @author Hongxia
* @description 针对表【user(用户表)】的数据库操作Service实现
* @createDate 2023-05-03 20:30:54
*/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Resource
    private UserMapper userMapper;

    /**
     * 盐值，用于对密码加密
     */
    public static final String SALT = "labi";


    @Override
    public long userRegister(String userAccount, String userPassword, String checkPassword) {
        //1.校验
        if(StringUtils.isAnyBlank(userAccount,userPassword,checkPassword)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"参数为空");
        }
        if(userAccount.length() < 4){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户账号长度过短");

        }
        if(userPassword.length() < 8 || checkPassword.length() < 8){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户密码长度过短");
        }
        // 账户不能包含特殊字符
        String validPattern = "\\pP|\\pS|\\s+";
        Matcher matcher = Pattern.compile(validPattern).matcher(userAccount);
        if (matcher.find()) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户账号包含特殊字符");
        }
        if(!userPassword.equals(checkPassword)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户密码两次不相等");
        }
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_account",userAccount);
        Long integer = userMapper.selectCount(queryWrapper);
        if(integer > 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户账号已存在");
        }
        //2.对密码加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
        //3.插入数据
        User user = new User();
        user.setUserAccount(userAccount);
        user.setUserPassword(encryptPassword);
        boolean saveResult = this.save(user);
        if(!saveResult){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户信息保存失败");
        }
        return user.getId();
    }

    @Override
    public User userLogin(String userAccount, String userPassword, HttpServletRequest request) {
        //1.校验
        if(StringUtils.isAnyBlank(userAccount,userPassword)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"参数为空");
        }
        if(userAccount.length() < 4){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户账号长度过短");
        }
        if(userPassword.length() < 8 ){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户密码长度过短");
        }
        // 账户不能包含特殊字符
        String validPattern = "\\pP|\\pS|\\s+";
        Matcher matcher = Pattern.compile(validPattern).matcher(userAccount);
        if (matcher.find()) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户账号包含特殊字符");
        }
        // 对密码加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
        //2.检验账号和密码是否匹配
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_account",userAccount);
        queryWrapper.eq("user_password",encryptPassword);
        User user = userMapper.selectOne(queryWrapper);
        if(user == null){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"账号或密码错误");
        }
        //3.用户信息脱敏
        User safetyUser = getSafetyUser(user);
        //4.记录用户登录态
        request.getSession().setAttribute(UserConstant.USER_LOGIN_STATE,safetyUser);
        return safetyUser;

    }

    @Override
    public User getSafetyUser(User loginUser) {
        if(loginUser == null){
            return null;
        }
        User safetyUser = new User();
        safetyUser.setId(loginUser.getId());
        safetyUser.setUsername(loginUser.getUsername());
        safetyUser.setUserAccount(loginUser.getUserAccount());
        safetyUser.setAvatarUrl(loginUser.getAvatarUrl());
        safetyUser.setGender(loginUser.getGender());
        safetyUser.setAge(loginUser.getAge());
        safetyUser.setGrade(loginUser.getGrade());
        safetyUser.setColleage(loginUser.getColleage());
        safetyUser.setMajor(loginUser.getMajor());
        safetyUser.setInterest(loginUser.getInterest());
        safetyUser.setUserStatus(loginUser.getUserStatus());
        safetyUser.setPhone(loginUser.getPhone());
        safetyUser.setContactinfo(loginUser.getContactinfo());
        safetyUser.setCreateTime(loginUser.getCreateTime());
        safetyUser.setUserRole(loginUser.getUserRole());



        return safetyUser;
    }

    @Override
    public int userLogout(HttpServletRequest request) {
        request.getSession().removeAttribute(UserConstant.USER_LOGIN_STATE);
        return 1;
    }

    @Override
    public long userAdd(User user) {
        //1.校验
        if(StringUtils.isAnyBlank(user.getUserAccount(),user.getUserPassword())){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"参数为空");
        }
        if(user.getUserAccount().length() < 4){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户账号长度过短");

        }
        if(user.getUserPassword().length() < 8 ){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户密码长度过短");
        }
        // 账户不能包含特殊字符
        String validPattern = "\\pP|\\pS|\\s+";
        Matcher matcher = Pattern.compile(validPattern).matcher(user.getUserAccount());
        if (matcher.find()) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户账号包含特殊字符");
        }

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_account",user.getUserAccount());
        Long integer = userMapper.selectCount(queryWrapper);
        if(integer > 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户账号已存在");
        }
        //2.设置默认密码
        user.setUserPassword("12345678");
        //3.对密码加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + user.getUserPassword()).getBytes());
        //4.插入数据
        user.setUserPassword(encryptPassword);
        boolean saveResult = this.save(user);
        if(!saveResult){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户信息保存失败");
        }
        return user.getId();
    }
}




