package com.richie.privilege.domain;

import java.sql.Timestamp;
import java.util.Date;

import com.richie.framework.domain.BaseDomain;

public class Users extends BaseDomain{

	private Integer id;

	private String userName;

	private String cnname;

	private String password;

	private String stationCode;

	private String stationPwd;

	private String defaultSkill;

	private String sex;

	private Timestamp birthday;
	
	private String email;

	private String cell;

	private Date createTime;

	private Date lastLoginTime;

	private String status;
	
	private String isSystem;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getCnname() {
		return cnname;
	}

	public void setCnname(String cnname) {
		this.cnname = cnname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getStationCode() {
		return stationCode;
	}

	public void setStationCode(String stationCode) {
		this.stationCode = stationCode;
	}

	public String getStationPwd() {
		return stationPwd;
	}

	public void setStationPwd(String stationPwd) {
		this.stationPwd = stationPwd;
	}

	public String getDefaultSkill() {
		return defaultSkill;
	}

	public void setDefaultSkill(String defaultSkill) {
		this.defaultSkill = defaultSkill;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}


	public Timestamp getBirthday() {
		return birthday;
	}

	public void setBirthday(Timestamp birthday) {
		this.birthday = birthday;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCell() {
		return cell;
	}

	public void setCell(String cell) {
		this.cell = cell;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getIsSystem() {
		return isSystem;
	}

	public void setIsSystem(String isSystem) {
		this.isSystem = isSystem;
	}

}