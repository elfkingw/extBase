Ext.namespace("Role");
Role.panel = function(){
	this.roleId;
	this.addWin=null;
	this.queryName = new Ext.form.TextField({
		width:100
		
	});
	this.queryRoleId = new Ext.form.TextField({
		width:100
	});
	this.queryBtn = new Ext.Button({
		text:'查询',
		iconCls:'query',
		scope:this,
		handler:this.queryRole
	});
	this.store = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: '../../role/list.form'
		}),
		reader: new Ext.data.JsonReader({
			root: 'result',
			totalProperty: 'total',
			fields: ['id', 'roleName', 'description','status']
		}),listeners:{
			 beforeload :{    
	    	  	fn : function(thiz,options){
       	          Ext.apply(thiz.baseParams,
       	          { 
       	          	 name:this.queryName.getValue()
       	          });    
              },
              scope:this 
	    	}
		}
	});
	this.renderStatus = function(value){
		switch(value){
			case '01': return "有效";break;
			case '02': return "无效";break;
		}
	};
	this.colModel = new Ext.grid.ColumnModel({
		defaults: {
	        width: 100,
	        sortable: true,
	        align: 'center'
	    },
	    columns: [
			{header: '角色名称', dataIndex: 'roleName',width:200},
			{header: '描述', dataIndex: 'description',width:250},
			{header: '状态', dataIndex: 'status',renderer:this.renderStatus}
			
	    ]		
	});
	

	this.gridPanel = new Ext.grid.GridPanel({
		id:'role_grid',
		region: 'center',
		cm:this.colModel,
		store:this.store,
		stripeRows: true, 
		viewConfig:this.gridView,
		tbar:[
			new Ext.Button({text:'新增角色',id:'900001',iconCls:'table_add',scope:this,handler:this.initSave,disabled:true}),'-',
			new Ext.Button({text:'修改角色',id:'900002',iconCls:'table_edit',scope:this,handler:this.initUpdate,disabled:true}),
			new Ext.Button({text:'删除角色',id:'900003',iconCls:'table_delete',scope:this,handler:this.deleteRole,disabled:true}),
			'->','角色名称：',
			this.queryName,this.queryBtn
		],
        loadMask: {msg: '加载中，请稍候...'},
        bbar:new Ext.PagingToolbar({
			 pageSize: 15,
	         store: this.store,
	         items :['-',{text: '导出到Excel',iconCls:'excel',scope:this, handler : this.exportExcel}],
	         displayInfo: true,
	         displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
	         emptyMsg: "没有记录..."
		}),
		listeners:{
			rowclick:function(grid, rowIndex,e){
				var data = grid.store.getAt(rowIndex).data
				var treePanel = this.ownerCt.treePanel;
				this.ownerCt.roleId = data.id;
				var conn = new Ext.data.Connection({
					url:'../../role/queryMenuByRole.form',
					method:'post'
				});
				Utils.request(conn,{
					params:{roleId:data.id},
					treePanel:treePanel,
					success:function(data){
						var checkedArray = treePanel.getChecked();
						for(var j=0;j<checkedArray.length;j++){
							checkedArray[j].attributes.checked= false;
							checkedArray[j].getUI().checkbox.checked =false;
						}
						for(var i=0;i<data.root.length;i++){
							var node = treePanel.getNodeById(data.root[i].menuId);
							node.attributes.checked= true;
							node.getUI().checkbox.checked =true;
						}
					}
				});
				
			}
		}
	});
	function changeCheck(node, checked) {
		if (node.hasChildNodes()) {
			var childs = node.childNodes;
			for (var i = 0; i < childs.length; i++) {
				childs[i].getUI().checkbox.checked = checked;
				changeCheck(childs[i], checked);
			}
		}
		if(node.parentNode&&checked){
			if(node.parentNode.getUI().checkbox)
				node.parentNode.getUI().checkbox.checked = checked;
		}
	}
	this.treePanel = new Ext.tree.TreePanel({
		title:'角色权限',
		region:'east',
		root:new Ext.tree.AsyncTreeNode({text:'菜单',id:'0'}),
		loader:new Ext.tree.TreeLoader({dataUrl:'../../menu/getCheckTreeMenu.form'}),
		split:true,
		collapsible:true,
		expand:true,
		width:200,
		rootVisible :false,
		maxWidth:250,
		buttonAlign:'center',
		buttons:[new Ext.Button({text:'保存',id:'900004',scope:this,handler:this.saveUserRole,disabled:true})],
		listeners:{
			render:function(){
				this.expandAll();
			},
			checkchange:function(node,checked){
				changeCheck(node,checked);
			}
		}
	});
	this.userRoleConn = new Ext.data.Connection({
		url:'../../role/saveRoleMenu.form',
		method:'post'
	});
	this.deleteConn = new Ext.data.Connection({
			method:'post',
			url:'../../role/delete.form'
		});
	Role.panel.superclass.constructor.call(this,{
		layout:'border',
		items:[this.gridPanel,this.treePanel],
		listeners:{
			render:function(){
				this.addWin = new Role.Add.win();
				this.queryRole();
				Utils.renderPrivilege();
			}
		}
	});
}
Ext.extend(Role.panel,Ext.Viewport,{
	initSave:function(){
		this.addWin.show();
		this.addWin.initAdd();
	},
	initUpdate:function(){
		var sm = this.gridPanel.getSelectionModel();
		var record = sm.getSelections();
		if(record.length ==0){
			Utils.warn("请选择一条记录");
			return;
		}
		this.addWin.show();
		this.addWin.initUpdate(record[0].data);
	},
	queryRole:function(){
		this.store.load({
			parems:{
				start:0,
				limit:15
			}
		})
	},
	deleteRole:function(){
		var sm = this.gridPanel.getSelectionModel();
		var record = sm.getSelections();
		if(record.length ==0){
			Utils.warn("请选择一条记录");
			return;
		}
		var id  = record[0].data.id;
		var conn = this.deleteConn;
		Ext.MessageBox.confirm('系统提示', "是否删除角色<font color=red>'"+ record[0].data.roleName+"'</font>？", function(e) {
			if (e == 'yes') {
				Utils.request(conn,{
					params:{
						id:id
					},
					scope:this,
					success:function(){
						this.scope.queryRole();
						Utils.info("角色删除成功！");
					}
				});
			} 
		}, this);
	},
	saveUserRole:function(){
		var checkeds = this.treePanel.getChecked("id");
		Utils.request(this.userRoleConn,{
			params:{
				roleId:this.roleId,
				menus:checkeds
			},
			success:function(data){
				Utils.info("操作成功！");
			}
		});
	},exportExcel:function(){
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
			fd.child('#exportContent').set({value : vExportContent});
			fd.dom.submit();
		} else {
			document.location = 'data:application/vnd.ms-excel;base64,'+ Base64.encode(vExportContent);
		}
	}
});

Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL='../../resources/images/default/s.gif';
	var role = new Role.panel();
})
