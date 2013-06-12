
package com.richie.common.domain;
/**
 * author:wanghua
 * description:数据库对应实体pojo
 * richie code
 */
import java.sql.Timestamp;
import java.sql.Date;
import com.richie.framework.domain.BaseDomain;

/**
 * 
 * @author wanghua 
 */
public class HomeConfig extends BaseDomain implements java.io.Serializable{

	private static final long serialVersionUID = 1L;
	
	public HomeConfig(){
	}
	
	public HomeConfig(Integer id){
		this.id= id;
	}
	

	private Integer id;//id_cnName
	

	private Integer userId;//userId_cnName
	

	private String homePage;//homePage_cnName
	

	private Integer col;//col_cnName
	

	private Integer row;//row_cnName
	

	private Integer ishide;//ishide_cnName
	
	public Integer getId(){
		return this.id;
	}

	public void setId (Integer id){
		this.id = id;
	}
	public Integer getUserId(){
		return this.userId;
	}

	public void setUserId (Integer userId){
		this.userId = userId;
	}
	public String getHomePage(){
		return this.homePage;
	}

	public void setHomePage (String homePage){
		this.homePage = homePage;
	}
	public Integer getCol(){
		return this.col;
	}

	public void setCol (Integer col){
		this.col = col;
	}
	public Integer getRow(){
		return this.row;
	}

	public void setRow (Integer row){
		this.row = row;
	}
	public Integer getIshide(){
		return this.ishide;
	}

	public void setIshide (Integer ishide){
		this.ishide = ishide;
	}
}