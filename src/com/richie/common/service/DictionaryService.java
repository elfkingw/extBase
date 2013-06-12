
package com.richie.common.service;

import java.util.List;


import com.richie.common.dao.DictionaryDAO;
import com.richie.common.domain.Dictionary;

/**
 * 
 * @author wanghua 
 */
@SuppressWarnings("unchecked")
public class DictionaryService {
	private DictionaryDAO dictionaryDAO;

	public void setDictionaryDAO(DictionaryDAO dictionaryDAO) {
		this.dictionaryDAO = dictionaryDAO;
	}

	/**
	 *分页查询 
	 * @author wanghua 
	 * @param list
	 * @return
	 */
	public List<Dictionary> list(final Dictionary dictionary) {
	    List<Dictionary> list = dictionaryDAO.queryForPage(dictionary);
		return list;
	}
	/**
	 *查询
	 * @author wanghua 
	 * @param list
	 * @return
	 */
	public List<Dictionary> query(final Dictionary dictionary) {
		List<Dictionary> list = dictionaryDAO.queryForCondition(dictionary);
		return list;
	}
	/**
	 * 查询总条数
	 *@author wanghua
	 *Mar 11, 20101:31:00 PM
	 * @param dictionary
	 * @return
	 */
	public int getCount(Dictionary dictionary){
		return dictionaryDAO.queryCount(dictionary);
	}
	
	/**
	 * 新增信息
	 *@author wanghua
	 * @param dictionary
	 * @return
	 */
	public Integer save(Dictionary dictionary){
		return (Integer) dictionaryDAO.save(dictionary);
	}
	
	/**
	 * 修改信息
	 *@author wanghua
	 * @param dictionary
	 * @return
	 */
	public Integer update(Dictionary dictionary){
		return (Integer) dictionaryDAO.update(dictionary);
	}
	
	/**
	 * 删除
	 *@author wanghua
	 * @param id
	 */
	public void delete(Integer id){
		dictionaryDAO.deleteById(id);
	}
	

}
