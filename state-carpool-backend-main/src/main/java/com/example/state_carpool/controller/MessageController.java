package com.example.state_carpool.controller;

import java.io.Console;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.state_carpool.dto.MessageRequest;
import com.example.state_carpool.dto.MessageResponse;
import com.example.state_carpool.service.MessageService;

@RestController
@RequestMapping("/messages")
public class MessageController {
	
	@Autowired
	private MessageService messageService;
	
	@GetMapping("/{id}")
	public MessageResponse getMessage(@PathVariable Long id) {
		return messageService.fetchMessage(id);
	}
	
	@GetMapping
	public List<MessageResponse> getAllMessages() {
		return messageService.fetchMessages();
	}
	
	@MessageMapping("/newmessage")
	@SendTo("/topic/messages")
	public MessageResponse addMessage(MessageRequest message) {
		return messageService.createMessage(message);
	}
	
	@PutMapping("/{id}")
	public MessageResponse updateMessage(@RequestBody MessageRequest message, @PathVariable Long id) {
		return messageService.editMessage(message, id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteMessage(@PathVariable Long id) {
		messageService.deleteMessage(id);
	}
}
