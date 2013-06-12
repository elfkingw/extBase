Ext.namespace("Dictionary.Add");
Dictionary.Add.win= function(){
	
	this.txtId= new Ext.form.Hidden({
		name:'id',
		value:''
	});
	this.store = new Ext.data.JsonStore({
		url : '../../dicType/query.form',
		root : 'result',
		fields : ["id", "dicNote"]
	});
	this.store.load();
	this.txtDicType = new Ext.form.ComboBox({
		fieldLabel : '字典类型',
		mode : 'local',
		store : this.store,
		hiddenName :'dicType',
		valueField : 'id',
		displayField : 'dicNote',
		allowBlank: false,
		emptyText:'请选择...',
		width : 125,
		editable : true,
		triggerAction : 'all',
		selectOnFocus : true
	});
	this.txtDicCode = new Ext.form.TextField({
		fieldLabel:'字典代码',
		allowBlank: false,
		maxLength:30,
		width:125,
		name:'dicCode'
	});
	this.txtDicName = new Ext.form.TextField({
		fieldLabel:'字典名称',
		allowBlank: false,
		maxLength:60,
		width:125,
		name:'dicName'
	});
	this.txtRemark = new Ext.form.TextField({
		fieldLabel:'备注',
		allowBlank: true,	
		maxLength:100,
		width:125,
		name:'remark'
	});
	
	this.formPanel = new Ext.form.FormPanel({
		id:'dictionaryForm',
		title:'title',
		frame:true,
		layout:'table', 
		region : 'center',
		bodyStyle:'padding-left:20px;padding-top:5px;',
		layoutConfig: {columns:2}, 
		items:[{layout:'form',items:[this.txtDicType]},{layout:'form',items:[this.txtDicCode]},{layout:'form',items:[this.txtDicName]},{layout:'form',items:[this.txtRemark]}],
		bbar: new Ext.ux.StatusBar({
            defaultText: 'Ready',
            plugins: new Ext.ux.ValidationStatus({form:'dictionaryForm'})
        })
	});
	this.saveBtn = new Ext.Button({
		text:'保存',
		scope:this,
		handler:this.saveDictionary
	});
	
	this.closeBtn = new Ext.Button({
		text:'关闭',
		scope:this,
		handler:function(){
			this.hide();
		}
	});
	
	this.saveCon = new Ext.data.Connection({
			url:'../../dictionary/saveOrUpdate.form',
			method:'post'
	});
	
	Dictionary.Add.win.superclass.constructor.call(this,{
		id:'dictionaryWin',
		title:'数据字典',
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

Ext.extend(Dictionary.Add.win,Ext.Window,{
	saveDictionary:function(){
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
				Ext.getCmp('dictionary_grid').store.reload();
				Utils.info("操作成功!");
			},
			after: function() {this.scope.showLoading(false);}
		});
		this.saveBtn.show();
	},
	initAdd:function(){
		this.formPanel.getForm().reset();
		var sm = Ext.getCmp('dictionaryTree').getSelectionModel();
		var record = sm.selNode;
		if(record)
			this.txtDicType.setValue(record.id);
		this.txtId.setValue("");
		this.saveBtn.show();
	},
	initUpdate:function(data){
		this.txtId.setValue(data.id);
		this.txtDicType.setValue(data.dicType.id);
		this.txtDicCode.setValue(data.dicCode);
		this.txtDicName.setValue(data.dicName);
		this.txtRemark.setValue(data.remark);
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
			this.lm = new Ext.LoadMask('dictionaryWin', {msg: '操作中,请稍候...'});
		if (flag) this.lm.show();
		else this.lm.hide();
	}
})
