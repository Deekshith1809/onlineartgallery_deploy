package com.fsad.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fsad.springboot.model.Userdata;
import com.fsad.springboot.service.UserdataService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5175", allowCredentials = "true")
public class UserController 
{
	@Autowired
	private UserdataService userdataService;
	
	@PostMapping("/register")
	public String adduser(@RequestBody Userdata u)
	{
//		Userdata u=new Userdata();
//		u.setFirstName(data.get("firstName").asText());
//		u.setLastName(data.get("lastName").asText());
//		u.setFullName(data.get("fullName").asText());
//		u.setEmail(data.get("email").asText());
//		u.setPassword(data.get("password").asText());
//		u.setPhone(data.get("phone").asText());
//		u.setAddress(data.get("address").asText());
//		u.setCity(data.get("city").asText());
//		u.setState(data.get("state").asText());
//		u.setZipCode(data.get("zipCode").asText());
//		u.setCountry(data.get("country").asText());
		userdataService.signupuser(u);
		return "Succes";
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginuser(@RequestBody JsonNode data)
	{
		try {
			String email=data.get("email").asText();
			String pwd=data.get("password").asText();
			
			if (email == null || email.isEmpty() || pwd == null || pwd.isEmpty()) {
				return ResponseEntity.badRequest().body("{\"error\": \"Email and password are required\"}");
			}
			
			Userdata u=userdataService.userlogin(email, pwd);
			
			if (u == null) {
				return ResponseEntity.status(401).body("{\"error\": \"Invalid email or password\"}");
			}
			
			return ResponseEntity.ok(u);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("{\"error\": \"" + e.getMessage() + "\"}");
		}
	}
	
	
}
