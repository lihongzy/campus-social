package com.lihong.campussocial.model.domain.request;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserRegisterRequest implements Serializable {
    private static final long serialVersionUID = 3653415149750073652L;

    private String userAccount;
    private String userPassword;
    private String checkPassword;
}
