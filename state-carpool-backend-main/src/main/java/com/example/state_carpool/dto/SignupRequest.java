package com.example.state_carpool.dto;

public class SignupRequest {
	private String name;
	private String email;
	private String password;
	private String workplace;
	private String role;
	private AddressRequest address;
	
	
	public SignupRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SignupRequest(String name, String email, String password, String workplace, String role, AddressRequest addressRequest) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.workplace = workplace;
		this.role = role;
		this.address = addressRequest;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public AddressRequest getAddress() {
		return address;
	}

	public void setAddress(AddressRequest addressRequest) {
		this.address = addressRequest;
	}

	public String getWorkplace() {
		return workplace;
	}

	public void setWorkplace(String workplace) {
		this.workplace = workplace;
	}

	@Override
	public String toString() {
		return "SignupRequest{" +
				"name='" + name + '\'' +
				", email='" + email + '\'' +
				", password='" + password + '\'' +
				", workplace='" + workplace + '\'' +
				", role='" + role + '\'' +
				", address=" + address +
				'}';
	}
}
