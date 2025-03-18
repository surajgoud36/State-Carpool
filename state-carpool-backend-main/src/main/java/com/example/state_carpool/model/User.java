package com.example.state_carpool.model;

import java.util.Arrays;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.NonNull;


@Entity
@Table(name = "G2USER")
public class User {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private Long id;
	    // Name of the user
		
		@NonNull
	    private String name;
	    // Email address of the user
		
		@NonNull
	    private String email;
		
		@NonNull
	    private String password;
		
		private String workplace;
		
		@Lob
		private byte[] image;
	    
		@NonNull
	    private Set<String> roles;
	    
	    // Null for non-riders
	    @OneToOne(mappedBy = "rider", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	    @JoinColumn(name = "subscription_id", nullable = true)
	    @JsonIgnoreProperties("rider")
	    private Subscription subscription;
	    
	    // Null for non-riders
	    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	    @JoinColumn(name = "address_id")
	    private Address address;

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public Set<String> getRoles() {
			return roles;
		}

		public void setRoles(Set<String> roles) {
			this.roles = roles;
		}

		public Subscription getSubscription() {
			return subscription;
		}

		public void setSubscription(Subscription subscription) {
			this.subscription = subscription;
			if(subscription != null)
				subscription.setRider(this);
		}

		public Address getAddress() {
			return address;
		}

		public void setAddress(Address address) {
			this.address = address;
		}

		public Long getId() {
			return id;
		}

		public byte[] getImage() {
			return image;
		}

		public void setImage(byte[] image) {
			this.image = image;
		}

		public User(@NonNull String name, @NonNull String email, @NonNull String password, String workplace, byte[] image,
				@NonNull Set<String> roles, Subscription subscription, Address address) {
			super();
			this.name = name;
			this.email = email;
			this.password = password;
			this.workplace = workplace;
			this.image = image;
			this.roles = roles;
			this.subscription = subscription;
			this.address = address;
		}

		public User() {
			super();
			// TODO Auto-generated constructor stub
		}

		@Override
		public String toString() {
			return "User [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", image="
					+ Arrays.toString(image) + ", roles=" + roles + ", address="
					+ address + "]";
		}

		public String getWorkplace() {
			return workplace;
		}

		public void setWorkplace(String workplace) {
			this.workplace = workplace;
		}
	    
}
