package com.richie.framework.domain;

import java.util.Map;

@SuppressWarnings("unchecked")
public class BaseDomain {
	private int start;
	private int limit;
	private Map orderMap;
	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public Map getOrderMap() {
		return orderMap;
	}

	public void setOrderMap(Map orderMap) {
		this.orderMap = orderMap;
	}

}
