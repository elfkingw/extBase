package com.richie.framework.service;


import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class LogExAop {
	public static int PROCESS_TIME_OUT =12;
	   /** 定义共用方法切入点 
     */ 
    @Pointcut("execution(public * *(..))") 
    public void inPublicMethod() 
    { 
    } 
    
    /** 定义数据访问类方法切入点 
     */ 
    @Pointcut("execution(* com.richie.*.dao.*.*(..))") 
    public void inDAOPackage() 
    { 
    } 
    
    /** 定义业务处理类方法切入点 
     */ 
    @Pointcut("execution(* com.richie.*.service.*.*(..))") 
    public void inServicePackage() 
    { 
        
    } 
    
    /** web层方法切入点 
     */ 
    @Pointcut("execution(* com.richie.*.web.*.*(..))") 
    public void inWebPackage() 
    { 
        
    } 
    
    /** 所有的public方法（包括web、service） 
     */ 
    @Pointcut("inPublicMethod() && (inDAOPackage()||inServicePackage() ||inWebPackage())") 
    public void supportAOP() 
    { 
        
    } 
    
    /** 切入点执行范围   主要记录类处理花费时间  主要用于调试用
     * @param pjp       切入点 
     * @throws Throwable 切入点抛出的异常 
     */ 
    @Around("supportAOP()") 
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable 
    { 
        Logger log = Logger.getLogger(pjp.getTarget().getClass()); 
        StringBuilder sb = new StringBuilder(); 
        sb.append("\n==================【") 
                .append(pjp.getTarget().getClass().getName()) 
                .append(".") 
                .append(pjp.getSignature().getName()) 
                .append("】"); 
        
        long begin = System.currentTimeMillis(); 
        //实际方法执行 
        Object result = pjp.proceed(); 
        long end = System.currentTimeMillis(); 
        sb.append("处理完毕花费时间：[").append((end - begin)).append("ms]"); 
//        log.info(sb.toString()); 
        LogThread logThread = new LogThread(sb.toString());
        logThread.start();
        return result; 
    } 
    
    /** 切入点抛出异常 记录日志
     * @param jp        切入点 
     * @param ex        抛出的异常 
     */ 
    @AfterThrowing(pointcut = "supportAOP()", throwing = "ex") 
    public void doThrowing(JoinPoint jp, Throwable ex) 
    { 
        Logger log = Logger.getLogger(jp.getTarget().getClass()); 
        log.error(ex.getMessage(), ex); 
    } 
    
    
}
