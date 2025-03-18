package com.example.state_carpool.service;

import java.util.List;

import com.example.state_carpool.model.Inquiry;

public interface InquiryService {
	Inquiry saveInquiry(Inquiry inquiry);
	
	Inquiry fetchInquiry(Long id);
	
	List<Inquiry> fetchInquiries();
	
	Inquiry updateInquiry(Inquiry inquiry, Long id);
	
	void deleteInquiry(Long id);
}
