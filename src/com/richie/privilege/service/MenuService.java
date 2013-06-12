package com.richie.privilege.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.richie.privilege.dao.MenuDAO;
import com.richie.privilege.domain.CheckMenuTree;
import com.richie.privilege.domain.Menu;
import com.richie.privilege.domain.MenuTree;

/**
 * 
 * @author wanghua Mar 11, 201011:19:59 AM
 */
@SuppressWarnings("unchecked")
public class MenuService {
	private MenuDAO menuDAO;

	public void setMenuDAO(MenuDAO menuDAO) {
		this.menuDAO = menuDAO;
	}

	public List<MenuTree> getMenuTree(String parentId) {
		List<MenuTree> list = menuDAO.getTreeMenus(parentId);
		return list;
	}
	public List<CheckMenuTree> getCheckMenuTree(String parentId) {
		List<CheckMenuTree> list = menuDAO.getCheckTreeMenu(parentId);
		return list;
	}

	/**
	 *分页查询 
	 * @author wanghua Mar 11, 20101:20:18 PM
	 * @param map
	 * @return
	 */
	public List<Menu> list(final Menu menu) {
		final List<Menu> list = menuDAO.queryForPage(menu);
		return list;
	}
	/**
	 * 查询总条数
	 *@author wanghua
	 *Mar 11, 20101:31:00 PM
	 * @param menu
	 * @return
	 */
	public int getCount(Menu menu){
		return menuDAO.queryCount(menu);
	}
	
	public List<HashMap> getParentMenus(String name){
		return menuDAO.getParentMenus(name);
	}
	/**
	 * 
	 *@author wanghua
	 *Mar 12, 201011:06:49 AM
	 * @param menu
	 * @return
	 */
	public Integer saveOrUpdate(Menu menu){
		if(menu.getId()!=null){
			return  (Integer) menuDAO.update(menu);
		}else{
			return (Integer) menuDAO.save(menu);
		}
		
	}
	
	/**
	 * 删除菜单
	 *@author wanghua
	 *Mar 14, 201012:11:41 AM
	 * @param id
	 */
	@Transactional
	public void deleteMenu(Integer id){
		menuDAO.deleteMenuRole(id);
		menuDAO.deleteById(id);
	}
	

}
