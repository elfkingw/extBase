﻿package com.richie.common.dao;
/**
 * author:wanghua
 * description:数据库操作类
 * richie code
 */
import org.springframework.stereotype.Service;

import com.richie.framework.dao.BaseDAO;

@Service
@SuppressWarnings("unchecked")
public class NoticeDAO extends BaseDAO {

	public NoticeDAO() {
		this.setNamespace("Notice");
	}

}