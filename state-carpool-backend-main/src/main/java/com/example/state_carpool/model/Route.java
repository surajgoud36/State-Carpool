package com.example.state_carpool.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.NonNull;

@Entity
@Table(name = "G2ROUTE")
public class Route {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@NonNull
	private String routeType;
	
	@NonNull
	@ManyToMany
	@JoinTable(
		name = "route_destination",
		joinColumns = @JoinColumn(name = "route_id"),
		inverseJoinColumns = @JoinColumn(name = "destination_id"),
		uniqueConstraints = @UniqueConstraint(columnNames = {"route_id", "destination_id"})
	)
	private List<Destination> destinations; 
	
	public Route(@NonNull String routeType, @NonNull List<Destination> destinations) {
		super();
		this.routeType = routeType;
		this.destinations = destinations;
	}

	public Route() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public void addDestination(Destination destination) {
		this.destinations.add(destination);
	}
	
	public void clearDestinations() {
		destinations.clear();
	}

	public String getRouteType() {
		return routeType;
	}

	public void setRouteType(String routeType) {
		this.routeType = routeType;
	}

	public List<Destination> getDestinations() {
		return destinations;
	}

	public void setDestinations(List<Destination> destinations) {
		this.destinations = destinations;
	}

	public Long getId() {
		return id;
	}

}
