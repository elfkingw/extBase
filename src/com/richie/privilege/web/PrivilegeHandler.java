package com.richie.privilege.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.web.servlet.ModelAndView;

import com.richie.common.Const;
import com.richie.framework.web.BaseHandler;
import com.richie.privilege.domain.Menu;
import com.richie.privilege.domain.MenuTree;
import com.richie.privilege.domain.Users;
import com.richie.privilege.service.PrivilegeService;

public class PrivilegeHandler extends BaseHandler {

	private PrivilegeService privilegeService;

	public void setPrivilegeService(PrivilegeService privilegeService) {
		this.privilegeService = privilegeService;
	}

	public ModelAndView getMenus(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		Users user  = (Users) request.getSession().getAttribute(Const.USER_SESSON);
		List<Menu> list  = privilegeService.getPrivilegeMenus(user.getId());
		mv.addObject("menus", list);
		return mv;
	}
	
	public ModelAndView getTopMenus(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		Users user  = (Users) request.getSession().getAttribute(Const.USER_SESSON);
		List<Menu> list  = privilegeService.getTopMenus(user.getId());
		mv.addObject("menus", list);
		return mv;
	}
	
	public ModelAndView getChildMenus(HttpServletRequest request,HttpServletResponse response) {
		long start = System.currentTimeMillis();
		logger.debug("开始========================");
		String node = request.getParameter("node");
		ModelAndView mv = this.getSuccessModelView();
		Users user  = (Users) request.getSession().getAttribute(Const.USER_SESSON);
		List<MenuTree> list  = privilegeService.getChildMenus(user.getId(),node);
		 JSONArray jsonArr = JSONArray.fromObject(list);
		 try {
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(jsonArr.toString());
		} catch (IOException e) {
			 mv = this.getErrorModelView();
			 e.printStackTrace();
			 return mv;
		}
		logger.debug("结束花时间为"+(System.currentTimeMillis()-start));
		 return null;
	}
}
