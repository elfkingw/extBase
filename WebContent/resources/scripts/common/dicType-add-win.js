Ext.namespace("DicType.Add");
DicType.Add.win= function(){
	
	this.txtId= new Ext.form.Hidden({
		name:'id',
		value:''
	});
	this.txtDicType = new Ext.form.TextField({
		fieldLabel:'字典类型',
		allowBlank: false,
		maxLength:50,
		width:125,
		name:'dicType'
	});
	this.txtDicNote = new Ext.form.TextField({
		fieldLabel:'类型名称',
		allowBlank: true,	
		maxLength:100,
		width:125,
		name:'dicNote'
	});
	
	this.formPanel = new Ext.form.FormPanel({
		id:'dicTypeForm',
		title:'title',
		frame:true,
		layout:'table', 
		region : 'center',
		bodyStyle:'padding-left:20px;padding-top:5px;',
		layoutConfig: {columns:2}, 
		items:[{layout:'form',items:[this.txtDicType]},{layout:'form',items:[this.txtDicNote]}],
		bbar: new Ext.ux.StatusBar({
            defaultText: 'Ready',
            plugins: new Ext.ux.ValidationStatus({form:'dicTypeForm'})
        })
	});
	this.saveBtn = new Ext.Button({
		text:'保存',
		scope:this,
		handler:this.saveDicType
	});
	
	this.closeBtn = new Ext.Button({
		text:'关闭',
		scope:this,
		handler:function(){
			this.hide();
		}
	});
	
	this.saveCon = new Ext.data.Connection({
			url:'../../dicType/saveOrUpdate.form',
			method:'post'
	});
	
	DicType.Add.win.superclass.constructor.call(this,{
		id:'dicTypeWin',
		title:'信息',
		width:520,
		height:200,
		closeAction:'hide',
		maximizable :true,
		modal:true,
		layout:'border',
		items:[
			this.formPanel
		],
		buttons:[this.saveBtn,this.closeBtn],
		buttonAlign:'center',
		listeners:{
		}
	});
};

Ext.extend(DicType.Add.win,Ext.Window,{
	saveDicType:function(){
		if(!this.formPanel.getForm().isValid()){
			return;
		}
		this.showLoading(true);
		var params = this.formPanel.getForm().getValues();
		params.id = this.txtId.getValue();
		Utils.request(this.saveCon,{
			params:params,
			scope:this,
			success:function(data){
				this.scope.hide();
				Ext.getCmp('dicType_grid').store.reload();
				Utils.info("操作成功！");
			},
			after: function() {this.scope.showLoading(false);}
		});
		this.saveBtn.show();
	},
	initAdd:function(){
		this.formPanel.getForm().reset();
		this.txtId.setValue("");
		this.saveBtn.show();
	},
	initUpdate:function(data){
		this.txtId.setValue(data.id);
		this.txtDicType.setValue(data.dicType);
		this.txtDicNote.setValue(data.dicNote);
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
	showLoading: function(flag) {
		if (!this.lm)
			this.lm = new Ext.LoadMask('dicTypeWin', {msg: '操作中,请稍候...'});
		if (flag) this.lm.show();
		else this.lm.hide();
	}
})
