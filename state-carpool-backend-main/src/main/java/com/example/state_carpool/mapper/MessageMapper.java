package com.example.state_carpool.mapper;

import org.springframework.stereotype.Component;

import com.example.state_carpool.dto.MessageRequest;
import com.example.state_carpool.dto.MessageResponse;
import com.example.state_carpool.dto.UserResponse;
import com.example.state_carpool.model.Chat;
import com.example.state_carpool.model.Message;
import com.example.state_carpool.model.User;

@Component
public class MessageMapper {
	
	public Message toEntity(MessageRequest request, User sender, Chat chat) {
		if(request == null)
			return null;
		return new Message(request.getContent(), request.getTimestamp(), sender, chat);
	}
	
	public MessageResponse toDTO(Message message, UserResponse senderResponse) {
		if(message == null)
			return null;
		return new MessageResponse(message.getId(), message.getContent(), message.getTimestamp(), senderResponse, message.getChat().getId());
	}
}
