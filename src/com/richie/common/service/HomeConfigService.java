
package com.richie.common.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;


import com.richie.common.dao.HomeConfigDAO;
import com.richie.common.domain.HomeConfig;

/**
 * 
 * @author wanghua 
 */
@SuppressWarnings("unchecked")
public class HomeConfigService {
	private HomeConfigDAO homeConfigDAO;

	public void setHomeConfigDAO(HomeConfigDAO homeConfigDAO) {
		this.homeConfigDAO = homeConfigDAO;
	}

	/**
	 *分页查询 
	 * @author wanghua 
	 * @param list
	 * @return
	 */
	public List<HomeConfig> list(final HomeConfig homeConfig) {
	    List<HomeConfig> list = homeConfigDAO.queryForPage(homeConfig);
		return list;
	}
	/**
	 *查询
	 * @author wanghua 
	 * @param list
	 * @return
	 */
	public List<HomeConfig> query(final HomeConfig homeConfig) {
		List<HomeConfig> list = homeConfigDAO.queryForCondition(homeConfig);
		return list;
	}
	/**
	 * 查询总条数
	 *@author wanghua
	 *Mar 11, 20101:31:00 PM
	 * @param homeConfig
	 * @return
	 */
	public int getCount(HomeConfig homeConfig){
		return homeConfigDAO.queryCount(homeConfig);
	}
	
	/**
	 * 新增信息
	 *@author wanghua
	 * @param homeConfig
	 * @return
	 */
	public Integer save(HomeConfig homeConfig){
		return (Integer) homeConfigDAO.save(homeConfig);
	}
	/**
	 * 新增信息
	 *@author wanghua
	 * @param homeConfig
	 * @return
	 */
	@Transactional
	public void save(List<HomeConfig> homeConfigs,Integer userId){
		this.deleteHomeConfigs(userId);
		for(HomeConfig homeConfig :homeConfigs ){
			homeConfigDAO.save(homeConfig);
		}
	}
	
	/**
	 * 修改信息
	 *@author wanghua
	 * @param homeConfig
	 * @return
	 */
	public Integer update(HomeConfig homeConfig){
		return (Integer) homeConfigDAO.update(homeConfig);
	}
	
	/**
	 * 删除
	 *@author wanghua
	 * @param id
	 */
	public void delete(Integer id){
		homeConfigDAO.deleteById(id);
	}

	/**
	 * 删除
	 *@author wanghua
	 * @param id
	 */
	public void deleteHomeConfigs(Integer UserId){
		homeConfigDAO.deleteByUserId(UserId);
	}
	

}
