package com.example.state_carpool.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.state_carpool.model.Feedback;
import com.example.state_carpool.service.FeedbackService;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {

	@Autowired
	private FeedbackService feedbackService;
	
	@GetMapping("/{id}")
	public Feedback getFeedback(@PathVariable Long id) {
		return feedbackService.fetchFeedback(id);
	}
	
	@GetMapping
	public List<Feedback> getAllFeedback() {
		return feedbackService.fetchFeedback();
	}
	
	@PostMapping
	public Feedback addFeedback(@RequestBody Feedback feedback) {
		return feedbackService.saveFeedback(feedback);
	}
	
	@PutMapping("/{id}")
	public Feedback updateFeedback(@RequestBody Feedback feedback, @PathVariable Long id) {
		return feedbackService.updateFeedback(feedback, id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteFeedback(@PathVariable Long id) {
		feedbackService.deleteFeedback(id);
	}
}
