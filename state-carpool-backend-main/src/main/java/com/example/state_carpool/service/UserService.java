package com.example.state_carpool.service;

import java.util.List;

import com.example.state_carpool.dto.*;
import com.example.state_carpool.model.User;

public interface UserService {
	
	UserResponse createUser(UserRequest request);
	
	UserResponse signup(SignupRequest request);
	
	LoginResponse login(LoginRequest request);
	
	UserResponse subscribe(Long userId, SubscriptionRequest request);
	
	UserResponse renewSubscription(Long userId, SubscriptionRequest request);
	
	UserResponse fetchUser(Long id);
	
	List<UserResponse> fetchUsers();
	
	UserResponse updateUser(UserRequest request, Long id);
	
	User getUser(Long id);
	
	void deleteUser(Long id);	
	
	List<UserResponse> fetchAllRiders();
	
	List<UserResponse> fetchAllAdmins();
	
	List<UserResponse> fetchAllDrivers();
	
	List<UserResponse> fetchAllAvailableDrivers(AvailableDriverRequest request);
}
