package com.example.state_carpool.dto;

public class MessageResponse {
	private Long id;
	private String content;	
	private Long timestamp;
	private UserResponse sender;
	private Long chatId;
	
	public MessageResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public MessageResponse(Long id, String content, Long timestamp, UserResponse sender, Long chatId) {
		super();
		this.id = id;
		this.content = content;
		this.timestamp = timestamp;
		this.sender = sender;
		this.chatId = chatId;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Long getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}
	public UserResponse getSender() {
		return sender;
	}
	public void setSender(UserResponse sender) {
		this.sender = sender;
	}
	public Long getChatId() {
		return chatId;
	}
	public void setChatId(Long chatId) {
		this.chatId = chatId;
	}
	
	
}
