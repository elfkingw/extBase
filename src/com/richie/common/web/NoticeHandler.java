package com.richie.common.web;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.richie.framework.DateUtils;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.web.servlet.ModelAndView;

import com.richie.framework.web.BaseHandler;
import com.richie.common.domain.Notice;
import com.richie.common.service.NoticeService;
import com.richie.util.SqlUtil;
/**
 * 
 * @author wanghua
 * Mar 11, 201011:20:12 AM
 */
public class NoticeHandler extends BaseHandler{
	private NoticeService noticeService;
	
	public void setNoticeService(NoticeService noticeService) {
		this.noticeService = noticeService;
	}

	/**
	 * 分页查询
	 * @author wanghua
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) {
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
		ModelAndView mv = this.getSuccessModelView();
		try {
			Notice notice = this.formToObject(request);
			notice.setLimit(Integer.valueOf(limit == null?"15":limit));
			notice.setStart(Integer.valueOf(start==null?"0":start));
			List<Notice> list  = noticeService.list(notice);
			int count =  noticeService.getCount(notice);
			mv.addObject("result",list);
			mv.addObject("total",count);
		} catch (Exception e) {
			mv = this.getErrorModelView();
			logger.error("分页查询失败！",e);
			return mv;
		}
		return mv;
	}
	/**
	 * 查询
	 * @author wanghua
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView query(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		try {
			Notice notice = new Notice();
			List<Notice> list  = noticeService.query(notice);
			mv.addObject("result",list);
		} catch (Exception e) {
			mv = this.getErrorModelView();
			logger.error("查询失败！",e);
			return mv;
		}
		return mv;
	}
	/**
	 * 新增或修改
	 * @author wanghua
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView saveOrUpdate(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		try {
			Notice notice = this.formToObject(request);
			String createTime =request.getParameter("createTime");
			if(createTime!=null && !"".equals(createTime)){//创建时间
				notice.setCreateTime(DateUtils.parseTsDate(createTime));
			}else{
				notice.setCreateTime(new Timestamp(System.currentTimeMillis()));
			}
			String createUserId =request.getParameter("createUserId");
			if(createUserId!=null && !"".equals(createUserId)){//创建人
				notice.setCreateUserId(Integer.valueOf(createUserId));
			}else{
				notice.setCreateUserId(this.getSessionUser(request).getId());
			}
			if(notice.getId() != null && notice.getId()!= 0){
				noticeService.update(notice);
			}else{
				noticeService.save(notice);
			}
		} catch (Exception e) {
			mv = this.getErrorMessageView("保存失败");
			logger.error("保存失败！",e);
		}
		return mv;
	}
	/**
	 * 删除
	 * @author wanghua
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView delete(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		String id = request.getParameter("id");
		try {
			noticeService.delete(Integer.valueOf(id));
		} catch (Exception e) {
			mv = this.getErrorMessageView("删除失败");
			logger.error("删除失败！",e);
		}
		return mv;
	}
	/**
	 * 
	 *@author wanghua
	 * @param request
	 * @return
	 */
	private Notice formToObject(HttpServletRequest request)throws Exception{
		Notice notice = new Notice();
		String id =request.getParameter("id");
		if(id!=null && !"".equals(id)){//
			notice.setId(Integer.valueOf(id));
		}
		String noticeName =request.getParameter("noticeName");
		if(noticeName!=null && !"".equals(noticeName)){//标题
			notice.setNoticeName(noticeName);
		}
		String noticeContent =request.getParameter("noticeContent");
		if(noticeContent!=null && !"".equals(noticeContent)){//公告内容
			notice.setNoticeContent(noticeContent);
		}
		String createUserId =request.getParameter("createUserId");
		if(createUserId!=null && !"".equals(createUserId)){//创建人
			notice.setCreateUserId(Integer.valueOf(createUserId));
		}
		String noticeTime =request.getParameter("noticeTime");
		if(noticeTime!=null && !"".equals(noticeTime)){//创建时间
			notice.setNoticeTime(DateUtils.parseSqlDate(noticeTime));
		}
		String createTime =request.getParameter("createTime");
		if(createTime!=null && !"".equals(createTime)){//创建时间
			notice.setCreateTime(DateUtils.parseTsDate(createTime));
		}
		String dir = request.getParameter("dir");
		String sort = request.getParameter("sort");
		if(sort!=null && !"".equals(sort)){//排序
			Map orderMap = new HashMap();
			orderMap.put("dir", dir);
			orderMap.put("sort", SqlUtil.getTableColumnName(sort));
			notice.setOrderMap(orderMap);
		}	
		return notice;
	}
	
	
}
