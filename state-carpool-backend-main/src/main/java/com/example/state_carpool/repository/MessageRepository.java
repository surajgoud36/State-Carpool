package com.example.state_carpool.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.state_carpool.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
	Message findMessageById(Long id);
	
	@Query(nativeQuery = true, value = "SELECT * FROM G2MESSAGE m where m.chat_id = :chatId order by m.timestamp")
	List<Message> findMessagesChat(@Param("chatId") Long chatId);
}
