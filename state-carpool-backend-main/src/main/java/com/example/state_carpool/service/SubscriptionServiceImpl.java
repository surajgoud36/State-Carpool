package com.example.state_carpool.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.state_carpool.dto.SubscriptionRequest;
import com.example.state_carpool.dto.SubscriptionResponse;
import com.example.state_carpool.mapper.SubscriptionMapper;
import com.example.state_carpool.model.Subscription;
import com.example.state_carpool.model.User;
import com.example.state_carpool.repository.SubscriptionRepository;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {
	
	private final SubscriptionRepository subscriptionRepository;
	private final SubscriptionMapper subscriptionMapper;
	
	@Autowired
	public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository,
			SubscriptionMapper subscriptionMapper) {
		super();
		this.subscriptionRepository = subscriptionRepository;
		this.subscriptionMapper = subscriptionMapper;
	}
	
	@Override 
	public Subscription getSubscription(Long id) {
		return subscriptionRepository.findSubscriptionById(id);
	}

	@Override
	public SubscriptionResponse createSubscription(SubscriptionRequest request, User rider) {		
		Subscription subscription = subscriptionMapper.toEntity(request, rider);
		Subscription savedSubscription = subscriptionRepository.save(subscription);
		
		return subscriptionMapper.toDTO(savedSubscription);
	}

	@Override
	public SubscriptionResponse fetchSubscription(Long id) {
		Subscription subscription = subscriptionRepository.findSubscriptionById(id);
		return subscriptionMapper.toDTO(subscription);
	}

	@Override
	public List<SubscriptionResponse> fetchSubscriptions() {
		return subscriptionRepository.findAll().stream().map(subscriptionMapper::toDTO).collect(Collectors.toList());
	}

	@Override
	public SubscriptionResponse updateSubscription(SubscriptionRequest request, Long id) {
		Subscription existingSubscription = subscriptionRepository.findSubscriptionById(id);
		
		existingSubscription.setAutoPayEnabled(request.isAutoPayEnabled());
		existingSubscription.setEndDate(request.getEndDate());
		Subscription updatedSubscription = subscriptionRepository.save(existingSubscription);
				
		return subscriptionMapper.toDTO(updatedSubscription);
	}
	
	@Override
	public void deleteSubscription(Long id) {
		subscriptionRepository.deleteById(id);
	}

}
