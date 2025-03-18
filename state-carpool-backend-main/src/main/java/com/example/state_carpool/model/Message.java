
package com.example.state_carpool.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.NonNull;

@Entity
@Table(name = "G2MESSAGE")
public class Message {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NonNull
	private String content;
	
	@NonNull
	private Long timestamp;
	
	@NonNull
	@ManyToOne
	@JoinColumn(name = "sender_id")
	private User sender;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "chat_id", nullable = false)
	@JsonIgnoreProperties("messages")
	private Chat chat;

	public Message() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Message(String content, Long timestamp, User sender, Chat chat) {
		super();
		this.content = content;
		this.timestamp = timestamp;
		this.sender = sender;
		this.chat = chat;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public Long getId() {
		return id;
	}

	public Long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}
	

	public Chat getChat() {
		return chat;
	}

	public void setChat(Chat chat) {
		this.chat = chat;
	}

	@Override
	public String toString() {
		return "Message [id=" + id + ", content=" + content + ", sender=" + sender + "]";
	}
	
}
