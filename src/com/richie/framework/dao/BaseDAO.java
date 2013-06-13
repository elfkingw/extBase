package com.richie.framework.dao;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.ibatis.SqlMapClientTemplate;

/**
 * 
 * @author wanghua 2010-2-22下午03:45:35
 */
@SuppressWarnings("unchecked")
public class BaseDAO {
	protected String namespace;
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@Autowired
	private SqlMapClientTemplate sqlMapClientTemplate;

	protected Log log = LogFactory.getLog(getClass());

	public SqlMapClientTemplate getSqlMapClientTemplate() {
		return sqlMapClientTemplate;
	}

	public void setSqlMapClientTemplate(
			SqlMapClientTemplate sqlMapClientTemplate) {
		this.sqlMapClientTemplate = sqlMapClientTemplate;
	}

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public List queryForPage(Object condition) {
		return this.sqlMapClientTemplate.queryForList(getStatementName("queryForPage"),
				condition);
	}
	
	public int queryCount(Object condition){
		Integer count = (Integer) this.sqlMapClientTemplate.queryForObject(getStatementName("queryCount"),condition);
		return count.intValue();
	}
	
	public List queryForCondition(Object condition){
		return this.sqlMapClientTemplate.queryForList(getStatementName("query"),condition);
	}
	
	public Object getObjectById(Object pk){
		return this.sqlMapClientTemplate.queryForObject(getStatementName("getObjectById"), pk);
	}
	public void deleteById(Object pk){
		this.sqlMapClientTemplate.delete(getStatementName("delete"), pk);
	}
	public Object save(Object object){
		return this.sqlMapClientTemplate.insert(getStatementName("insert"),object);
	}
	
	public Object update(Object object){
		return this.sqlMapClientTemplate.update(getStatementName("update"),object);
	}
	
	public String getStatementName(String name) {
		return this.getNamespace() + "." + name;
	}

	public String getNamespace() {
		return namespace;
	}

	public void setNamespace(String namespace) {
		this.namespace = namespace;
	}
}
