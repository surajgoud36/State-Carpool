package com.example.state_carpool.mapper;

import org.springframework.stereotype.Component;

import com.example.state_carpool.dto.SubscriptionRequest;
import com.example.state_carpool.dto.SubscriptionResponse;
import com.example.state_carpool.model.Subscription;
import com.example.state_carpool.model.User;
import com.example.state_carpool.repository.UserRepository;

@Component
public class SubscriptionMapper {
	
	public Subscription toEntity(SubscriptionRequest request, User rider) {
		if(request == null)
			return null;
		return new Subscription(request.isAutoPayEnabled(), request.getEndDate(), rider);
	}
	
	public SubscriptionResponse toDTO(Subscription subscription) {
		if(subscription == null)
			return null;
		return new SubscriptionResponse(subscription.getId(), subscription.isAutoPayEnabled(), subscription.getEndDate(), subscription.getRider().getId());
	}
}
