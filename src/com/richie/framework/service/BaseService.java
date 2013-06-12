package com.richie.framework.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * 
 * @author wanghua 2010-2-21обнГ09:38:15
 */
public class BaseService {
	
	protected final Log log = LogFactory.getLog(getClass());
	@Autowired
	protected JdbcTemplate jdbcTemplate;

	public JdbcTemplate getJdbcTemplate() {
		return this.jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

}
