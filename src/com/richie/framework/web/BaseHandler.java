package com.richie.framework.web;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.richie.common.Constants;
import com.richie.privilege.domain.Users;

public class BaseHandler extends MultiActionController {

	public final String SUCCESS = "success";
	public final String FAILURE = "failure";
	protected final static String ERROR = "error";
	private String successView = "jsonView";
	private String errorView = "jsonView";
	
	protected transient final Log logger = LogFactory.getLog(getClass());
	
	protected ModelAndView getSuccessModelView() {
		ModelAndView mv = new ModelAndView(getSuccessView());
		mv.addObject(SUCCESS, Boolean.TRUE);
		return mv;
	}
	
	protected ModelAndView getErrorModelView(){
		ModelAndView mv = new ModelAndView(getErrorView());
		mv.addObject(FAILURE,Boolean.FALSE);
		return mv;
	}
	protected ModelAndView getErrorMessageView(String errorMsg) {
		ModelAndView mv = this.getErrorModelView();
		mv.addObject(ERROR, errorMsg);
		return mv;
	}
	public String getSuccessView() {
		return successView;
	}

	public void setSuccessView(String successView) {
		this.successView = successView;
	}

	public String getErrorView() {
		return errorView;
	}

	public void setErrorView(String errorView) {
		this.errorView = errorView;
	}
	public Users getSessionUser(HttpServletRequest request){
		Users user = (Users) request.getSession().getAttribute(Constants.USER_SESSON);
		return user;
	}

}
