package com.lihong.campussocial.service;

import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionResult;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class ChatGPTService {
    @Autowired
    OpenAiService openAiService;

    @Value("${chatgpt.baseurl}")
    String baseurl;
    @Value("${chatgpt.token}")
    String token;

    public OpenAiService openAiService() {
        System.out.println(baseurl);
        System.out.println(token);


        OpenAiService service = new OpenAiService(token);


        return service;

    }

    public ChatCompletionResult chatCompletion(ChatCompletionRequest request){
        ChatCompletionResult chatCompletion = openAiService.createChatCompletion(request);
        return chatCompletion;
    }


}
