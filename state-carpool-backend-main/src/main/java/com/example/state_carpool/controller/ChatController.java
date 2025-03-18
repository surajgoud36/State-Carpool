package com.example.state_carpool.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.state_carpool.dto.ChatRequest;
import com.example.state_carpool.dto.ChatResponse;
import com.example.state_carpool.dto.FetchChatRequest;
import com.example.state_carpool.dto.FetchChatResponse;
import com.example.state_carpool.service.ChatService;

@RestController
@RequestMapping("/chats")
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	@PostMapping("/chatexists")
	public FetchChatResponse chatExists(@RequestBody FetchChatRequest request) {
		return chatService.chatExists(request);
	}
	
	@GetMapping("/{id}")
	public ChatResponse getChat(@PathVariable Long id) {
		return chatService.fetchChat(id);
	}
	
	@GetMapping
	public List<ChatResponse> getChats() {
		return chatService.fetchChats();
	}
	
	@PostMapping
	public ChatResponse createChat(@RequestBody ChatRequest request) {
		return chatService.createChat(request);
	}
	
	@DeleteMapping("/{id}")
	public void deleteChat(@PathVariable Long id) {
		chatService.deleteChat(id);
	}
}
