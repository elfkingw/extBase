package com.richie.util;

public class SqlUtil{
	public static String capitalLetter ="ABCDEFGHIJKLMNOPQRSTUVWSYZ";
	public static String getTableColumnName(String colName){
		if(colName== null)
			return null;
		StringBuffer str = new StringBuffer(colName);
		int j=0;
		for(int i =0;i<colName.length();i++){
			if(capitalLetter.contains(String.valueOf(colName.charAt(i)))){
				str.insert(i+j, "_");
				j+=1;
			}
		}
		return str.toString().toLowerCase();
	}
	public static void main(String[] args){
		System.out.println(getTableColumnName("proceNameTest"));
	}
}
