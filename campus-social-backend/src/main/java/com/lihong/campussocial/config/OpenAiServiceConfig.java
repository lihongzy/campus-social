package com.lihong.campussocial.config;

import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAiServiceConfig {
    @Value("${chatgpt.baseurl}")
    String baseurl;
    @Value("${chatgpt.token}")
    String token;

    @Bean
    public OpenAiService openAiService() {
        return new OpenAiService(token);
    }
}
