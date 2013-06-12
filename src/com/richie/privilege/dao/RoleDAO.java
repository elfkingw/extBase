package com.richie.privilege.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.orm.ibatis.SqlMapClientCallback;
import org.springframework.stereotype.Service;

import com.ibatis.sqlmap.client.SqlMapExecutor;
import com.richie.framework.dao.BaseDAO;

/**
 * 
 * @author wanghua Mar 15, 20109:32:01 PM
 */
@Service
@SuppressWarnings("unchecked")
public class RoleDAO extends BaseDAO {
	public RoleDAO() {
		this.namespace = "role";
	}

	public void deleteRoleUser(Integer roleId){
		this.getSqlMapClientTemplate().delete(this.getStatementName("deleteRoleUser"),roleId);
	}
	
	
	public List<HashMap> queryMenuByRole(Integer roleId){
		return this.getSqlMapClientTemplate().queryForList(this.getStatementName("queryMenuByRole"), roleId);
	}
	/**
	 * 保存菜单、角色之间的关系
	 * 
	 * @author wanghua Mar 14, 20102:33:47 PM
	 * @param userId
	 * @param roleId
	 */
	public void saveMenuRole(final List<Map> list) {
		this.getSqlMapClientTemplate().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor)
					throws SQLException {
				executor.startBatch();
				int batch = 0;
				for (Map map : list) {
					executor.insert(getStatementName("insertRoleMenu"),map);
					batch++;
					if (batch == 500) {
						executor.executeBatch();
						batch = 0;
					}
				}
				executor.executeBatch();
				return null;
			}
		});
	}
	public void deleteRoleMenu(Integer roleId){
		this.getSqlMapClientTemplate().delete(this.getStatementName("deleteRoleMenu"),roleId);
	}

}
