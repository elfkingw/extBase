package com.richie.privilege.domain;

import java.sql.Timestamp;

import com.richie.framework.domain.BaseDomain;

/**
 * 
 * @author wanghua Mar 15, 20109:15:15 PM
 */
public class Role extends BaseDomain{
	private Integer id;
	
	private String roleName;

	private String description;

	private String status;

	private String isSystem;

	private Timestamp createTime;
	
	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

}