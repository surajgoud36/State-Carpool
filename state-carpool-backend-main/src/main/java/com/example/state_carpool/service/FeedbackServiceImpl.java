package com.example.state_carpool.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.state_carpool.model.Feedback;
import com.example.state_carpool.repository.FeedbackRepository;

@Service
public class FeedbackServiceImpl implements FeedbackService {
	
	@Autowired
	private FeedbackRepository feedbackRepository;
	
	@Override
	public Feedback saveFeedback(Feedback feedback) {
		return feedbackRepository.save(feedback);
	}
	
	@Override
	public Feedback fetchFeedback(Long id) {
		return feedbackRepository.findFeedbackById(id);
	}

	@Override
	public List<Feedback> fetchFeedback() {
		return feedbackRepository.findAll();
	}

	@Override
	public Feedback updateFeedback(Feedback feedback, Long id) {
		Feedback existingFeedback = feedbackRepository.findFeedbackById(id);
		existingFeedback.updateFeedback(feedback);
		return feedbackRepository.save(existingFeedback);
	}

	@Override
	public void deleteFeedback(Long id) {
		feedbackRepository.deleteById(id);
	}

}
