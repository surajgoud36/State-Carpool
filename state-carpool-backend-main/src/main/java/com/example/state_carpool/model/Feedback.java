package com.example.state_carpool.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "G2FEEDBACK")
public class Feedback {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private int rating;
	private String text;
	
	@ManyToOne
	@JoinColumn(name = "rider_id")
	private User rider;
	
	public void updateFeedback(Feedback other) {
		setRating(other.getRating());
		setText(other.getText());
		setRider(other.getRider());
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public User getRider() {
		return rider;
	}

	public void setRider(User rider) {
		this.rider = rider;
	}

	public Long getId() {
		return id;
	}

	public Feedback(int rating, String text, User rider) {
		super();
		this.rating = rating;
		this.text = text;
		this.rider = rider;
	}

	public Feedback() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
