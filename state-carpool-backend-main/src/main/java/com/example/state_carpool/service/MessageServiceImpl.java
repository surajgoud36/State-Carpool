package com.example.state_carpool.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.state_carpool.dto.MessageRequest;
import com.example.state_carpool.dto.MessageResponse;
import com.example.state_carpool.dto.UserResponse;
import com.example.state_carpool.mapper.MessageMapper;
import com.example.state_carpool.model.Chat;
import com.example.state_carpool.model.Message;
import com.example.state_carpool.model.User;
import com.example.state_carpool.repository.ChatRepository;
import com.example.state_carpool.repository.MessageRepository;

@Service
public class MessageServiceImpl implements MessageService {
	
	private final MessageRepository messageRepository;
	private final MessageMapper messageMapper;
	private final UserService userService;
	private final ChatRepository chatRepository;
	
	@Autowired
	public MessageServiceImpl(MessageRepository messageRepository, MessageMapper messageMapper, UserService userService, ChatRepository chatRepository) {
		super();
		this.messageRepository = messageRepository;
		this.messageMapper = messageMapper;
		this.userService = userService;
		this.chatRepository = chatRepository;
	}

	@Override
	public Message getMessage(Long id) {
		return messageRepository.findMessageById(id);
	}
	
	@Override
	public MessageResponse createMessage(MessageRequest request) {
		User sender = userService.getUser(request.getSenderId());
		Chat chat = chatRepository.findChatById(request.getChatId());
		Message newMessage = messageMapper.toEntity(request, sender, chat);
		Message savedMessage = messageRepository.save(newMessage); // FAILING HERE
		chat.addMessage(savedMessage);
		chatRepository.save(chat);
		UserResponse userResponse = userService.fetchUser(savedMessage.getSender().getId());
		return messageMapper.toDTO(savedMessage, userResponse);
	}
	
	@Override
	public MessageResponse fetchMessage(Long id) {
		Message message = messageRepository.findMessageById(id);
		UserResponse userResponse = userService.fetchUser(message.getSender().getId());
		return messageMapper.toDTO(message, userResponse);
	}

	@Override
	public List<MessageResponse> fetchMessages() {
		List<Message> messages = messageRepository.findAll();
		List<MessageResponse> messageResponses = new ArrayList<>();
		for(Message message : messages) {
			messageResponses.add(fetchMessage(message.getId()));
		}
		return messageResponses;
	}
	
	@Override
	public List<Message> fetchChat(Long chatId) {
		return messageRepository.findMessagesChat(chatId);
	}

	@Override
	public MessageResponse editMessage(MessageRequest request, Long id) {
		Message message = messageRepository.findMessageById(id);
		message.setContent(request.getContent());
		Message savedMessage = messageRepository.save(message);
		return messageMapper.toDTO(savedMessage, userService.fetchUser(savedMessage.getSender().getId()));
	}

	@Override
	public void deleteMessage(Long id) {
		messageRepository.deleteById(id);
	}

}
