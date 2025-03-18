package com.example.state_carpool.mapper;

import org.springframework.stereotype.Component;

import com.example.state_carpool.dto.AddressResponse;
import com.example.state_carpool.dto.SubscriptionResponse;
import com.example.state_carpool.dto.UserRequest;
import com.example.state_carpool.dto.UserResponse;
import com.example.state_carpool.model.Address;
import com.example.state_carpool.model.Subscription;
import com.example.state_carpool.model.User;

@Component
public class UserMapper {
	
	public User toEntity(UserRequest request, Subscription subscription, Address address) {
		if(request == null)
			return null;
		return new User(request.getName(), request.getEmail(), request.getPassword(), request.getWorkplace(), request.getImage(), request.getRoles(), subscription, address);
	}
	
	public UserResponse toDTO(User user, SubscriptionResponse subscriptionResponse, AddressResponse addressResponse) {
		if(user == null)
			return null;
		return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getWorkplace(), user.getImage(), user.getRoles(), subscriptionResponse, addressResponse);
	}
}
