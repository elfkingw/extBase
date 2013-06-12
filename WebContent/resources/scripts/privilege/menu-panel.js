Ext.namespace("Menu");
Menu.panel = function() {
	this.addWin = null;
	this.selectedNode;
	this.queryName = new Ext.form.TextField({
		width : 100

	});
	this.queryMenuId = new Ext.form.TextField({
		width : 100
	});
	this.queryBtn = new Ext.Button({
		text : '查询',
		iconCls : 'query',
		scope : this,
		handler : this.queryMenu
	});
	this.store = new Ext.data.Store({
//		remoteSort:true,
		proxy : new Ext.data.HttpProxy({
			url : '../../menu/list.form'
		}),
		reader : new Ext.data.JsonReader({
			root : 'result',
			totalProperty : 'total',
			fields : ['id', 'menuId', 'name', 'parentMenuId', 'url', 'icon',
					'isLeaf', 'order', 'description', 'status', 'menuType',
					'parentMenuName']
		}),
		listeners : {
			beforeload : {
				fn : function(thiz, options) {
					Ext.apply(thiz.baseParams, {
						name : this.queryName.getValue(),
						menuId : this.queryMenuId.getValue(),
						mId:this.selectedNode
					});
				},
				scope : this
			}
		}
	});
	this.renderStatus = function(value) {
		switch (value) {
			case '01' :	return "有效";break;
			case '02' :	return "无效";break;
		}
	};
	this.renderLeaf = function(value) {
		switch (value) {
			case '01' :	return "是";	break;
			case '02' :	return "否";	break;
		}
	};
	this.rendermenuType = function(value) {
		switch (value) {
			case '02' :return "是";	break;
			case '01' :	return "否";	break;
		}
	};
	this.renderIcon = function(value) {
		var returnValue;
		returnValue = '<div class="'
				+ value
				+ '" style="height: 16px;background-repeat: no-repeat;text-align:left">'
				+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + value + '</div>';
		return returnValue

	}
	this.colModel = new Ext.grid.ColumnModel({
		defaults : {
			width : 100,
			sortable : true,
			align : 'center'
		},
		columns : [{
			header : '菜单id',
			dataIndex : 'menuId'
		}, {
			header : '菜单名称',
			dataIndex : 'name'
		}, {
			header : '父菜单',
			dataIndex : 'parentMenuName'
		}, {
			header : 'url',
			dataIndex : 'url',
			width : 200
		}, {
			header : '样式',
			dataIndex : 'icon',
			renderer : this.renderIcon,
			width : 150
		}, {
			header : '是否叶子菜单',
			dataIndex : 'isLeaf',
			renderer : this.renderLeaf
		}, {
			header : '是否功能',
			dataIndex : 'menuType',
			renderer : this.rendermenuType
		}, {
			header : '排序',
			dataIndex : 'order'
		}, {
			header : '描述',
			dataIndex : 'description'
		}, {
			header : '状态',
			dataIndex : 'status',
			renderer : this.renderStatus
		}

		]
	});

	this.gridPanel = new Ext.grid.GridPanel({
		excelTitle:'菜单信息',
		id : 'menu_grid',
		region : 'center',
		cm : this.colModel,
		store : this.store,
		stripeRows : true,
		tbar : [{
			text : '新增菜单',
			iconCls : 'table_add',
			scope : this,
			handler : this.initSave
		}, '-', {
			text : '修改菜单',
			iconCls : 'table_edit',
			scope : this,
			handler : this.initUpdate
		}, {
			text : '删除菜单',
			iconCls : 'table_delete',
			scope : this,
			handler : this.deleteMenu
		}, '->', '菜单名称：', this.queryName, '菜单id:', this.queryMenuId,
				this.queryBtn],
		loadMask : {
			msg : '加载中，请稍候...'
		},
		bbar : new Ext.PagingToolbar({
			pageSize : 15,
			store : this.store,
			displayInfo : true,
			displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
			emptyMsg : "没有记录...",
			 items :['-',{text: '导出到Excel',iconCls:'excel',scope:this, handler : this.exportExcel}],
			plugins:[new Ext.ux.plugins.PageComboResizer()]//动态分页大小

		}),
		viewConfig : {
			forceFit : true
		}
	});

	this.treePanel = new Ext.tree.TreePanel({
		title : '系统菜单',
		region : 'west',
		id:'menuTree',
		tbar: [],
		plugins: ['multifilter'],
		root : new Ext.tree.AsyncTreeNode({
			text : '菜单',
			id : '0',
			expanded:true
		}),
		tools:[{
		        id:'refresh',
		        scope:this,
		        handler: this.refreshTreePanel
		}],
		loader : new Ext.tree.TreeLoader({
			dataUrl : '../../menu/getTreeMenu.form'
		}),
		split : true,
		collapsible : true,
		rootVisible  : false,
		width : 200,
		maxWidth : 250,
		listeners:{
			click:function(node){
				Ext.getCmp("menu_grid").ownerCt.selectedNode=node.id;
				Ext.getCmp("menu_grid").ownerCt.store.load();
			}
		}
	});

	Menu.panel.superclass.constructor.call(this, {
		layout : 'border',
		items : [this.gridPanel, this.treePanel],
		listeners : {
			render : function() {
				this.addWin = new Menu.Add.win();
				this.queryMenu();
			}
		}
	});
}
Ext.extend(Menu.panel, Ext.Viewport, {
	initSave : function() {
		this.addWin.show();
		this.addWin.initAdd();
	},
	initUpdate : function() {
		var sm = this.gridPanel.getSelectionModel();
		var record = sm.getSelections();
		if (record.length == 0) {
			Utils.warn("请选择一条记录");
			return;
		}
		this.addWin.show();
		this.addWin.initUpdate(record[0].data);
	},
	queryMenu : function() {
		this.selectedNode="";
		this.store.load({
			parems : {
				start : 0,
				limit : 15
			}
		})
	},
	deleteMenu : function() {
		var sm = this.gridPanel.getSelectionModel();
		var record = sm.getSelections();
		if (record.length == 0) {
			Utils.warn("请选择一条记录");
			return;
		}
		var id = record[0].data.id;
		var conn = new Ext.data.Connection({
			method : 'post',
			url : '../../menu/delete.form'
		});
		Ext.MessageBox.confirm('系统提示', "是否删除菜单‘" + record[0].data.name + "’？",
				function(e) {
					if (e == 'yes') {
						Utils.request(conn, {
							params : {
								id : id
							},
							scope : this,
							success : function() {
								this.scope.queryMenu();
								this.scope.refreshTreePanel();
								Utils.info("菜单删除成功！");
							}
						});
					}
				}, this);

	},
	refreshTreePanel:function(){
		 this.treePanel.root.reload();
	},
	exportExcel:function(){
		var vExportContent = this.gridPanel.getExcelXml();
		if (Ext.isIE6 || Ext.isIE7 || Ext.isSafari || Ext.isSafari2	|| Ext.isSafari3) {
			var fd = Ext.get('frmDummy');
			if (!fd) {
				fd = Ext.DomHelper.append(Ext.getBody(), {
					tag : 'form',
					method : 'post',
					id : 'frmDummy',
					action : '../../exportexcel.jsp',
					target : '_blank',
					name : 'frmDummy',
					cls : 'x-hidden',
					cn : [{
						tag : 'input',
						name : 'exportContent',
						id : 'exportContent',
						type : 'hidden'
					}]
				}, true);
			}
			fd.child('#exportContent').set({
				value : vExportContent
			});
			fd.dom.submit();
		} else {
			document.location = 'data:application/vnd.ms-excel;base64,'
				+ Base64.encode(vExportContent);
		}
	}
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL = '../../resources/images/default/s.gif';
	var menu = new Menu.panel();
})
