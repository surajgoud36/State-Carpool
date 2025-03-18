package com.example.state_carpool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.state_carpool.model.Subscription;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long>{
	Subscription findSubscriptionById(Long id);
}
