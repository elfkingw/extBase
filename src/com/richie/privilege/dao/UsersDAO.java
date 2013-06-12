package com.richie.privilege.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.orm.ibatis.SqlMapClientCallback;
import org.springframework.stereotype.Service;

import com.ibatis.sqlmap.client.SqlMapExecutor;
import com.richie.framework.dao.BaseDAO;
import com.richie.privilege.domain.Users;

@SuppressWarnings("unchecked")
@Service
public class UsersDAO extends BaseDAO {

	public UsersDAO() {
		this.namespace = "UserInfo";
	}

	public Users getUserByName(String userName) {
		Users user = (Users) this.getSqlMapClientTemplate().queryForObject(
				getStatementName("selectByUserName"), userName);
		return user;
	}

	/**
	 * �����û�����ɫ֮��Ĺ�ϵ
	 * 
	 * @author wanghua Mar 14, 20102:33:47 PM
	 * @param userId
	 * @param roleId
	 */
	public void saveUserRole(final List<Map> list) {
		this.getSqlMapClientTemplate().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor)
					throws SQLException {
				executor.startBatch();
				int batch = 0;
				for (Map map : list) {
					executor.insert(getStatementName("insertUserRole"),map);
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

	/**
	 * ɾ���û���ɫ֮��Ĺ�ϵ
	 * 
	 * @author wanghua Mar 14, 20102:38:31 PM
	 * @param userId
	 */
	public void deleteUserRole(Integer userId) {
		this.getSqlMapClientTemplate().delete(
				getStatementName("deleteUserRole"), userId);
	}
	/**
	 * �����û���ȡ�û���ɫ
	 *@author wanghua
	 *Mar 16, 201011:05:48 PM
	 * @param userId
	 * @return
	 */
	public List<HashMap> getRoleByUser(Integer userId){
		return this.getSqlMapClientTemplate().queryForList(this.getStatementName("slectRoleByUser"),userId);
	}
	/**
	 * ��ȡ�û�û�з���Ľ�ɫ����useridΪ��ʱ ȫ�� ��ɫ
	 *@author wanghua
	 *Mar 17, 20108:33:35 PM
	 * @param userId
	 * @return
	 */
	public List<HashMap> getNoRoleByUser(Integer userId){
		return this.getSqlMapClientTemplate().queryForList(this.getStatementName("getNoRoleByUser"),userId);
	}
	/**
	 * ��ȡ�û��Ĺ���
	 *@author wanghua
	 *Mar 21, 201010:45:09 AM
	 * @param userId
	 * @return
	 */
	public List<HashMap> getFunctionsByUser(Integer userId){
		return this.getSqlMapClientTemplate().queryForList(this.getStatementName("getFunctionByUser"),userId);
	}
	public List<Users> getAllUsers(){
		return this.getSqlMapClientTemplate().queryForList(this.getStatementName("queryAll"));
	}
}