package com.example.state_carpool.dto;

public class LoginResponse {
    private UserResponse user;
    private boolean success;

    public LoginResponse() {}

    public LoginResponse(UserResponse user, boolean success) {
        this.user = user;
        this.success = success;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
