package com.lihong.campussocial;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.lihong.campussocial.mapper")
public class CampusSocialApplication {

    public static void main(String[] args) {
        SpringApplication.run(CampusSocialApplication.class, args);
    }

}
