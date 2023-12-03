package com.lihong.campussocial.service;

import com.lihong.campussocial.model.domain.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserServiceTest {

    @Autowired
    UserService userService;

    @Test
    void testAddUser(){
        User user = new User();
        user.setUsername("labi");
        user.setUserAccount("labi");
        user.setUserPassword("12345678");
        user.setAvatarUrl("");
        user.setPhone("1111");
        user.setGender(0);
        boolean save = userService.save(user);
        Assertions.assertTrue(save);
        System.out.println(user.getId());
    }

    @Test
    void testUserRegister(){
        //检验非空
        String userAccount = "labi";
        String userPassword = "12345678";
        String checkPassword = "";
        long result = userService.userRegister(userAccount, userPassword, checkPassword);
        Assertions.assertEquals(-1,result);
        //检验账号长度不小于4位
        checkPassword = "12345678";
        userAccount = "la";
        result = userService.userRegister(userAccount, userPassword, checkPassword);
        Assertions.assertEquals(-1,result);
        //检验密码长度不小于8位
        userAccount = "labi";
        userPassword = "1234";
        result = userService.userRegister(userAccount, userPassword, checkPassword);
        Assertions.assertEquals(-1,result);
        //检验特殊字符
        userAccount = "la bi";
        userPassword = "12345678";
        result = userService.userRegister(userAccount, userPassword, checkPassword);
        Assertions.assertEquals(-1,result);
        //检验用户账号是否已存在
        result = userService.userRegister(userAccount, userPassword, checkPassword);
        Assertions.assertEquals(-1,result);
        //检验密码与二次密码是否相同
        checkPassword = "87654321";
        result = userService.userRegister(userAccount, userPassword, checkPassword);
        Assertions.assertEquals(-1,result);
        //检验是否插入成功
        userAccount = "labixiaoxin";
        checkPassword = "12345678";
        result = userService.userRegister(userAccount, userPassword, checkPassword);
        Assertions.assertTrue(result > 0);
    }
}