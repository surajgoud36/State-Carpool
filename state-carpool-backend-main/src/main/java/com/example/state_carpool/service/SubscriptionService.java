package com.example.state_carpool.service;

import java.util.List;

import com.example.state_carpool.dto.SubscriptionRequest;
import com.example.state_carpool.dto.SubscriptionResponse;
import com.example.state_carpool.model.Subscription;
import com.example.state_carpool.model.User;

public interface SubscriptionService {
	SubscriptionResponse createSubscription(SubscriptionRequest request, User rider);
	
	Subscription getSubscription(Long id);
	
	SubscriptionResponse fetchSubscription(Long id);
	
	List<SubscriptionResponse> fetchSubscriptions();
	
	SubscriptionResponse updateSubscription(SubscriptionRequest request, Long id);
	
	void deleteSubscription(Long id);
}
