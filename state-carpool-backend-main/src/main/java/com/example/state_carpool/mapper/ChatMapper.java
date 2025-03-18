package com.example.state_carpool.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.state_carpool.dto.ChatRequest;
import com.example.state_carpool.dto.ChatResponse;
import com.example.state_carpool.dto.MessageResponse;
import com.example.state_carpool.model.Chat;
import com.example.state_carpool.model.Message;

@Component
public class ChatMapper {

	public Chat toEntity(ChatRequest request, List<Message> messages) {
		if(request == null)
			return null;
		return new Chat(request.getRiderId(), request.getDriverId(), request.getRideId(), messages);
	}
	
	public ChatResponse toDTO(Chat chat, List<MessageResponse> messageResponses) {
		if(chat == null)
			return null;
		return new ChatResponse(chat.getId(), chat.getRiderId(), chat.getDriverId(), chat.getRideId(), messageResponses);
	}
}
