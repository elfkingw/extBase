package com.richie.privilege.domain;

/**
 * 
 * @author wanghua Mar 10, 201011:13:36 PM
 */
public class MenuTree {
	private String id;
	private String text;
	private String iconCls;
	private boolean isLeaf;
	private String url;
	private String qtip;
	private String leafStr;



	public String getLeafStr() {
		return leafStr;
	}

	public void setLeafStr(String leafStr) {
		this.leafStr = leafStr;
	}

	public String getQtip() {
		return qtip;
	}

	public void setQtip(String qtip) {
		this.qtip = qtip;
	}


	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public boolean isLeaf() {
		if(this.getLeafStr().equals("01"))
			return true;
		else
			return false;
	}

	public void setLeaf(boolean isLeaf) {
		this.isLeaf = isLeaf;
	}

}
