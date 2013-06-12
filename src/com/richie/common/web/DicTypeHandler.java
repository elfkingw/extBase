package com.richie.common.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.richie.framework.DateUtils;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.web.servlet.ModelAndView;

import com.richie.framework.web.BaseHandler;
import com.richie.common.domain.DicType;
import com.richie.common.service.DicTypeService;
import com.richie.util.SqlUtil;
/**
 * 
 * @author wanghua
 * Mar 11, 201011:20:12 AM
 */
public class DicTypeHandler extends BaseHandler{
	private DicTypeService dicTypeService;
	
	public void setDicTypeService(DicTypeService dicTypeService) {
		this.dicTypeService = dicTypeService;
	}

	/**
	 * ��ҳ��ѯ
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
			DicType dicType = this.formToObject(request);
			dicType.setLimit(Integer.valueOf(limit == null?"15":limit));
			dicType.setStart(Integer.valueOf(start==null?"0":start));
			List<DicType> list  = dicTypeService.list(dicType);
			int count =  dicTypeService.getCount(dicType);
			mv.addObject("result",list);
			mv.addObject("total",count);
		} catch (Exception e) {
			mv = this.getErrorModelView();
			logger.error("��ҳ��ѯʧ�ܣ�",e);
			return mv;
		}
		return mv;
	}
	/**
	 * ��ѯ
	 * @author wanghua
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView query(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		try {
			DicType dicType = new DicType();
			List<DicType> list  = dicTypeService.query(dicType);
			mv.addObject("result",list);
		} catch (Exception e) {
			mv = this.getErrorModelView();
			logger.error("��ѯʧ�ܣ�",e);
			return mv;
		}
		return mv;
	}
	/**
	 * �������޸�
	 * @author wanghua
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView saveOrUpdate(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		try {
			DicType dicType = this.formToObject(request);
			if(dicType.getId() != null && dicType.getId()!= 0){
				dicTypeService.update(dicType);
			}else{
				dicTypeService.save(dicType);
			}
		} catch (Exception e) {
			mv = this.getErrorMessageView("����ʧ��");
			logger.error("����ʧ�ܣ�",e);
		}
		return mv;
	}
	/**
	 * ɾ��
	 * @author wanghua
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView delete(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		String id = request.getParameter("id");
		try {
			dicTypeService.delete(Integer.valueOf(id));
		} catch (Exception e) {
			mv = this.getErrorMessageView("ɾ��ʧ��");
			logger.error("ɾ��ʧ�ܣ�",e);
		}
		return mv;
	}
	/**
	 * 
	 *@author wanghua
	 * @param request
	 * @return
	 */
	private DicType formToObject(HttpServletRequest request)throws Exception{
		DicType dicType = new DicType();
		String id =request.getParameter("id");
		if(id!=null && !"".equals(id)){//id_cnName
			dicType.setId(Integer.valueOf(id));
		}
		String dicType1 =request.getParameter("dicType");
		if(dicType1!=null && !"".equals(dicType1)){//�ֵ�����
			dicType.setDicType(dicType1);
		}
		String dicNote =request.getParameter("dicNote");
		if(dicNote!=null && !"".equals(dicNote)){//��������
			dicType.setDicNote(dicNote);
		}
	String dir = request.getParameter("dir");
	String sort = request.getParameter("sort");
	if(sort!=null && !"".equals(sort)){//����
		Map orderMap = new HashMap();
		orderMap.put("dir", dir);
		orderMap.put("sort", SqlUtil.getTableColumnName(sort));
		dicType.setOrderMap(orderMap);
	}	
		return dicType;
	}
	
	
}
