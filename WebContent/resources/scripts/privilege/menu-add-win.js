Ext.namespace("Menu.Add");
Menu.Add.win = function() {
	
	this.id ;
	this.txtMenuId = new Ext.form.NumberField({
		fieldLabel : '菜单id',
		name:'menuId',
		minText : '0',
		maxLength:6,
		allowBlank : false
	});
	this.txtMenuName = new Ext.form.TextField({
		fieldLabel : '菜单名称',
		name:'name',
		allowBlank : false
	});
	this.store = new Ext.data.JsonStore({
		url : '../../menu/getParentMenus.form',
		root : 'root',
		fields : ["id", "value"]
	});
	this.store.load();
	this.combParentMenu = new Ext.form.ComboBox({
		fieldLabel : '父菜单',
		mode : 'local',
		store : this.store,
		hiddenName :'parentMenuId',
		valueField : 'id',
		displayField : 'value',
		width : 125,
		editable : true,
		triggerAction : 'all',
		selectOnFocus : true
	});

	this.styleIcon = new Ext.form.TextField({
		fieldLabel : '样式',
		name:'icon'
	});

	this.txtUrl = new Ext.form.TextField({
		fieldLabel : 'url',
		name:'url',
		width : 360
	})

	this.txtOrder = new Ext.form.TextField({
		fieldLabel : '排序',
		name:'order'
	});

	this.isFunction = new Ext.form.RadioGroup({
		width : 100,
		fieldLabel : '是否是功能',
		allowBlank : false,
		columns : 2,
		name:'isFunction',
		items : [{
			boxLabel : '否',
			inputValue : '01',
			name : 'isFunction',
			checked : true
		}, {
			boxLabel : '是',
			inputValue : '02',
			name : 'isFunction'
		}]
	});

	this.isLeaf = new Ext.form.RadioGroup({
		width : 100,
		fieldLabel : '是否叶子菜单',
		allowBlank : false,
		columns : 2,
		name:'isLeaf',
		items : [{
			boxLabel : '是',
			inputValue : '01',
			name : 'isLeaf',
			checked : true
		}, {
			boxLabel : '否',
			inputValue : '02',
			name : 'isLeaf'
		}]
	});

	this.status = new Ext.form.RadioGroup({
		width : 100,
		fieldLabel : '状态',
		allowBlank : false,
		columns : 2,
		vertical : false,
		name:'status',
		items : [{
			boxLabel : '有效',
			inputValue : '01',
			name : 'status',
			checked : true
		}, {
			boxLabel : '无效',
			inputValue : '02',
			name : 'status'
		}]
	});

	this.txtDesp = new Ext.form.TextArea({
		width : 360,
		height : 75,
		name:'description',
		fieldLabel : '描述'
	});

	this.formPanel = new Ext.form.FormPanel({
		frame : true,
		model : true,
		closeAction : 'hide',
		layout : 'table',
		layoutConfig : {
			columns : 2
		},
		items : [{
			layout : 'form',
			items : [this.txtMenuId]
		}, {
			layout : 'form',
			items : [this.txtMenuName]
		}, {
			layout : 'form',
			items : [this.combParentMenu]
		}, {
			layout : 'form',
			items : [this.styleIcon]
		}, {
			colspan : 2,
			layout : 'form',
			items : [this.txtUrl]
		}, {
			layout : 'form',
			items : [this.txtOrder]
		}, {
			layout : 'form',
			items : [this.isFunction]
		}, {
			layout : 'form',
			items : [this.isLeaf]
		}, {
			layout : 'form',
			items : [this.status]
		}, {
			colspan : 2,
			layout : 'form',
			items : [this.txtDesp]
		}

		]
	});
	this.saveBtn = new Ext.Button({
		text : '保存',
		scope : this,
		handler : this.saveMenu
	});

	this.closeBtn = new Ext.Button({
		text : '关闭',
		scope : this,
		handler : function() {
			this.hide();
		}
	});
	Menu.Add.win.superclass.constructor.call(this, {
		id:'menuWin',
		title : '菜单信息',
		width : 500,
		height : 300,
		closeAction : 'hide',
		modal : true,
		items : [this.formPanel],
		buttons : [this.saveBtn, this.closeBtn],
		buttonAlign : 'center'

	});
};

Ext.extend(Menu.Add.win, Ext.Window, {
	saveMenu : function() {
		this.showLoading(true);
		var conn = new Ext.data.Connection({
			url : '../../menu/saveOrUpdate.form',
			method : 'post'
		});
		var params = this.formPanel.getForm().getValues();
		params.id =this.id;
		Utils.request(conn, {
			params : params,
			scope : this,
			success : function(data) {
				this.scope.hide();
				Ext.getCmp('menu_grid').store.reload();
				Ext.getCmp('menuTree').root.reload();
				Utils.info("操作成功！");
			},
			after : function() {
				this.scope.showLoading(false);
			}
		})
	},
	initAdd : function() {
		this.formPanel.getForm().reset();
		this.id = "";
	},
	initUpdate : function(data) {
		this.id = data.id;
		this.txtMenuId.setValue(data.menuId);
		this.txtMenuName.setValue(data.name);
		this.combParentMenu.setValue(data.parentMenuId);
		this.styleIcon.setValue(data.icon);
		this.txtUrl.setValue(data.url);
		this.txtOrder.setValue(data.order);
		this.isFunction.setValue(data.menuType);
		this.isLeaf.setValue(data.isLeaf);
		this.status.setValue(data.status);
		this.txtDesp.setValue(data.description);
	},
	showLoading: function(flag) {
		if (!this.lm)
			this.lm = new Ext.LoadMask('menuWin', {msg: '操作中,请稍候...'});
		if (flag) this.lm.show();
		else this.lm.hide();
	}
})
