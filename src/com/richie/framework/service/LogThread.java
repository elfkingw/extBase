package com.richie.framework.service;

import org.apache.log4j.Logger;

public class LogThread extends Thread {
	private String msg;
	public LogThread(String msg){
		this.msg =msg;
	}
	public void run(){
		 Logger log =	Logger.getLogger("业务日志:");
		 log.info(msg);
		
	}

}
