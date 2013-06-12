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
	   /** ���干�÷�������� 
     */ 
    @Pointcut("execution(public * *(..))") 
    public void inPublicMethod() 
    { 
    } 
    
    /** �������ݷ����෽������� 
     */ 
    @Pointcut("execution(* com.richie.*.dao.*.*(..))") 
    public void inDAOPackage() 
    { 
    } 
    
    /** ����ҵ�����෽������� 
     */ 
    @Pointcut("execution(* com.richie.*.service.*.*(..))") 
    public void inServicePackage() 
    { 
        
    } 
    
    /** web�㷽������� 
     */ 
    @Pointcut("execution(* com.richie.*.web.*.*(..))") 
    public void inWebPackage() 
    { 
        
    } 
    
    /** ���е�public����������web��service�� 
     */ 
    @Pointcut("inPublicMethod() && (inDAOPackage()||inServicePackage() ||inWebPackage())") 
    public void supportAOP() 
    { 
        
    } 
    
    /** �����ִ�з�Χ   ��Ҫ��¼�ദ����ʱ��  ��Ҫ���ڵ�����
     * @param pjp       ����� 
     * @throws Throwable ������׳����쳣 
     */ 
    @Around("supportAOP()") 
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable 
    { 
        Logger log = Logger.getLogger(pjp.getTarget().getClass()); 
        StringBuilder sb = new StringBuilder(); 
        sb.append("\n==================��") 
                .append(pjp.getTarget().getClass().getName()) 
                .append(".") 
                .append(pjp.getSignature().getName()) 
                .append("��"); 
        
        long begin = System.currentTimeMillis(); 
        //ʵ�ʷ���ִ�� 
        Object result = pjp.proceed(); 
        long end = System.currentTimeMillis(); 
        sb.append("������ϻ���ʱ�䣺[").append((end - begin)).append("ms]"); 
//        log.info(sb.toString()); 
        LogThread logThread = new LogThread(sb.toString());
        logThread.start();
        return result; 
    } 
    
    /** ������׳��쳣 ��¼��־
     * @param jp        ����� 
     * @param ex        �׳����쳣 
     */ 
    @AfterThrowing(pointcut = "supportAOP()", throwing = "ex") 
    public void doThrowing(JoinPoint jp, Throwable ex) 
    { 
        Logger log = Logger.getLogger(jp.getTarget().getClass()); 
        log.error(ex.getMessage(), ex); 
    } 
    
    
}
