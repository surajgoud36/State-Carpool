package com.example.state_carpool.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.state_carpool.model.Inquiry;
import com.example.state_carpool.service.InquiryService;

@RestController
@RequestMapping("/inquiries")
public class InquiryController {

	@Autowired
	private InquiryService inquiryService;
	
	@GetMapping("/{id}")
	public Inquiry getInquiry(@PathVariable Long id) {
		return inquiryService.fetchInquiry(id);
	}
	
	@GetMapping
	public List<Inquiry> getAllInquiries() {
		return inquiryService.fetchInquiries();
	}
	
	@PostMapping
	public Inquiry addInquiry(Inquiry inquiry) {
		return inquiryService.saveInquiry(inquiry);
	}
	
	@PutMapping("/{id}")
	public Inquiry updateInquiry(@RequestBody Inquiry inquiry, @PathVariable Long id) {
		return inquiryService.updateInquiry(inquiry, id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteInquiry(@PathVariable Long id) {
		inquiryService.deleteInquiry(id);
	}
}
