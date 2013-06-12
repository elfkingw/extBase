Ext.namespace("Role.Add");
Role.Add.win= function(){
	this.id;
	this.txtRoleName = new Ext.form.TextField({
		fieldLabel:'角色名称',
		allowBlank: false,
		width:200,
		name:'name'
	});
	
	this.status = new Ext.form.RadioGroup({
		width : 200,
		fieldLabel:'状态',
		allowBlank :false,
        columns : 2,
        vertical :false,
        items:[
               {boxLabel:'有效',inputValue:'01',name:'status',checked:true},
               {boxLabel:'无效',inputValue:'02',name:'status'}
         ],
         name:'status'
	});
	
	this.txtDesp = new Ext.form.TextArea({
		width:250,
		height:60,
	  	fieldLabel:'描述',
	  	name:'description'
	});
	
	this.formPanel = new Ext.form.FormPanel({
		frame:true,
		model:true,
		closeAction:'hide',
		items:[
			{layout:'form',items:[this.txtRoleName]},
			{layout:'form',items:[this.status]},
			{layout:'form',items:[this.txtDesp]}
			
		]
	});
	this.saveBtn = new Ext.Button({
		text:'保存',
		scope:this,
		handler:this.saveRole
	});
	
	this.closeBtn = new Ext.Button({
		text:'关闭',
		scope:this,
		handler:function(){
			this.hide();
		}
	});
	
	Role.Add.win.superclass.constructor.call(this,{
		id:'roleWin',
		title:'角色信息',
		width:420,
		height:200,
		closeAction:'hide',
		modal:true,
		items:[
			this.formPanel
		],
		buttons:[this.saveBtn,this.closeBtn],
		buttonAlign:'center'
			
	});
};

Ext.extend(Role.Add.win,Ext.Window,{
	saveRole:function(){
		this.showLoading(true);
		var conn = new Ext.data.Connection({
			url:'../../role/saveOrUpdate.form',
			method:'post'
		});
		var params = this.formPanel.getForm().getValues();
		params.id =this.id;
		Utils.request(conn,{
			params:params,
			scope:this,
			success:function(data){
				this.scope.hide();
				Ext.getCmp('role_grid').store.reload();
				Utils.info("操作成功！");
			},
			after: function() {this.scope.showLoading(false);}
		})
	},
	initAdd:function(){
		this.formPanel.getForm().reset();
		this.id = "";
	},
	initUpdate:function(data){
		this.id = data.id;
		this.txtRoleName.setValue(data.roleName);
		this.status.setValue(data.status);
		this.txtDesp.setValue(data.description);
	},
	showLoading: function(flag) {
		if (!this.lm)
			this.lm = new Ext.LoadMask('roleWin', {msg: '操作中,请稍候...'});
		if (flag) this.lm.show();
		else this.lm.hide();
	}
})
