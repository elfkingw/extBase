Ext.namespace("User.Add");
User.Add.win= function(){
	this.id;
	this.userName = new Ext.form.TextField({
		fieldLabel:'用户登录名',
		minText:'0',
		name:'userName',
		allowBlank: false
	});
	
	this.cnname = new Ext.form.TextField({
		fieldLabel:'真实姓名',
		allowBlank: false,
		name:'cnname'
	});
	
	
	this.email = new Ext.form.TextField({
		fieldLabel:'E-Mail',
		 vtype: 'email' ,
		 name:'email'
	});
	
	this.birthday = new Ext.form.DateField({
		fieldLabel:'生日',
		width:125,
		format:'Y-m-d',
		name:'birthday'
	});
	
	
	this.pw = new Ext.form.TextField({
	 	fieldLabel:'旧密码',
	 	inputType:'password',
	 	value:'111111',
	 	allowBlank:false,
	 	name:'pw'
	});
	
	this.repw = new Ext.form.TextField({
		fieldLabel:'确认密码',
		inputType:'password',
	 	value:'111111',
	 	allowBlank:false
	});
	this.sexItems =Utils.getDicRadio(Utils.SEX,'sex');
	this.sex = new Ext.form.RadioGroup({
		width:125,
		fieldLabel:'性别',
		allowBlank:false,
		columns:2,
		items:this.sexItems,
		name:'sex'
	});
	
	this.statusItems = Utils.getDicRadio(Utils.STATUS,'status');
	this.status = new Ext.form.RadioGroup({
		width : 125,
		fieldLabel:'状态',
		allowBlank :false,
        columns : 2,
        vertical :false,
        items:this.statusItems,
         name:'status'
	});
	
	
	this.formPanel = new Ext.form.FormPanel({
		title:'基本信息',
		frame:true,
		model:true,
		closeAction:'hide',
		layout:'table', 
		region:'center',
		bodyStyle:'padding-left:20px;',
		layoutConfig: {columns:2}, 
		items:[
			{layout:'form',items:[this.userName]},
			{layout:'form',items:[this.cnname]},
			{layout:'form',items:[this.email]},
			{layout:'form',items:[this.birthday]},
			{layout:'form',items:[this.pw]},
			{layout:'form',items:[this.repw]},
			{layout:'form',items:[this.sex]},
			{layout:'form',items:[this.status]}
		]
	});
	
    this.store = new Ext.data.JsonStore({
		url:'../../user/getNoRoleByUser.form',
		root : 'result',
		fields:["id","roleName"],
		listeners:{
			 beforeload :{    
	    	  	fn : function(thiz,options){
       	          Ext.apply(thiz.baseParams,
       	          { 
       	          	 id:this.id
       	          });    
              },
              scope:this 
	    	}
	    }
	});
	this.selectedStore = new Ext.data.JsonStore({
		url:'../../user/getRoleByUser.form',
		root : 'result',
		fields:["id","roleName"],
		listeners:{
			 beforeload :{    
	    	  	fn : function(thiz,options){
       	          Ext.apply(thiz.baseParams,
       	          { 
       	          	 id:this.id
       	          });    
              },
              scope:this 
	    	}
	    }
	});
    this.itemSelect = new Ext.ux.ItemSelector({
		name : 'itemselector',
		imagePath : '../../resources/scripts/ux/images/',
		multiselects : [{
			width : 200,
			height : 170,
			legend : '待选角色',
			store : this.store,
			displayField : 'roleName',
			valueField : 'id'
		}, {
			width : 200,
			height : 170,
			legend : '已选角色',
			displayField : 'roleName',
			valueField : 'id',
			store : this.selectedStore,
			tbar : [{
				text : '重置',
				scope : this,
				handler : function() {
					this.southPanel.getForm().findField('itemselector').reset();
				}
			}]
		}]
	});     
	this.southPanel = new Ext.form.FormPanel({
		title:'选择角色',
		split:true,
		region:'south',
		height:230,
        labelWidth:60,
        bodyStyle: 'padding:10px;',
        items:[this.itemSelect]
	});
	this.saveBtn = new Ext.Button({
		text:'保存',
		scope:this,
		handler:this.saveUser
	});
	
	this.closeBtn = new Ext.Button({
		text:'关闭',
		scope:this,
		handler:function(){
			this.hide();
		}
	});
	
	User.Add.win.superclass.constructor.call(this,{
		id:'userWin',
		title:'用户信息',
		width:600,
		height:450,
		closeAction:'hide',
		layout:'border',
		modal:true,
		items:[
			this.formPanel,this.southPanel
		],
		buttons:[this.saveBtn,this.closeBtn],
		buttonAlign:'center'
			
	});
};

Ext.extend(User.Add.win,Ext.Window,{
	saveUser:function(){
		if(!this.formPanel.getForm().isValid()){
			return;
		}
		if(this.itemSelect.getValue()==""){
			Utils.warn("请选择角色");
			return;
		}
		this.showLoading(true);
		var conn = new Ext.data.Connection({
			url:'../../user/saveOrUpdate.form',
			method:'post'
		});
		var params = this.formPanel.getForm().getValues();
		params.id = this.id;
		params.roleIds = this.itemSelect.getValue();
		Utils.request(conn,{
			params:params,
			scope:this,
			success:function(data){
				this.scope.hide();
				Ext.getCmp('user_grid').store.reload();
				Utils.info("操作成功！");
			},
			after: function() {this.scope.showLoading(false);}
		});
	},
	initAdd:function(){
		this.pw.enable();
		this.repw.enable();
		this.formPanel.getForm().reset();
		this.id = "";
		this.selectedStore.load();this.store.load();
	},
	initUpdate:function(data){
		this.pw.disable();
		this.repw.disable();
		this.pw.setValue("");
		this.repw.setValue("");
		this.id = data.id;
		this.store.load();
		this.selectedStore.load();
		this.userName.setValue(data.userName);
		this.cnname.setValue(data.cnname);
		this.email.setValue(data.email);
		this.sex.setValue(data.sex);
		this.birthday.setValue(data.birthday.substring(0,10));
		this.status.setValue(data.status);
	},
	showLoading: function(flag) {
		if (!this.lm)
			this.lm = new Ext.LoadMask('userWin', {msg: '操作中,请稍候...'});
		if (flag) this.lm.show();
		else this.lm.hide();
	}
})
