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

import com.example.state_carpool.dto.AvailableDriverRequest;
import com.example.state_carpool.dto.LoginRequest;
import com.example.state_carpool.dto.LoginResponse;
import com.example.state_carpool.dto.SignupRequest;
import com.example.state_carpool.dto.SubscriptionRequest;
import com.example.state_carpool.dto.UserRequest;
import com.example.state_carpool.dto.UserResponse;
import com.example.state_carpool.service.UserService;
@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/{id}")
	public UserResponse getUser(@PathVariable Long id) {
		return userService.fetchUser(id);
	}
	
	@GetMapping
	public List<UserResponse> getAllUsers(){
		return userService.fetchUsers();
	}
	
	@GetMapping("/riders")
	public List<UserResponse> getAllRiders() {
		return userService.fetchAllRiders();
	}
	
	@GetMapping("/admins")
	public List<UserResponse> getAllAdmins() {
		return userService.fetchAllAdmins();
	}
	
	@GetMapping("/drivers")
	public List<UserResponse> getAllDrivers() {
		return userService.fetchAllDrivers();
	}
	
	@PostMapping("/availabledrivers")
	public List<UserResponse> getAllAvailableDrivers(@RequestBody AvailableDriverRequest request) {
		return userService.fetchAllAvailableDrivers(request);
	}
	
	@PostMapping
	public UserResponse addUser(@RequestBody UserRequest user) {
		return userService.createUser(user);
	}

	@PostMapping("/signup")
	public UserResponse signup(@RequestBody SignupRequest request) {
		System.out.println("Received SignupRequest: " + request);
		return userService.signup(request);
	}

	@PostMapping("/login")
	public LoginResponse login(@RequestBody LoginRequest request) {
		return userService.login(request);
	}
	
	@PostMapping("/{id}/subscribe")
	public UserResponse subscribe(@PathVariable Long id, @RequestBody SubscriptionRequest request) {
		return userService.subscribe(id, request);
	}
	
	@PutMapping("/{id}/renewsubscription")
	public UserResponse renewSubscription(@PathVariable Long id, @RequestBody SubscriptionRequest request) {
		return userService.renewSubscription(id, request);
	}
	
	@PutMapping("/{id}")
	public UserResponse updateUser(@RequestBody UserRequest user, @PathVariable Long id) {
		return userService.updateUser(user, id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
	}
}
