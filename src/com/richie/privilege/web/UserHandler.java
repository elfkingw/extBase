package com.richie.privilege.web; 



import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.richie.common.Const;
import com.richie.common.domain.DicType;
import com.richie.common.domain.Dictionary;
import com.richie.common.domain.HomeConfig;
import com.richie.common.service.DictionaryService;
import com.richie.common.service.HomeConfigService;
import com.richie.framework.DateUtils;
import com.richie.framework.service.SaveLogThread;
import com.richie.framework.web.BaseHandler;
import com.richie.privilege.domain.Users;
import com.richie.privilege.service.UserService;
/**
 * 
 * @author wanghua
 * Mar 16, 201011:09:19 PM
 */
@SuppressWarnings("unchecked")
public class UserHandler extends BaseHandler{
	private UserService userService;
	
	private DictionaryService dictionaryService;
	
	private HomeConfigService homeConfigService;
	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public ModelAndView login(HttpServletRequest request, HttpServletResponse response) {
		String userName = request.getParameter("username");
		String password = request.getParameter("password");
		Users user =userService.getUserByName(userName);
		ModelAndView mv = null;
		SaveLogThread saveLogThread1 = new SaveLogThread();
		saveLogThread1.start();
		if(user!= null && user.getPassword().equals(password)){
			if(user.getStatus().equals("02")){
				mv = this.getErrorModelView();
				mv.addObject("error","该用户被禁用，请与管理员联系！");
			}else{
				mv = this.getSuccessModelView();
				request.getSession().setAttribute(Const.USER_SESSON, user);
			}
		}else{
			mv = this.getErrorModelView();
			mv.addObject("error","用户名密码错误！");
		}
		return mv;
	}
	public ModelAndView updatePassword(HttpServletRequest request, HttpServletResponse response) {
		String oldPassword = request.getParameter("oldPassword");
		String newPassword = request.getParameter("newPassword");
		Users user = (Users) request.getSession().getAttribute(Const.USER_SESSON);
		ModelAndView mv = null;
		if(user!= null && !user.getPassword().equals(oldPassword)){
			mv = this.getErrorModelView();
			mv.addObject("error","旧密码输入错误！");
		}else{
			Users cuser = new Users();
			cuser.setId(user.getId());
			cuser.setPassword(newPassword);
			userService.updateUser(cuser);
			mv = this.getSuccessModelView();
		}
		return mv;
	}
	
	public ModelAndView initStaticData(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv =this.getSuccessModelView();
		try{
			Users user = (Users) request.getSession().getAttribute(Const.USER_SESSON);
			mv.addObject("userInfo",user);
			List<HashMap> list = userService.getFunctionsByUser(user.getId());
			mv.addObject("functions",list);
			List<Users> userList = userService.queryAll();
 			mv.addObject("users",userList);
 			//数据字典
			List<Dictionary> dicList = dictionaryService.query(null);
			mv.addObject("dictionary",dicList);
		}catch(Exception e){
			logger.error("初始化静态数据失败!", e);
		}
		return mv;
	}
	
	public ModelAndView getCurrentUser(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		Users user = (Users) request.getSession().getAttribute(Const.USER_SESSON);
		mv.addObject("userInfo",user);
		return mv;
	}
	
	
	public ModelAndView logout (HttpServletRequest request ,HttpServletResponse response){
		request.getSession().removeAttribute(Const.USER_SESSON);
		return this.getSuccessModelView();
	}
	
