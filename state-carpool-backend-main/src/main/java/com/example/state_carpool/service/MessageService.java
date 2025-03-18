package com.example.state_carpool.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.state_carpool.dto.MessageRequest;
import com.example.state_carpool.dto.MessageResponse;
import com.example.state_carpool.model.Message;

@Service
public interface MessageService {
	MessageResponse createMessage(MessageRequest request);
	
	MessageResponse fetchMessage(Long id);
	
	List<MessageResponse> fetchMessages();
		
	List<Message> fetchChat(Long chatId);
	
	MessageResponse editMessage(MessageRequest request, Long id);
	
	Message getMessage(Long id);
	
	void deleteMessage(Long id);
}
