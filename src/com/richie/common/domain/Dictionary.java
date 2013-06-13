
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
public class Dictionary extends BaseDomain implements java.io.Serializable{

	private static final long serialVersionUID = 1L;
	
	public Dictionary(){
	}
	
	public Dictionary(Integer id){
		this.id= id;
	}
	

	private Integer id;//id_cnName
	

	private DicType dicType;//字典类型
	

	private String dicCode;//字典代码
	

	private String dicName;//字典名称
	

	private String remark;//备注
	
	public Integer getId(){
		return this.id;
	}

	public void setId (Integer id){
		this.id = id;
	}
	public DicType getDicType(){
		return this.dicType;
	}

	public void setDicType (DicType dicType){
		this.dicType = dicType;
	}
	public String getDicCode(){
		return this.dicCode;
	}

	public void setDicCode (String dicCode){
		this.dicCode = dicCode;
	}
	public String getDicName(){
		return this.dicName;
	}

	public void setDicName (String dicName){
		this.dicName = dicName;
	}
	public String getRemark(){
		return this.remark;
	}

	public void setRemark (String remark){
		this.remark = remark;
	}
}