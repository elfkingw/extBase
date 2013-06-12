package com.richie.privilege.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.richie.privilege.dao.RoleDAO;
import com.richie.privilege.domain.Role;

/**
 * 
 * @author wanghua Mar 15, 20109:32:17 PM
 */
@SuppressWarnings("unchecked")
public class RoleService {

	private RoleDAO roleDAO;

	public void setRoleDAO(RoleDAO roleDAO) {
		this.roleDAO = roleDAO;
	}

	/**
	 * 
	 * @author wanghua Mar 15, 20109:34:31 PM
	 * @param role
	 * @return
	 */
	public List<Role> list(Role role) {
		return roleDAO.queryForPage(role);
	}

	/**
	 * 
	 * @author wanghua Mar 15, 20109:35:02 PM
	 * @param role
	 */
	public void update(Role role) {
		roleDAO.update(role);
	}
	/**
	 * 
	 * @author wanghua Mar 15, 20109:35:02 PM
	 * @param id
	 */
	@Transactional
	public void delete(Integer id) {
		roleDAO.deleteById(id);
		roleDAO.deleteRoleUser(id);
	}
	/**
	 * 
	 * @author wanghua Mar 15, 20109:35:23 PM
	 * @param role
	 */
	public void save(Role role) {
		roleDAO.save(role);
	}

	/**
	 * 
	 * @author wanghua Mar 15, 20109:37:04 PM
	 * @param role
	 * @return
	 */
	public Integer getCount(Role role) {
		return roleDAO.queryCount(role);
	}
	/**
	 * 
	 * @author wanghua Mar 15, 20109:37:04 PM
	 * @param role
	 * @return
	 */
	public List<Role> query(Role role) {
		return roleDAO.queryForCondition(role);
	}
	
	public List<HashMap> queryMenuByRole(Integer roleId) {
		return roleDAO.queryMenuByRole(roleId);
	}
	@Transactional
	public void saveMenuRole(Integer roleId,String[] menuIds){
		roleDAO.deleteRoleMenu(roleId);
		List<Map> list = new ArrayList();
		if(menuIds == null)
			return;
		for(String menuId : menuIds){
			HashMap map = new HashMap();
			map.put("menuId", Integer.valueOf(menuId));
			map.put("roleId", roleId);
			map.put("id", "");
			list.add(map);
		}
		roleDAO.saveMenuRole(list);
	}
	
}
