package com.example.state_carpool.dto;

public class FetchChatResponse {
	private boolean exists;
	private Long id;

	public FetchChatResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public FetchChatResponse(boolean exists, Long id) {
		super();
		this.exists = exists;
		this.id = id;
	}

	public boolean isExists() {
		return exists;
	}

	public void setExists(boolean exists) {
		this.exists = exists;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
}
