package com.example.state_carpool.dto;

import java.util.Set;

import jakarta.persistence.Lob;

public class UserResponse {
	private Long id;
	private String name;
	private String email;
	private String password;
	private String workplace;
	@Lob
	private byte[] image;
	private Set<String> roles;
	private SubscriptionResponse subscription;
	private AddressResponse address;
	
	public UserResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public UserResponse(Long id, String name, String email, String password, String workplace, byte[] image, Set<String> roles,
			SubscriptionResponse subscription, AddressResponse address) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.workplace = workplace;
		this.image = image;
		this.roles = roles;
		this.subscription = subscription;
		this.address = address;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
	public Set<String> getRoles() {
		return roles;
	}
	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}

	public SubscriptionResponse getSubscription() {
		return subscription;
	}

	public void setSubscription(SubscriptionResponse subscription) {
		this.subscription = subscription;
	}

	public AddressResponse getAddress() {
		return address;
	}

	public void setAddress(AddressResponse address) {
		this.address = address;
	}

	public String getWorkplace() {
		return workplace;
	}

	public void setWorkplace(String workplace) {
		this.workplace = workplace;
	}
	
	
}
