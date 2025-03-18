package com.example.state_carpool.dto;

import java.util.Set;

import jakarta.persistence.Lob;

public class UserRequest {
	private String name;
	private String email;
	private String password;
	private String workplace;
	@Lob
	private byte[] image;
	private Set<String> roles;
	private AddressRequest address;
	
	public UserRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserRequest(String name, String email, String password, String workplace, byte[] image, Set<String> roles,
			AddressRequest address) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.workplace = workplace;
		this.image = image;
		this.roles = roles;
		this.address = address;
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

	public AddressRequest getAddress() {
		return address;
	}

	public void setAddress(AddressRequest address) {
		this.address = address;
	}
	
	public String getWorkplace() {
		return workplace;
	}

	public void setWorkplace(String workplace) {
		this.workplace = workplace;
	}

}
