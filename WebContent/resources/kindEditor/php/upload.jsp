<%@page   import = "java.net.URLDecoder" %>  
<%@page language= "java"  contentType= "text/html;charset=GB18030" %>  
<%@page  import = "java.util.*" %>  
<%@page  import ="org.apache.commons.fileupload.*" %>  
<%   
//程序:wallimn   
//时间:2008-08-27   
//电邮:wallimn@sohu.com   
//博客：http://wallimn.javaeye.com、http://blog.csdn.net/wallimn   
//说明：KindEditor图片上传处理CGI，   
//注意：此程序需要commons-fileupload.jar，请自行下载放到WEB-INF/lib目录下。   
//request.setCharacterEncoding("GB18030");   
try{
String contextPath = request.getContextPath()+ "\\" ;   
String SavePath = request.getSession().getServletContext().getRealPath( "\\")+"attached/";   
String SaveUrl = contextPath+ "/attached/" ;   
String[] ExtArr =  new  String[]{ ".gif" , ".jpg" , ".png" , ".bmp" };   
int  MaxSize =  4000000 ;   
String Msg1 =  "上传文件大小超过限制。" ;   
String Msg2 =  "上传文件的扩展名不被允许。" ;    
String Msg3 =  "文件上传失败。" ;   
String Msg=Msg3;   
//java.io.File files=new java.io.File(".");       
//String FileName = (String)request.getAttribute("fileName");   
String editorId= null;
String FileWidth =  null ;   
String FileHeight =  null ;   
String FileBorder =  null ;   
String FileTitle =  null ;   
String FileTitle2 =  null ;   
String FileAlign =  null ;   
String FileHspace =  null ;   
String FileVspace =  null ;   
  
Date dt =  new  Date();   
Random random =  new  Random();   
random.nextInt();   
String FileNameAuto = String.format( "%X_%X" , new  Object[]{ new  Integer(( int )(dt.getTime())), new  Integer(random.nextInt())});   
String FilePath =  null ;   
String FileUrl =  null ;   
DiskFileUpload fu =  new  DiskFileUpload();   
fu.setSizeMax(MaxSize); //   
fu.setSizeThreshold( 4096 );   
fu.setRepositoryPath( "c:/" );   
//ServletRequestContext src = new ServletRequestContext(request);      
List fileItems = fu.parseRequest(request);   
Iterator iter = fileItems.iterator();   
while  (iter.hasNext()) {   
    FileItem item = (FileItem) iter.next();   
    String fieldName = item.getFieldName();   
     if  (!item.isFormField()) {   
        String name = item.getName();   
         long  size = item.getSize();   
         if ((name== null ||name.equals( "" )) && size== 0 )   
         continue ;   
         if (size>MaxSize) {   
            Msg=Msg1;   
             break ;   
        }   
         //namename = name.replace(':','_');   
         //namename = name.replace('\\','_');   
         int  pos = name.lastIndexOf( "." );   
        String ext = name.substring(pos);   
         boolean  b= false ;   
         for ( int  m= 0 ;m<ExtArr.length; m++){   
             if (ExtArr[m].equalsIgnoreCase(ext)){   
                b= true ;   
                 break ;   
            }   
        }   
         if  (b== false ){   
            Msg=Msg2;   
             break ;   
        }   
        FilePath = SavePath + FileNameAuto+ext;   
        FileUrl = SaveUrl + FileNameAuto+ext;   
        java.io.File f=  new  java.io.File(FilePath);   
        item.write(f);   
    }   
     else {   
        String fieldValue = item.getString();   
         if ( "imgWidth" .equals(fieldName)){   
            FileWidth = fieldValue;   
        }   
         else   if ( "imgHeight" .equals(fieldName)){   
            FileHeight = fieldValue;   
        }   
         else   if ( "imgBorder" .equals(fieldName)){   
            FileBorder = fieldValue;   
        }   
         else   if ( "imgTitle" .equals(fieldName)){   
            FileTitle = fieldValue;   
        }   
         else   if ( "imgTitle2" .equals(fieldName)){   
             //FileTitle2 = URLDecoder.decode(fieldValue,"GB18030");   
            FileTitle2 = URLDecoder.decode(fieldValue, "UTF-8" );   
        }   
         else   if ( "imgAlign" .equals(fieldName)){   
            FileAlign = fieldValue;   
        }   
         else   if ( "imgHspace" .equals(fieldName)){   
            FileHspace = fieldValue;   
        }   
         else   if ( "imgVspace" .equals(fieldName)){   
            FileVspace = fieldValue;   
        }   
         else   if ( "id" .equals(fieldName)){   
            editorId = fieldValue;   
        }   
    }   
}   
if (FileUrl!= null ){   
    out.println(  "<html>" );   
    out.println(  "<head>" );   
    out.println(  "<title>error</title>" );   
    out.println(  "<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\">" );   
    out.println(  "</head>" );   
    out.println(  "<body>" );   
    out.println(  "<script type=\"text/javascript\">parent.KE.plugin[\"image\"].insert(\""+ editorId+ "\",\""+ FileUrl+ "\",\""  + FileTitle2 +  "\",\"" + FileWidth + "\",\"" +FileHeight+"\",\""  + FileBorder +  "\");</script>" );   
    out.println(  "</body>" );   
    out.println(  "</html>" );   
}   
else {   
    out.println(  "<html>" );   
    out.println(  "<head>" );   
    out.println(  "<title>error</title>" );   
    out.println(  "<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\">" );   
    out.println(  "</head>" );   
    out.println(  "<body>" );   
    out.println(  "<script type=\"text/javascript\">alert(\""  + Msg +  "\");parent.KindDisableMenu();parent.KindReloadIframe();</script>" );   
    out.println(  "</body>" );   
    out.println(  "</html>" );   
}   
}catch(Exception e)
{
	e.printStackTrace();
}
%>  
