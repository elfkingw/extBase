package com.richie.common.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.richie.framework.DateUtils;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import net.sf.json.JSONArray;

import org.springframework.web.servlet.ModelAndView;

import com.richie.framework.web.BaseHandler;
import com.richie.common.domain.DicType;
import com.richie.common.domain.Dictionary;
import com.richie.common.domain.DictionaryTree;
import com.richie.common.service.DicTypeService;
import com.richie.common.service.DictionaryService;
import com.richie.util.SqlUtil;
/**
 * 
 * @author wanghua
 * Mar 11, 201011:20:12 AM
 */
public class DictionaryHandler extends BaseHandler{
	private DictionaryService dictionaryService;
	private DicTypeService dicTypeService;
	
	public void setDictionaryService(DictionaryService dictionaryService) {
		this.dictionaryService = dictionaryService;
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
			Dictionary dictionary = this.formToObject(request);
			dictionary.setLimit(Integer.valueOf(limit == null?"15":limit));
			dictionary.setStart(Integer.valueOf(start==null?"0":start));
			List<Dictionary> list  = dictionaryService.list(dictionary);
			int count =  dictionaryService.getCount(dictionary);
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
			Dictionary dictionary = new Dictionary();
			DicType  dicType = new DicType();
			dicType.setId(new Integer(request.getParameter("dicType")));
			dictionary.setDicType(dicType);
			List<Dictionary> list  = dictionaryService.query(dictionary);
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
			Dictionary dictionary = this.formToObject(request);
			if(dictionary.getId() != null && dictionary.getId()!= 0){
				dictionaryService.update(dictionary);
			}else{
				dictionaryService.save(dictionary);
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
			dictionaryService.delete(Integer.valueOf(id));
		} catch (Exception e) {
			mv = this.getErrorMessageView("ɾ��ʧ��");
			logger.error("ɾ��ʧ�ܣ�",e);
		}
		return mv;
	}
	/**
	 * ��ȡ�ֵ�������
	 *@author wanghua
	 *Jun 6, 20101:45:17 PM
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView getTree(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mv = this.getSuccessModelView();
		try {
			List<DicType> list = dicTypeService.query(null);
			List<DictionaryTree> treeList = new ArrayList<DictionaryTree>();
			for(DicType dicType : list){
				DictionaryTree tree = new DictionaryTree();
				tree.setText(dicType.getDicNote()+"  "+dicType.getDicType());
				tree.setLeaf(true);
				tree.setId(dicType.getId().toString());
				treeList.add(tree);
			}
			JSONArray jsonArr = JSONArray.fromObject(treeList);
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(jsonArr.toString());
		} catch (Exception e) {
			mv = this.getErrorMessageView("��ȡ�ֵ�����ʧ�ܣ�");
			logger.error("��ȡ�ֵ�����ʧ�ܣ�",e);
		}
		return null;
	}
	/**
	 * 
	 *@author wanghua
	 * @param request
	 * @return
	 */
	private Dictionary formToObject(HttpServletRequest request)throws Exception{
		Dictionary dictionary = new Dictionary();
		String id =request.getParameter("id");
		if(id!=null && !"".equals(id)){//id_cnName
			dictionary.setId(Integer.valueOf(id));
		}
		String dicType =request.getParameter("dicType");
		if(dicType!=null && !"".equals(dicType)){//�ֵ�����
			dictionary.setDicType(new DicType(Integer.valueOf(dicType)));
		}
		String dicCode =request.getParameter("dicCode");
		if(dicCode!=null && !"".equals(dicCode)){//�ֵ����
			dictionary.setDicCode(dicCode);
		}
		String dicName =request.getParameter("dicName");
		if(dicName!=null && !"".equals(dicName)){//�ֵ�����
			dictionary.setDicName(dicName);
		}
		String remark =request.getParameter("remark");
		if(remark!=null && !"".equals(remark)){//��ע
			dictionary.setRemark(remark);
		}
	String dir = request.getParameter("dir");
	String sort = request.getParameter("sort");
	if(sort!=null && !"".equals(sort)){//����
		Map orderMap = new HashMap();
		orderMap.put("dir", dir);
		orderMap.put("sort", SqlUtil.getTableColumnName(sort));
		dictionary.setOrderMap(orderMap);
	}	
		return dictionary;
	}

	public void setDicTypeService(DicTypeService dicTypeService) {
		this.dicTypeService = dicTypeService;
	}
	
	
}
