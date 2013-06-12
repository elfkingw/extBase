
package com.richie.common.service;

import java.util.List;


import com.richie.common.dao.DicTypeDAO;
import com.richie.common.domain.DicType;

/**
 * 
 * @author wanghua 
 */
@SuppressWarnings("unchecked")
public class DicTypeService {
	private DicTypeDAO dicTypeDAO;

	public void setDicTypeDAO(DicTypeDAO dicTypeDAO) {
		this.dicTypeDAO = dicTypeDAO;
	}

	/**
	 *��ҳ��ѯ 
	 * @author wanghua 
	 * @param list
	 * @return
	 */
	public List<DicType> list(final DicType dicType) {
	    List<DicType> list = dicTypeDAO.queryForPage(dicType);
		return list;
	}
	/**
	 *��ѯ
	 * @author wanghua 
	 * @param list
	 * @return
	 */
	public List<DicType> query(final DicType dicType) {
		List<DicType> list = dicTypeDAO.queryForCondition(dicType);
		return list;
	}
	/**
	 * ��ѯ������
	 *@author wanghua
	 *Mar 11, 20101:31:00 PM
	 * @param dicType
	 * @return
	 */
	public int getCount(DicType dicType){
		return dicTypeDAO.queryCount(dicType);
	}
	
	/**
	 * ������Ϣ
	 *@author wanghua
	 * @param dicType
	 * @return
	 */
	public Integer save(DicType dicType){
		return (Integer) dicTypeDAO.save(dicType);
	}
	
	/**
	 * �޸���Ϣ
	 *@author wanghua
	 * @param dicType
	 * @return
	 */
	public Integer update(DicType dicType){
		return (Integer) dicTypeDAO.update(dicType);
	}
	
	/**
	 * ɾ��
	 *@author wanghua
	 * @param id
	 */
	public void delete(Integer id){
		dicTypeDAO.deleteById(id);
	}
	

}
