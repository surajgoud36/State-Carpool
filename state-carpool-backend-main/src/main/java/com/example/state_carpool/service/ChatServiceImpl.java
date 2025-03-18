package com.example.state_carpool.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.state_carpool.dto.ChatRequest;
import com.example.state_carpool.dto.ChatResponse;
import com.example.state_carpool.dto.FetchChatRequest;
import com.example.state_carpool.dto.FetchChatResponse;
import com.example.state_carpool.dto.MessageResponse;
import com.example.state_carpool.mapper.ChatMapper;
import com.example.state_carpool.model.Chat;
import com.example.state_carpool.model.Message;
import com.example.state_carpool.repository.ChatRepository;

@Service
public class ChatServiceImpl implements ChatService {
	
	private final ChatRepository chatRepository;
	private final ChatMapper chatMapper;
	private final MessageService messageService;
	
	@Autowired
	public ChatServiceImpl(ChatRepository chatRepository, ChatMapper chatMapper, MessageService messageService) {
		super();
		this.chatRepository = chatRepository;
		this.chatMapper = chatMapper;
		this.messageService = messageService;
	}
	
	@Override
	public Chat getChat(Long id) {
		return chatRepository.findChatById(id);
	}

	@Override
	public ChatResponse createChat(ChatRequest request) {
		Chat newChat = chatMapper.toEntity(request, new ArrayList<>());
		Chat savedChat = chatRepository.save(newChat);
		return chatMapper.toDTO(savedChat, new ArrayList<>());
	}

	@Override
	public ChatResponse fetchChat(Long id) {
		Chat chat = chatRepository.findChatById(id);
		
		List<Message> messages = chat.getMessages();
		List<MessageResponse> messageResponses = new ArrayList<>();
		for(Message message : messages) {
			messageResponses.add(messageService.fetchMessage(message.getId()));
		}
		return chatMapper.toDTO(chat, messageResponses);
	}

	@Override
	public List<ChatResponse> fetchChats() {
		List<Chat> chats = chatRepository.findAll();
		List<ChatResponse> chatResponses = new ArrayList<>();
		for(Chat chat : chats) {
			chatResponses.add(fetchChat(chat.getId()));
		}
		return chatResponses;
	}

	@Override
	public void deleteChat(Long id) {
		// Delete all messages associated with a chat
		Chat chat = chatRepository.findChatById(id);
		if(!chat.getMessages().isEmpty()) {
			for(Message message : chat.getMessages()) {
				messageService.deleteMessage(message.getId());
			}
		}
		chatRepository.deleteById(id);
	}
	
	// Determines if a chat needs to be created or if there is an existing chat
	@Override 
	public FetchChatResponse chatExists(FetchChatRequest request) {
		Chat chat = chatRepository.chatExists(request.getRiderId(), request.getDriverId(), request.getRideId());
		return chat != null ? new FetchChatResponse(true, chat.getId()) : new FetchChatResponse(false, null);
	}

}
