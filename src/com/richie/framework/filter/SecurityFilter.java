package com.richie.framework.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.richie.common.Const;
import com.richie.framework.service.SaveLogThread;
import com.richie.privilege.domain.Users;
import com.richie.privilege.service.UserService;

public class SecurityFilter implements Filter {

	private UserService userService;
	private String logonUrl;
	private SaveLogThread saveLogThread;
	private static final Log logger = LogFactory.getLog(SecurityFilter.class);
	public void setLogonUrl(String logonUrl) {
		this.logonUrl = logonUrl;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public void destroy() {
		// TODO Auto-generated method stub

	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		String path  = httpRequest.getServletPath();
		if(path.indexOf(logonUrl)==-1){	
			Users user = (Users) httpRequest.getSession().getAttribute(Const.USER_SESSON);
			if(user == null){
				httpResponse.sendRedirect(httpRequest.getContextPath()+"/login.html");
			}
		}
		chain.doFilter(request, response);
	}

	public void init(FilterConfig config) throws ServletException {
		// TODO Auto-generated method stub

	}


}
