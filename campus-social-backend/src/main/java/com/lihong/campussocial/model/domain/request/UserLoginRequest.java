package com.lihong.campussocial.model.domain.request;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserLoginRequest implements Serializable {
    private static final long serialVersionUID = 7299283250557764255L;
    private String userAccount;
    private String userPassword;
}
