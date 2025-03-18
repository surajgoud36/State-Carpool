package com.example.state_carpool.dto;

public class MessageRequest {
	private String content;	
	private Long timestamp;
	private Long senderId;
	private Long chatId;
	
	public MessageRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public MessageRequest(String content, Long timestamp, Long senderId, Long chatId) {
		super();
		this.content = content;
		this.timestamp = timestamp;
		this.senderId = senderId;
		this.chatId = chatId;
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
	public Long getSenderId() {
		return senderId;
	}
	public void setSenderId(Long senderId) {
		this.senderId = senderId;
	}
	public Long getChatId() {
		return chatId;
	}
	public void setChatId(Long chatId) {
		this.chatId = chatId;
	}
	@Override
	public String toString() {
		return "MessageRequest [content=" + content + ", timestamp=" + timestamp + ", senderId=" + senderId
				+ ", chatId=" + chatId + "]";
	}
}
