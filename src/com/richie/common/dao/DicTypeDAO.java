package com.richie.common.dao;
/**
 * author:wanghua
 * description:���ݿ������
 * richie code
 */
import org.springframework.stereotype.Service;

import com.richie.framework.dao.BaseDAO;

@Service
@SuppressWarnings("unchecked")
public class DicTypeDAO extends BaseDAO {

	public DicTypeDAO() {
		this.setNamespace("DicType");
	}

}