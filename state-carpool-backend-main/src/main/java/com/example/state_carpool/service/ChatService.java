package com.example.state_carpool.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.state_carpool.dto.ChatRequest;
import com.example.state_carpool.dto.ChatResponse;
import com.example.state_carpool.dto.FetchChatRequest;
import com.example.state_carpool.dto.FetchChatResponse;
import com.example.state_carpool.model.Chat;

@Service
public interface ChatService {

	Chat getChat(Long id);
	
	ChatResponse createChat(ChatRequest request);
	
	ChatResponse fetchChat(Long id);
	
	List<ChatResponse> fetchChats();
	
	FetchChatResponse chatExists(FetchChatRequest request);
	
	void deleteChat(Long id);
}
