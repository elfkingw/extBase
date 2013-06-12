
package com.richie.common.service;

import java.util.List;


import com.richie.common.dao.NoticeDAO;
import com.richie.common.domain.Notice;

/**
 * 
 * @author wanghua 
 */
@SuppressWarnings("unchecked")
public class NoticeService {
	private NoticeDAO noticeDAO;

	public void setNoticeDAO(NoticeDAO noticeDAO) {
		this.noticeDAO = noticeDAO;
	}

	/**
	 *��ҳ��ѯ 
	 * @author wanghua 
	 * @param list
	 * @return
	 */
	public List<Notice> list(final Notice notice) {
	    List<Notice> list = noticeDAO.queryForPage(notice);
		return list;
	}
	/**
	 *��ѯ
	 * @author wanghua 
	 * @param list
	 * @return
	 */
	public List<Notice> query(final Notice notice) {
		List<Notice> list = noticeDAO.queryForCondition(notice);
		return list;
	}
	/**
	 * ��ѯ������
	 *@author wanghua
	 *Mar 11, 20101:31:00 PM
	 * @param notice
	 * @return
	 */
	public int getCount(Notice notice){
		return noticeDAO.queryCount(notice);
	}
	
	/**
	 * ������Ϣ
	 *@author wanghua
	 * @param notice
	 * @return
	 */
	public Integer save(Notice notice){
		return (Integer) noticeDAO.save(notice);
	}
	
	/**
	 * �޸���Ϣ
	 *@author wanghua
	 * @param notice
	 * @return
	 */
	public Integer update(Notice notice){
		return (Integer) noticeDAO.update(notice);
	}
	
	/**
	 * ɾ��
	 *@author wanghua
	 * @param id
	 */
	public void delete(Integer id){
		noticeDAO.deleteById(id);
	}
	

}
