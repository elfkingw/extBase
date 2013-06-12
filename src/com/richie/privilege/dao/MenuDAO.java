package com.richie.privilege.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.richie.framework.dao.BaseDAO;
import com.richie.privilege.domain.CheckMenuTree;
import com.richie.privilege.domain.Menu;
import com.richie.privilege.domain.MenuTree;

@Service
@SuppressWarnings("unchecked")
public class MenuDAO extends BaseDAO {

	public MenuDAO() {
		this.setNamespace("Menu");
	}

	public List<Menu> getPrivilegeMenus(Integer userId) {
		List<Menu> list = this.getSqlMapClientTemplate().queryForList(
				this.getStatementName("getPrivilegeMenu"), userId);
		return list;
	}
	public List<Menu> getTopMenus(Integer userId) {
		List<Menu> list = this.getSqlMapClientTemplate().queryForList(
				this.getStatementName("getTopMenu"), userId);
		return list;
	}
	public List<MenuTree> getChildMenus(Integer userId, String parentId) {
		Map map = new HashMap();
		map.put("userId", userId);
		map.put("parentId",parentId);
		List<MenuTree> list = this.getSqlMapClientTemplate().queryForList(
				this.getStatementName("getChildMenu"), map);
		return list;
	}
	public List<MenuTree> getTreeMenus(String parentId){
		Map map = new HashMap();
		map.put("parentId", parentId);
		return this.getSqlMapClientTemplate().queryForList(this.getStatementName("getTreeMenu"),map);
	}
	
	public List<CheckMenuTree> getCheckTreeMenu(String parentId){
		Map map = new HashMap();
		map.put("parentId", parentId);
		return this.getSqlMapClientTemplate().queryForList(this.getStatementName("getCheckChildMenu"),map);
	}
	
	public List<HashMap> getParentMenus(String name){
		Map map = new HashMap();
		map.put("name", name);
		return this.getSqlMapClientTemplate().queryForList(this.getStatementName("getParentMenu"),map);
	}
	public  void deleteMenuRole(Integer roleId){
		this.getSqlMapClientTemplate().delete(getStatementName("deleteMenuRole"),roleId);
	}
	
}