package com.example.state_carpool.service;

import java.util.List;

import com.example.state_carpool.model.Feedback;

public interface FeedbackService {
	
	Feedback saveFeedback(Feedback feedback);
	
	Feedback fetchFeedback(Long id);
	
	List<Feedback> fetchFeedback();
	
	Feedback updateFeedback(Feedback feedback, Long id);
	
	void deleteFeedback(Long id);
}
