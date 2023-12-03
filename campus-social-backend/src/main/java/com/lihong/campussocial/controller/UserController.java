package com.lihong.campussocial.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lihong.campussocial.common.BaseResponse;
import com.lihong.campussocial.common.ErrorCode;
import com.lihong.campussocial.common.ResultUtil;
import com.lihong.campussocial.exception.BusinessException;
import com.lihong.campussocial.model.domain.User;
import com.lihong.campussocial.model.domain.request.UserLoginRequest;
import com.lihong.campussocial.model.domain.request.UserRegisterRequest;
import com.lihong.campussocial.service.UserService;
import com.lihong.campussocial.constant.UserConstant;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {
    @Resource
    UserService userService;

    @PostMapping("/register")
    public BaseResponse<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest){
        if(userRegisterRequest == null){
//            return ResultUtil.error(ErrorCode.PARAMS_ERROR);
            throw  new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String userAccount = userRegisterRequest.getUserAccount();
        String userPassword = userRegisterRequest.getUserPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        if(StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)){
            throw  new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long result = userService.userRegister(userAccount, userPassword, checkPassword);
        return ResultUtil.success(result);
    }

    @PostMapping("/login")
    public BaseResponse<User> userLogin(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request){
        if(userLoginRequest == null){
            throw  new BusinessException(ErrorCode.NULL_ERROR);

        }
        String userAccount = userLoginRequest.getUserAccount();
        String userPassword = userLoginRequest.getUserPassword();
        log.info(userAccount);
        log.info(userPassword);
        if(StringUtils.isAnyBlank(userAccount, userPassword)){
            throw  new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.userLogin(userAccount, userPassword, request);
        return ResultUtil.success(user);
    }

    @PostMapping("/logout")
    public BaseResponse<Integer> userLogout(HttpServletRequest request){
        if(request == null){
            throw  new BusinessException(ErrorCode.NULL_ERROR);
        }
        int result = userService.userLogout(request);
        return ResultUtil.success(result);
    }

    @GetMapping("/current")
    public BaseResponse<User> getCurrentUser(HttpServletRequest request){
        Object object = request.getSession().getAttribute(UserConstant.USER_LOGIN_STATE);
        User user = (User) object;
        if(user == null){
            throw  new BusinessException(ErrorCode.NOT_LOGIN);
        }
        //从数据库中获取用户信息，以保证信息的实时性
        Long id = user.getId();
        user = userService.getById(id);
        User safetyUser = userService.getSafetyUser(user);
        return ResultUtil.success(safetyUser);
    }

    @GetMapping("/search/{username}")
    private BaseResponse<List<User>> searchUsers(@PathVariable String username,HttpServletRequest request){
        //仅管理员可查询
        if(!isAdmin(request)){
            throw  new BusinessException(ErrorCode.NO_AUTH);
        }

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        if(StringUtils.isNoneBlank(username)){
            queryWrapper.like("username",username);
        }
        List<User> userList = userService.list(queryWrapper);
        //用户信息脱敏
        List<User> list = userList.stream().map(user -> {
            return userService.getSafetyUser(user);
        }).collect(Collectors.toList());
        return ResultUtil.success(list);
    }

    @GetMapping("/list")
    private BaseResponse<List<User>> listUsers(HttpServletRequest request){
        //仅管理员可查询
        if(!isAdmin(request)){
            throw  new BusinessException(ErrorCode.NO_AUTH);
        }
        List<User> list = userService.list();
        //用户信息脱敏
        List<User> safetyList = list.stream().map(user -> {
            return userService.getSafetyUser(user);
        }).collect(Collectors.toList());
        return ResultUtil.success(safetyList);
    }

    @DeleteMapping("/delete/{id}")
    private BaseResponse<Boolean> deleteUser(@PathVariable long id, HttpServletRequest request){
        //仅管理员可删除
       if(!isAdmin(request)){
           throw  new BusinessException(ErrorCode.NO_AUTH);
       }
       if(id <= 0){
           throw  new BusinessException(ErrorCode.PARAMS_ERROR);
       }
        boolean b = userService.removeById(id);
        return ResultUtil.success(b);
    }

    @PutMapping("/update/{id}")
    private BaseResponse<Boolean> updateUser(@PathVariable long id,@RequestBody User user,HttpServletRequest request){
        //仅管理员可修改
        if(!isAdmin(request)){
            throw  new BusinessException(ErrorCode.NO_AUTH);
        }
        if(id <= 0){
            throw  new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean b = userService.updateById(user);
        return ResultUtil.success(true);
    }

    @PutMapping("/update")
    private BaseResponse<Boolean> updateCurrentUser(@RequestBody User user,HttpServletRequest request){
        User loginUser = (User)request.getSession().getAttribute(UserConstant.USER_LOGIN_STATE);
        if(loginUser == null){
            throw  new BusinessException(ErrorCode.NOT_LOGIN);
        }
        Long id = loginUser.getId();
        if(id <= 0){
            throw  new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        user.setId(id);
        boolean b = userService.updateById(user);
        return ResultUtil.success(true);
    }

    @PostMapping("/add")
    public BaseResponse<Long> addUser(@RequestBody User user,HttpServletRequest request){
        //仅管理员可添加用户
        if(!isAdmin(request)){
            throw  new BusinessException(ErrorCode.NO_AUTH);
        }
        if(StringUtils.isAnyBlank(user.getUserAccount(),user.getUserPassword())){
            throw  new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long result = userService.userAdd(user);
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
