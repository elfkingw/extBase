package com.richie.privilege.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.richie.privilege.dao.MenuDAO;
import com.richie.privilege.domain.Menu;
import com.richie.privilege.domain.MenuTree;

public class PrivilegeService {
	@Autowired
	private MenuDAO menuDAO;

	public void setMenuDAO(MenuDAO menuDAO) {
		this.menuDAO = menuDAO;
	}
	
	public List<Menu> getPrivilegeMenus(Integer userId){
		List<Menu> list = menuDAO.getPrivilegeMenus(userId);
		return list;
	}
	
	public List<Menu> getTopMenus(Integer userId){
		List<Menu> list = menuDAO.getTopMenus(userId);
		return list;
	}
	
	public List<MenuTree> getChildMenus(Integer userId,String parentId){
		List<MenuTree> list = menuDAO.getChildMenus(userId, parentId);
		return list;
	}
}
