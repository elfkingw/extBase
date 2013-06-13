package com.richie.privilege.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.richie.framework.service.BaseService;
import com.richie.privilege.dao.UsersDAO;
import com.richie.privilege.domain.Users;
/**
 * 
 * @author wanghua
 * 2010-2-26下午12:34:05
 */
@Service
@SuppressWarnings("unchecked")
public class UserService extends BaseService {
	@Autowired
	private UsersDAO usersDAO;

	public void setUsersDAO(UsersDAO usersDAO) {
		this.usersDAO = usersDAO;
	}

	/**
	 * 
	 *@author wanghua 2010-2-26下午12:33:48
	 * @param userName
	 * @return
	 */
	public Users getUserByName(String userName) {
		Users user = usersDAO.getUserByName(userName);
		return user;
	}
	
	public Users getUserById(Integer id) {
		Users user = (Users) usersDAO.getObjectById(id);
		return user;
	}
	/**
	 * 保存用户
	 *@author wanghua
	 *Mar 14, 20102:27:59 PM
	 * @param user
	 */
	@Transactional
	public void saveOrUpdateUser(Users user,String[] roleIds){
		List<Map> list = new ArrayList();
		Integer userId ;
		if(user.getId()!=null){
			userId = user.getId();
			usersDAO.deleteUserRole(user.getId());
			usersDAO.update(user);
		}else{
		    userId = (Integer) usersDAO.save(user);
		}
		if(roleIds!=null){
			for(String roleId :roleIds){
				Map map = new HashMap();
				map.put("id", null);
				map.put("roleId",roleId);
				map.put("userId",userId);
				list.add(map);
			}
		}
		usersDAO.saveUserRole(list);
	}
	/**
	 * 修改用户状态
	 *@author wanghua
	 *2010-4-15上午09:41:34
	 * @param user
	 */
	public void updateUser(Users user){
		usersDAO.update(user);
	}
	/**
	 *分页查询 
	 * @author wanghua Mar 11, 20101:20:18 PM
	 * @param map
	 * @return
	 */
	public List<Users> list(final Users user) {
		final List<Users> list = usersDAO.queryForPage(user);
		return list;
	}
	/**
	 * 查询总条数
	 *@author wanghua
	 *Mar 11, 20101:31:00 PM
	 * @param menu
	 * @return
	 */
	public int getCount(Users user){
		return usersDAO.queryCount(user);
	}
	
	public List<HashMap> getRolesByUser(Integer userId){
		return usersDAO.getRoleByUser(userId);
	}
	
	public List<HashMap> getNoRoleByUser(Integer userId){
		return usersDAO.getNoRoleByUser(userId);
	}
	public List<HashMap> getFunctionsByUser(Integer userId){
		return usersDAO.getFunctionsByUser(userId);
	}
	public List<Users> queryAll(){
		return usersDAO.getAllUsers();
	}

}
