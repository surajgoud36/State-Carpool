package com.example.state_carpool.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.state_carpool.model.Inquiry;
import com.example.state_carpool.repository.InquiryRepository;

@Service
public class InquiryServiceImpl implements InquiryService{
	
	@Autowired
	private InquiryRepository inquiryRepository;
	
	@Override
	public Inquiry saveInquiry(Inquiry inquiry) {
		return inquiryRepository.save(inquiry);
	}
	
	@Override 
	public Inquiry fetchInquiry(Long id) {
		return inquiryRepository.findInquiryById(id);
	}

	@Override
	public List<Inquiry> fetchInquiries() {
		return inquiryRepository.findAll();
	}

	@Override
	public Inquiry updateInquiry(Inquiry inquiry, Long id) {
		Inquiry existingInquiry = inquiryRepository.findInquiryById(id);
		existingInquiry.updateInquiry(inquiry);
		return inquiryRepository.save(existingInquiry);
	}

	@Override
	public void deleteInquiry(Long id) {
		inquiryRepository.deleteById(id);
	}

}
