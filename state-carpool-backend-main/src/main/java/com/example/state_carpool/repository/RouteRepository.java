package com.example.state_carpool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.state_carpool.model.Route;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
	Route findRouteById(Long id);
}