	public ModelAndView list (HttpServletRequest request ,HttpServletResponse response){
		ModelAndView mv = this.getSuccessModelView();
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
		String cnname = request.getParameter("cnname");
		Users user  = new Users();
		user.setCnname(cnname);
		user.setStart(Integer.valueOf(start==null?"0":start));
		user.setLimit(Integer.valueOf(limit==null?"15":limit));
		try{
			List<Users> list = userService.list(user);
			mv.addObject("result", list);
		}catch(Exception e){
			logger.error("查询用户失败！",e);
		}
		return mv;
	}
	/***
	 * 
	 *@author wanghua
	 *Mar 14, 20103:57:47 PM
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView saveOrUpdate (HttpServletRequest request ,HttpServletResponse response){
		ModelAndView mv = this.getSuccessModelView();
		try{
			Users user = this.formToUser(request);
			String roleId = request.getParameter("roleIds");
			String[] roleIds=null;
			if(roleId != null){
				roleIds = roleId.split(",");
			}
			userService.saveOrUpdateUser(user, roleIds);
		}catch(Exception e){
			mv = this.getErrorMessageView("保存用户失败！");
			logger.error("保存用户失败！",e);
		}
		return mv;
	}
	/**
	 * 保存首页配置
	 *@author wanghua
	 *Jun 8, 20109:39:03 PM
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView saveConfig (HttpServletRequest request ,HttpServletResponse response){
		ModelAndView mv = this.getSuccessModelView();
		Users user = (Users) request.getSession().getAttribute(Const.USER_SESSON);
		try{
			String[] homepage = request.getParameterValues("homepage");
			String[] col = request.getParameterValues("col");
			String[] row = request.getParameterValues("row");
			String[] ishide = request.getParameterValues("ishide");
			List<HomeConfig> list = new ArrayList();
			for(int i=0;i<homepage.length;i++){
				HomeConfig homeConfig= new HomeConfig();
				homeConfig.setHomePage(homepage[i]);
				homeConfig.setCol(new Integer(col[i]));
				homeConfig.setRow(new Integer(row[i]));
				homeConfig.setIshide(new Integer(ishide[i]));
				homeConfig.setUserId(user.getId());
				list.add(homeConfig);
			}
			homeConfigService.save(list,user.getId());
		}catch(Exception e){
			mv = this.getErrorMessageView("保存首页配置失败！");
			logger.error("保存首页配置失败！",e);
		}
		return mv;
	}
	public ModelAndView getHomePage (HttpServletRequest request ,HttpServletResponse response){
		ModelAndView mv = this.getSuccessModelView();
		try{
			HomeConfig homeConfig= new HomeConfig();
			Users user = (Users) request.getSession().getAttribute(Const.USER_SESSON);
			homeConfig.setUserId(user.getId());
			List<HomeConfig> list =  homeConfigService.query(homeConfig);
			Dictionary dictionary = new Dictionary();
			DicType  dicType = new DicType();
			dicType.setDicType(request.getParameter("dicType"));
			dictionary.setDicType(dicType);
			List<Dictionary> dList  = dictionaryService.query(dictionary);
			mv.addObject("home", list);
			mv.addObject("dic", dList);
		}catch(Exception e){
			mv = this.getErrorMessageView("保存首页配置失败！");
			logger.error("保存首页配置失败！",e);
		}
		return mv;
	}
	
	public ModelAndView updateStatus(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mv = this.getSuccessModelView();
		try{
			Users user = this.formToUser(request);
			userService.updateUser(user);
		}catch(Exception e){
			mv = this.getErrorMessageView("保存用户失败！");
			logger.error("操作失败！",e);
		}
		return mv;
	}
	public ModelAndView getUserById (HttpServletRequest request ,HttpServletResponse response){
		ModelAndView mv = this.getSuccessModelView();
		String id = request.getParameter("id");
		if(id == null){
			mv = this.getErrorMessageView("请选择用户！");
		}
		try{
			Users user = userService.getUserById(Integer.valueOf(id));
			mv.addObject("user",user);
		}catch(Exception e){
			mv = this.getErrorMessageView("根据id获取用户失败！");
			logger.error("根据id获取用户失败！",e);
		}
		return mv;
	}

	public ModelAndView getRoleByUser(HttpServletRequest request ,HttpServletResponse response){
		ModelAndView mv = this.getSuccessModelView();
		String id = request.getParameter("id");
		Integer userId = null;
		if(id != null&&!id.equals("")){
			userId = Integer.valueOf(id);
		}
		try{
			List<HashMap> list = userService.getRolesByUser(userId);
			mv.addObject("result",list);
		}catch(Exception e){
			mv = this.getErrorMessageView("根据id获取用户角色失败！");
			logger.error("根据id获取用户角色失败！",e);
		}
		return mv;
	}
	public ModelAndView getNoRoleByUser(HttpServletRequest request ,HttpServletResponse response){
		ModelAndView mv = this.getSuccessModelView();
		String id = request.getParameter("id");
		Integer userId = null;
		if(id != null&&!id.equals("")){
			userId = Integer.valueOf(id);
		}
		try{
			List<HashMap> list = userService.getNoRoleByUser(userId);
			mv.addObject("result",list);
		}catch(Exception e){
			mv = this.getErrorMessageView("根据id获取用户角色失败！");
			logger.error("根据id获取用户角色失败！",e);
		}
		return mv;
	}
	
	
	private Users formToUser(HttpServletRequest request) throws ParseException{
		Users user = new Users();
		String userId = request.getParameter("id");
		if(userId != null && !userId.equals("")){
			user.setId(Integer.valueOf(userId));
		}
		String userName = request.getParameter("userName");
		if(userName != null && !userName.equals("")){
			user.setUserName(userName);
		}
		String cnname = request.getParameter("cnname");
		if(cnname != null && !cnname.equals("")){
			user.setCnname(cnname);
		}
		String email = request.getParameter("email");
		if(email != null && !email.equals("")){
			user.setEmail(email);
		}
		String pw = request.getParameter("pw");
		if(pw != null && !pw.equals("")){
			user.setPassword(pw);
		}
		String sex = request.getParameter("sex");
		if(sex != null && !sex.equals("")){
			user.setSex(sex);
		}
		String status = request.getParameter("status");
		if(status != null && !status.equals("")){
			user.setStatus(status);
		}
		String birthday = request.getParameter("birthday");
		if(birthday != null && !birthday.equals("")){
			user.setBirthday(DateUtils.parseTsDate(birthday));
		}
		user.setIsSystem("01");
		user.setCreateTime(new Date());
		return user;
	}

	public void setDictionaryService(DictionaryService dictionaryService) {
		this.dictionaryService = dictionaryService;
	}

	public void setHomeConfigService(HomeConfigService homeConfigService) {
		this.homeConfigService = homeConfigService;
	}
}
