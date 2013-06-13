package com.richie.privilege.web;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.web.servlet.ModelAndView;

import com.richie.framework.web.BaseHandler;
import com.richie.privilege.domain.CheckMenuTree;
import com.richie.privilege.domain.Menu;
import com.richie.privilege.domain.MenuTree;
import com.richie.privilege.service.MenuService;
/**
 * 
 * @author wanghua
 * Mar 11, 201011:20:12 AM
 */
public class MenuHandler extends BaseHandler{
	private MenuService menuService;
	
	public void setMenuService(MenuService menuService) {
		this.menuService = menuService;
	}
	/**
	 * 树形菜单获取
	 *@author wanghua
	 *Mar 11, 20101:18:00 PM
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView getTreeMenu(HttpServletRequest request,HttpServletResponse response) {
		String node = request.getParameter("node");
		ModelAndView mv = this.getSuccessModelView();
		try {
			List<MenuTree> list  = menuService.getMenuTree(node);
			JSONArray jsonArr = JSONArray.fromObject(list);
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(jsonArr.toString());
		} catch (Exception e) {
			 mv = this.getErrorModelView();
			 logger.error("获取菜单失败！",e);
			 return mv;
		}
		return null;
	}
	public ModelAndView getCheckTreeMenu(HttpServletRequest request,HttpServletResponse response) {
		String node = request.getParameter("node");
		ModelAndView mv = this.getSuccessModelView();
		try {
			List<CheckMenuTree> list  = menuService.getCheckMenuTree(node);
			JSONArray jsonArr = JSONArray.fromObject(list);
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(jsonArr.toString());
		} catch (Exception e) {
			mv = this.getErrorModelView();
			logger.error("获取菜单失败！",e);
			return mv;
		}
		return null;
	}
	
	/**
	 * 菜单分页查询
	 *@author wanghua
	 *Mar 11, 20101:24:44 PM
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) {
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
		String name = request.getParameter("name");
		String menuId = request.getParameter("menuId");
		String mId  = request.getParameter("mId");
		Menu menu = new Menu();
		menu.setLimit(Integer.valueOf(limit == null?"15":limit));
		menu.setStart(Integer.valueOf(start==null?"0":start));
		menu.setName(name);
		menu.setMenuId(menuId);
		menu.setMId(mId);
		ModelAndView mv = this.getSuccessModelView();
		try {
			List<Menu> list  = menuService.list(menu);
			int count =  menuService.getCount(menu);
			mv.addObject("result",list);
			mv.addObject("total",count);
		} catch (Exception e) {
			mv = this.getErrorModelView();
			logger.error("菜单分页查询失败！",e);
			return mv;
		}
		return mv;
	}
	/**
	 * 获取所有父菜单
	 *@author wanghua
	 *Mar 11, 20109:58:37 PM
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView getParentMenus(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		String name = request.getParameter("query");
		try {
			List<HashMap> list = menuService.getParentMenus(name);
			mv.addObject("root",list);
		} catch (Exception e) {
			mv = this.getErrorModelView();
			logger.error("获取所有父菜单失败！",e);
			return mv;
		}
		return mv;
	}
	
	public ModelAndView saveOrUpdate(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		Menu menu = this.formToObject(request);
		try {
			menuService.saveOrUpdate(menu);
		} catch (Exception e) {
			mv = this.getErrorMessageView("菜单保存失败");
			logger.error("菜单保存失败！",e);
		}
		return mv;
	}
	
	public ModelAndView delete(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		String id = request.getParameter("id");
		try {
			menuService.deleteMenu(Integer.valueOf(id));
		} catch (Exception e) {
			mv = this.getErrorMessageView("菜单删除失败");
			logger.error("菜单删除失败！",e);
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
	private Menu formToObject(HttpServletRequest request){
		Menu menu = new Menu();
		String id = request.getParameter("id");
		if(id != null && !id.equals("")){
			menu.setId(Integer.valueOf(id));
		}
		String name = request.getParameter("name");
		if(name != null && !name.equals("")){
			menu.setName(name);
		}
		String menuId = request.getParameter("menuId");
		if(menuId!=null && !menuId.equals("")){
			menu.setMenuId(menuId);
		}
		String parentMenuId = request.getParameter("parentMenuId");
		if(parentMenuId != null && !parentMenuId.equals("")){
			menu.setParentMenuId(parentMenuId);
		}
		String icon = request.getParameter("icon");
		if(icon != null && !icon.equals("")){
			menu.setIcon(icon);
		}
		String url = request.getParameter("url");
		if(url != null && !url.equals("")){
			menu.setUrl(url);
		}
		String order = request.getParameter("order");
		if(order != null && !order.equals("")){
			menu.setOrder(Integer.valueOf(order));
		}
		String isFunction = request.getParameter("isFunction");
		if(isFunction != null && !isFunction.equals("")){
			menu.setMenuType(isFunction);
		}
		String isLeaf = request.getParameter("isLeaf");
		if(isLeaf != null && !isLeaf.equals("")){
			menu.setIsLeaf(isLeaf);
		}
		String status = request.getParameter("status");
		System.out.println("isLeaf:"+isLeaf);
		System.out.println("isFunaction:"+isFunction);
		System.out.println("status:"+status);
		if(status != null && !status.equals("")){
			menu.setStatus(status);
		}
		String txtDesp = request.getParameter("description");
		if(txtDesp != null && !txtDesp.equals("")){
			menu.setDescription(txtDesp);
		}
		
		menu.setIsSystem("01");
		return menu;
	}
	
	
}
