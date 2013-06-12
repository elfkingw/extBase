Ext.namespace("Notice.Add");
Notice.Add.win= function(){
	
	this.txtId= new Ext.form.Hidden({
		name:'id',
		value:''
	});
	this.txtNoticeName = new Ext.form.TextField({
		fieldLabel:'标题',
		allowBlank: true,	
		maxLength:50,
		width:320,
		name:'noticeName'
	});
	this.txtNoticeContent = new Ext.form.TextArea({
		allowBlank: true,	
		maxLength:65535,
		width:700,
		height:250,
		id:'noticeContent',
		name:'noticeContent'
	});
	this.isShow=false;
	this.txtNoticeTime = new Ext.form.DateField({
		fieldLabel:'创建时间',
		width:100,
		allowBlank: false,
		format:'Y-m-d',
		name:'noticeTime'
	});	
	this.noticeFieldset = new Ext.form.FieldSet({
		title:"公告信息",
		layout:'fit',
		items:[this.txtNoticeContent]
	});
	this.formPanel = new Ext.form.FormPanel({
		title : 'title',
		id:'status-form',
		frame : true,
		model : true,
		layout : 'column',
		region : 'center',
		autoScroll:true,
		labelWidth:60,
		layoutConfig : {
			columns : 2
		},
		items : [{layout:'column',items:[{
					layout : 'form',
					columnWidth:.7, 
					items : [this.txtNoticeName]
				},  {
					layout : 'form',
					columnWidth:.3, 
					items : [this.txtNoticeTime]
				}]}, {colspan:2,
					layout : 'form',
					items : [this.noticeFieldset]
		}],
		bbar: new Ext.ux.StatusBar({
            defaultText: 'Ready',
            plugins: new Ext.ux.ValidationStatus({form:'status-form'})
        })
	});
	this.saveBtn = new Ext.Button({
		text:'保存',
		scope:this,
		handler:this.saveNotice
	});
	
	this.closeBtn = new Ext.Button({
		text:'关闭',
		scope:this,
		handler:function(){
			this.hide();
		}
	});
	
	this.saveCon = new Ext.data.Connection({
			url:'../../notice/saveOrUpdate.form',
			method:'post'
	});
	
	Notice.Add.win.superclass.constructor.call(this,{
		id:'noticeWin',
		title:'公告信息',
		width:800,
		height:480,
		closeAction:'hide',
		iconCls:'notice',
		maximizable :true,
		modal:true,
		layout:'border',
		items:[
			this.formPanel
		],
		buttons:[this.saveBtn,this.closeBtn],
		buttonAlign:'center',
		listeners:{
			show:function(){
				if(!this.isShow){
					KE.init({id:'noticeContent',imageUploadJson : '../../jsp/upload_json.jsp',
					fileManagerJson : '../../jsp/file_manager_json.jsp',
					allowFileManager : true});
					KE.create('noticeContent');
					this.isShow=true;
				}
			}
		}
	});
};

Ext.extend(Notice.Add.win,Ext.Window,{
	saveNotice:function(){
		if(!this.formPanel.getForm().isValid()){
			return;
		}
		this.showLoading(true);
		var params = this.formPanel.getForm().getValues();
		params.id = this.txtId.getValue();
		params.noticeContent = KE.util.getData('noticeContent');
		Utils.request(this.saveCon,{
			params:params,
			scope:this,
			success:function(data){
				this.scope.hide();
				Ext.getCmp('notice_grid').store.reload();
				Ext.getCmp('notice_grid').getView().refresh();
				Utils.info("操作成功！");
			},
			after: function() {this.scope.showLoading(false);}
		});
		this.saveBtn.show();
	},
	initAdd:function(){
		this.formPanel.getForm().reset();
		this.txtId.setValue("");
		this.setContentValue("");
		this.saveBtn.show();
	},
	initUpdate:function(data){
		this.txtId.setValue(data.id);
		this.txtNoticeName.setValue(data.noticeName);
		this.txtNoticeContent.setValue(data.noticeContent);
		this.setContentValue(data.noticeContent);
		this.txtNoticeTime.setValue(data.noticeTime.substring(0,10));
		this.saveBtn.show();
	},
	showDetail:function(data,isUpdate){
		if(isUpdate){
			this.initUpdate(data);
			this.saveBtn.show();
		}else{
			this.initUpdate(data);
			this.saveBtn.hide();
		}
	},
	setContentValue:function(value){
	    KE.util.focus('noticeContent');
        KE.util.selection('noticeContent');
        KE.util.setFullHtml('noticeContent', value);
	},
	showLoading: function(flag) {
		if (!this.lm)
			this.lm = new Ext.LoadMask('noticeWin', {msg: '操作中,请稍候...'});
		if (flag) this.lm.show();
		else this.lm.hide();
	}
})
