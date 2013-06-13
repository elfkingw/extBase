package com.richie.framework.service;

public class SaveLogThread extends Thread {
	
	public void run(){
		try {
			Thread.sleep(5000);
			System.out.println("=========asdf==========");
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
