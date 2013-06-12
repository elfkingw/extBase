
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
public class Notice extends BaseDomain implements java.io.Serializable{

	private static final long serialVersionUID = 1L;
	private Integer id;//id_cnName
	
	private String noticeName;//标题
	
	private String noticeContent;//公告内容
	
	private Integer createUserId;//创建人
	
	private Date noticeTime;//创建时间
	
	private Timestamp createTime;//创建时间
	
	public Integer getId(){
		return this.id;
	}
	
	public void setId (Integer id){
		this.id = id;
	}
	
	public String getNoticeName(){
		return this.noticeName;
	}
	
	public void setNoticeName (String noticeName){
		this.noticeName = noticeName;
	}
	
	public String getNoticeContent(){
		return this.noticeContent;
	}
	
	public void setNoticeContent (String noticeContent){
		this.noticeContent = noticeContent;
	}
	
	public Integer getCreateUserId(){
		return this.createUserId;
	}
	
	public void setCreateUserId (Integer createUserId){
		this.createUserId = createUserId;
	}
	
	public Date getNoticeTime(){
		return this.noticeTime;
	}
	
	public void setNoticeTime (Date noticeTime){
		this.noticeTime = noticeTime;
	}
	
	public Timestamp getCreateTime(){
		return this.createTime;
	}
	
	public void setCreateTime (Timestamp createTime){
		this.createTime = createTime;
	}
	
}