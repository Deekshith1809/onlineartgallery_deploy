package com.fsad.springboot.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Userdata 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userid;
	
	private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    
    public Userdata() {}
    
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
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
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	@Override
	public String toString() {
		return "Userdata [userid=" + userid + ", firstName=" + firstName + ", lastName=" + lastName + ", fullName="
				+ fullName + ", email=" + email + ", password=" + password + ", phone=" + phone + ", address=" + address
				+ ", city=" + city + ", state=" + state + ", zipCode=" + zipCode + ", country=" + country + "]";
	}

}
