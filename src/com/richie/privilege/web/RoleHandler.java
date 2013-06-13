package com.richie.privilege.web;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.web.servlet.ModelAndView;

import com.richie.framework.web.BaseHandler;
import com.richie.privilege.domain.Role;
import com.richie.privilege.service.RoleService;
/**
 * 
 * @author wanghua
 * Mar 11, 201011:20:12 AM
 */
@SuppressWarnings("unchecked")
public class RoleHandler extends BaseHandler{
	private RoleService roleService;
	
	public RoleService getRoleService() {
		return roleService;
	}

	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}

	/**
	 * 角色分页查询
	 *@author wanghua
	 *Mar 11, 20101:24:44 PM
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) {
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
		String roleName = request.getParameter("name");
		Role role = new Role();
		role.setLimit(Integer.valueOf(limit == null?"15":limit));
		role.setStart(Integer.valueOf(start==null?"0":start));
		role.setRoleName(roleName);
		ModelAndView mv = this.getSuccessModelView();
		try {
			List<Role> list  = roleService.list(role);
			int count =  roleService.getCount(role);
			mv.addObject("result",list);
			mv.addObject("total",count);
		} catch (Exception e) {
			mv = this.getErrorModelView();
			logger.error("角色分页查询失败！",e);
			return mv;
		}
		return mv;
	}
	
	public ModelAndView saveOrUpdate(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		Role role = this.formToObject(request);
		try {
			if(role.getId()!=null)
				roleService.update(role);
			else
				roleService.save(role);
		} catch (Exception e) {
			mv = this.getErrorMessageView("角色保存失败");
			logger.error("角色保存失败！",e);
		}
		return mv;
	}
	
	public ModelAndView queryAll(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		try {
			List<Role> list = roleService.query(null);
			mv.addObject("root", list);
		} catch (Exception e) {
			mv = this.getErrorMessageView("获取角色失败");
			logger.error("获取角色失败！",e);
		}
		return mv;
	}
	
	public ModelAndView queryMenuByRole(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		String roleId = request.getParameter("roleId");
		try {
			List<HashMap> list = roleService.queryMenuByRole(Integer.valueOf(roleId!= null?roleId:"0"));
			mv.addObject("root", list);
		} catch (Exception e) {
			mv = this.getErrorMessageView("获取角色失败");
			logger.error("获取角色失败！",e);
		}
		return mv;
	}
	public ModelAndView saveRoleMenu(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		String roleId = request.getParameter("roleId");
		String[] menuIds = request.getParameterValues("menus");
		try {
			roleService.saveMenuRole(Integer.valueOf(roleId), menuIds);
		} catch (Exception e) {
			mv = this.getErrorMessageView("获取角色失败");
			logger.error("获取角色失败！",e);
		}
		return mv;
	}
	
	public ModelAndView delete(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		String id = request.getParameter("id");
		try {
			roleService.delete(Integer.valueOf(id));
		} catch (Exception e) {
			mv = this.getErrorMessageView("角色删除失败");
			logger.error("角色删除失败！",e);
		}
		return mv;
	}
	/**
	 * 
	 *@author wanghua
	 *Mar 12, 201011:00:15 AM
	 * @param request
	 * @return
	 */
	private Role formToObject(HttpServletRequest request){
		Role role = new Role();
		String id = request.getParameter("id");
		if(id !=null && !id.equals("")){
			role.setId(Integer.valueOf(id));
		}
		String roleName = request.getParameter("name");
		if(roleName != null && !roleName.equals("")){
			role.setRoleName(roleName);
		}
		String description = request.getParameter("description");
		if(description != null && !description.equals("")){
			role.setDescription(description);
		}
		String status = request.getParameter("status");
		if(status != null && !status.equals("")){
			role.setStatus(status);
		}
		role.setIsSystem("01");
		role.setCreateTime(new Timestamp(new Date().getTime()));
		return role;
	}
	
	
}
