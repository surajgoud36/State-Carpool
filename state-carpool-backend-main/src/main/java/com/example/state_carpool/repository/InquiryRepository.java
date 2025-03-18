package com.example.state_carpool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.state_carpool.model.Inquiry;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
	Inquiry findInquiryById(Long id);
}
