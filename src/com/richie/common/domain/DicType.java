
package com.richie.common.domain;
/**
 * author:wanghua
 * description:���ݿ��Ӧʵ��pojo
 * richie code
 */
import java.sql.Timestamp;
import java.sql.Date;
import com.richie.framework.domain.BaseDomain;

/**
 * 
 * @author wanghua 
 */
public class DicType extends BaseDomain implements java.io.Serializable{

	private static final long serialVersionUID = 1L;
	public DicType(){
		
	}
	public DicType(Integer id){
		this.id=id;
	}
	private Integer id;//id_cnName
	
	private String dicType;//�ֵ�����
	
	private String dicNote;//��������
	
	public Integer getId(){
		return this.id;
	}
	
	public void setId (Integer id){
		this.id = id;
	}
	
	public String getDicType(){
		return this.dicType;
	}
	
	public void setDicType (String dicType){
		this.dicType = dicType;
	}
	
	public String getDicNote(){
		return this.dicNote;
	}
	
	public void setDicNote (String dicNote){
		this.dicNote = dicNote;
	}
	
}