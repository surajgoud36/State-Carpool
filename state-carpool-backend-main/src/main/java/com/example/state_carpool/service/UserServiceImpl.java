package com.example.state_carpool.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.state_carpool.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.state_carpool.mapper.UserMapper;
import com.example.state_carpool.model.Address;
import com.example.state_carpool.model.Subscription;
import com.example.state_carpool.model.User;
import com.example.state_carpool.repository.UserRepository;
@Service
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final SubscriptionService subscriptionService;
	private final AddressService addressService;
	private final UserMapper userMapper;
		
	@Autowired
	public UserServiceImpl(UserRepository userRepository, SubscriptionService subscriptionService,
			AddressService addressService, UserMapper userMapper) {
		super();
		this.userRepository = userRepository;
		this.subscriptionService = subscriptionService;
		this.addressService = addressService;
		this.userMapper = userMapper;
	}
	
	@Override
	public User getUser(Long id) {
		return userRepository.findUserById(id);
	}

	@Override
	public UserResponse createUser(UserRequest request) {
		User user = userMapper.toEntity(request, null, null);
		User savedUser = userRepository.save(user);
		return userMapper.toDTO(savedUser, null, null);
	}
	
	@Override
	public UserResponse signup(SignupRequest request) {
		System.out.println(request);
		Set<String> roles = new HashSet<>();
		roles.add(request.getRole());
		
		AddressResponse addressResponse = addressService.saveAddress(request.getAddress());
		Address address = addressService.getAddress(addressResponse.getId());
		
		User newUser = new User(request.getName(), request.getEmail(), request.getPassword(), request.getWorkplace(), null, roles, null, address);
		User savedUser = userRepository.save(newUser);
		return userMapper.toDTO(savedUser, null, addressResponse);
	}

	@Override
	public LoginResponse login(LoginRequest request){
		User user = userRepository.loginUser(request.getEmail(), request.getPassword());
		if(user != null) {
			System.out.println("User found: " +user.getEmail());
			if (user.getRoles().contains(request.getRole())) {
				System.out.println("Role found for user: " + user.getRoles());
				return new LoginResponse(fetchUser(user.getId()), true);
			}
			System.out.println("Invalid role for user: "+user.getEmail());
		} else {
			System.out.println("Failed to login");
		}

		// Login failed
		return new LoginResponse(null, false);
	}
	
	@Override
	public UserResponse subscribe(Long userId, SubscriptionRequest request) {
		User user = userRepository.findUserById(userId);
		
		SubscriptionResponse subscriptionResponse = subscriptionService.createSubscription(request, user);
		Subscription newSubscription = subscriptionService.getSubscription(subscriptionResponse.getId());

		user.setSubscription(newSubscription);
		User savedUser = userRepository.save(user);
		
		AddressResponse addressResponse = addressService.fetchAddress(savedUser.getAddress().getId());
		
		return userMapper.toDTO(savedUser, subscriptionResponse, addressResponse);
	}
	
	@Override
	public UserResponse renewSubscription(Long userId, SubscriptionRequest request) {
		User user = userRepository.findUserById(userId);
		
		SubscriptionResponse subscriptionResponse = subscriptionService.updateSubscription(request, user.getSubscription().getId());
		Subscription updatedSubscription = subscriptionService.getSubscription(subscriptionResponse.getId());
	
		user.setSubscription(updatedSubscription);
		User savedUser = userRepository.save(user);
		
		AddressResponse addressResponse = addressService.fetchAddress(savedUser.getAddress().getId());
		
		return userMapper.toDTO(savedUser, subscriptionResponse, addressResponse);
	}
	
	@Override
	public UserResponse fetchUser(Long id) {
		User user = userRepository.findUserById(id);
		SubscriptionResponse subscriptionResponse = user.getSubscription() != null ? subscriptionService.fetchSubscription(user.getSubscription().getId()) : null;
		AddressResponse addressResponse = user.getAddress() != null ? addressService.fetchAddress(user.getAddress().getId()) : null;
		return userMapper.toDTO(user, subscriptionResponse, addressResponse);
	}

	@Override
	public List<UserResponse> fetchUsers() {
		List<User> users = userRepository.findAll();
		List<UserResponse> userResponses = new ArrayList<>();
		for(User user : users) {
			UserResponse userResponse = fetchUser(user.getId());
			userResponses.add(userResponse);
		}
		return userResponses;
	}

	@Override
	public UserResponse updateUser(UserRequest request, Long id) {
		User existingUser = userRepository.findUserById(id);
		existingUser.setName(request.getName());
		existingUser.setEmail(request.getEmail());
		existingUser.setPassword(request.getPassword());
		existingUser.setWorkplace(request.getWorkplace());
		
		if(request.getImage() != null)
			existingUser.setImage(request.getImage());
		
		AddressResponse addressResponse = addressService.updateAddress(request.getAddress(), existingUser.getAddress().getId());
		Address savedAddress = addressService.getAddress(addressResponse.getId());
		
		existingUser.setAddress(savedAddress);
		User savedUser = userRepository.save(existingUser);
		
		SubscriptionResponse subscriptionResponse = savedUser.getSubscription() != null ? subscriptionService.fetchSubscription(savedUser.getSubscription().getId()) : null;
		
		return userMapper.toDTO(savedUser, subscriptionResponse, addressResponse);
	}

	@Override
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}
	
	@Override
	public List<UserResponse> fetchAllRiders() {
		List<User> drivers = userRepository.fetchAllRiders();
		List<UserResponse> userResponses = new ArrayList<>();
		
		for(User driver : drivers) {
			userResponses.add(fetchUser(driver.getId()));
		}
		return userResponses;
	}
	
	@Override
	public List<UserResponse> fetchAllAdmins() {
		List<User> drivers = userRepository.fetchAllAdmins();
		List<UserResponse> userResponses = new ArrayList<>();
		
		for(User driver : drivers) {
			userResponses.add(fetchUser(driver.getId()));
		}
		return userResponses;
	}
	
	@Override
	public List<UserResponse> fetchAllDrivers() {
		List<User> drivers = userRepository.fetchAllDrivers();
		List<UserResponse> userResponses = new ArrayList<>();
		
		for(User driver : drivers) {
			userResponses.add(fetchUser(driver.getId()));
		}
		return userResponses;
	}
	
	@Override
	public List<UserResponse> fetchAllAvailableDrivers(AvailableDriverRequest request) {
		List<User> drivers = userRepository.fetchAvailableDrivers(request.getDate(), request.getRouteType());
		List<UserResponse> userResponses = new ArrayList<>();
		
		for(User driver : drivers) {
			userResponses.add(fetchUser(driver.getId()));
		}
		return userResponses;
	}

}
