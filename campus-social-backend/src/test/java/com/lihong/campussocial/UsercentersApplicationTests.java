package com.lihong.campussocial;

import com.lihong.campussocial.service.ChatGPTService;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionResult;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import okhttp3.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class UsercentersApplicationTests {
    @Autowired
    ChatGPTService chatGPTService;

    @Autowired
    OpenAiService openAiService;

    @Test
    void contextLoads() {

    }

    @Test
    void chatGpt() {
        List<ChatMessage> chatMessages = new ArrayList<>();
        chatMessages.add(new ChatMessage("user","你现在使用的是那个模型"));

//        ChatCompletionResult completion = chatGPTService.openAiService().createChatCompletion(
        ChatCompletionResult completion = openAiService.createChatCompletion(
                ChatCompletionRequest.builder()
//                        .user("user")
                        .model("gpt-3.5-turbo")
                        .messages(chatMessages)
                        .build());

        completion.getChoices().forEach(System.out::println);
    }

    public static void main(String[] args) throws IOException {
        String url = "https://api.openai-hk.com/v1/chat/completions";

        OkHttpClient client = new OkHttpClient();

        MediaType mediaType = MediaType.parse("application/json");

        String json = "{\n" +
                "  \"max_tokens\": 1200,\n" +
                "  \"model\": \"gpt-3.5-turbo\",\n" +
                "  \"temperature\": 0.8,\n" +
                "  \"top_p\": 1,\n" +
                "  \"presence_penalty\": 1,\n" +
                "  \"messages\": [\n" +
                "    {\n" +
                "      \"role\": \"system\",\n" +
                "      \"content\": \"You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"role\": \"user\",\n" +
                "      \"content\": \"你是chatGPT多少？\"\n" +
                "    }\n" +
                "  ]\n" +
                "}";

        RequestBody body = RequestBody.create(mediaType, json);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "Bearer hk-an1biz10000065313c2b1e53c8feb77299ec9b39bf8a9f65")
                .build();

        Call call = client.newCall(request);
        Response response = call.execute();
        String result = response.body().string();
        System.out.println(result);
    }

}
