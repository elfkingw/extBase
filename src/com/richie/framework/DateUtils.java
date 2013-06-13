package com.richie.framework;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {

	public static SimpleDateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public static SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd");
	
	public static Date parseTime(String timeStr) throws ParseException{
		return timeFormat.parse(timeStr);
	}
  
	
	public static Timestamp parseTsTime(String timeStr) throws ParseException{
		Date date = DateUtils.parseTime(timeStr);
		return new Timestamp(date.getTime());
	}
	
	public static java.sql.Date parseSqlDate(String timeStr) throws ParseException{
		Date date = DateUtils.parseDate(timeStr);
		return new java.sql.Date(date.getTime());
	}
	
	public static Date parseDate(String dateStr) throws ParseException{
		return DateFormat.parse(dateStr);
	}
	
	public static Timestamp parseTsDate(String dateStr) throws ParseException{
		Date date = DateUtils.parseDate(dateStr);
		return new Timestamp(date.getTime());
	}
	
	public static void main(String[] args){
		try {
			System.out.println(DateUtils.parseTsDate("2009-12-12"));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
