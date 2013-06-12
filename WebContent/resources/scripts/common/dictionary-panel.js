Ext.namespace("Dictionary");
Dictionary.panel = function(){
	this.dictionaryId;
	this.addWin=null;
	this.selectedNode=null;
	this.txtDicName = new Ext.form.TextField({
		fieldLabel:'字典名称',
		maxLength:60,
		width:100,
		name:'dicName'
	});
	this.queryBtn = new Ext.Button({
		text : '查询',
		iconCls : 'query',
		scope : this,
		handler : this.query
	});
	this.store = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: '../../dictionary/list.form'
		}),
		remoteSort:true,
		reader: new Ext.data.JsonReader({
			root: 'result',
			totalProperty: 'total',
			fields: ['id','dicType','dicType.id','dicType.dicNote','dicType.dicType','dicCode','dicName','remark']
		}),listeners:{
			 beforeload :{    
	    	  	fn : function(thiz,options){
       	          Ext.apply(thiz.baseParams,
       	          { 
       	          	 dicName:this.txtDicName.getValue(),
       	          	 dicType:this.selectedNode
       	          });    
              },
              scope:this 
	    	}
		}
	});

	this.colModel = new Ext.grid.ColumnModel({
		defaults: {
	        width: 100,
	        sortable: true
	    },
	    columns: [{header:'字典类型',dataIndex:'dicType.dicNote',align:'center'},{header:'类型编码',dataIndex:'dicType.dicType'},{header:'字典代码',dataIndex:'dicCode'},{header:'字典名称',dataIndex:'dicName'},{header:'备注',dataIndex:'remark'}]
	});
	this.editButton = new Ext.Button({text:'编辑',id:'900002',iconCls:'table_edit',scope:this,handler:this.initUpdate,disabled:true});
	this.gridPanel = new Ext.grid.GridPanel({
		id:'dictionary_grid',
		region: 'center',
		cm:this.colModel,
		store:this.store,
		stripeRows: true, 
		viewConfig : {
			forceFit : true
		},
		tbar:[
			new Ext.Button({text:'新增',id:'900001',iconCls:'table_add',scope:this,handler:this.initSave}),'-',
			this.editButton,'-',
			new Ext.Button({text:'删除',id:'900003',iconCls:'table_delete',scope:this,handler:this.del,disabled:true}),
			'->','字典名称:',this.txtDicName,this.queryBtn
		],
        loadMask: {msg: '加载数据,请稍候...'},
      	bbar:new Ext.PagingToolbar({
			 pageSize: 15,
	         store: this.store,
	         items :['-',{text: '导出到Excel',iconCls:'excel',scope:this, handler : this.exportExcel}],
	         displayInfo: true,
	         displayMsg: '显示第 {0} 条到 {1} 条记录，共 {2} 条',
	         emptyMsg: "没有记录...",
	         plugins:[new Ext.ux.plugins.PageComboResizer()]//动�1�7�分页大射1�7
		}),
		listeners:{
			rowdblclick :function(grid, rowIndex,e){
				var record = grid.store.getAt(rowIndex);
				grid.ownerCt.addWin.show();
				if(grid.ownerCt.editButton.disabled)
					grid.ownerCt.addWin.showDetail(record.data,false);
				else
					grid.ownerCt.addWin.showDetail(record.data,true);
			}
		}
	});
	this.treePanel = new Ext.tree.TreePanel({
		title : '数据字典类型',
		region : 'west',
		id:'dictionaryTree',
		tbar: [],
		plugins: ['multifilter'],
		root : new Ext.tree.AsyncTreeNode({
			text : '字典类型',
			id : '0',
			expanded:true
		}),
		tools:[{
		        id:'refresh',
		        scope:this,
		        handler: this.refreshTreePanel
		}],
		loader : new Ext.tree.TreeLoader({
			dataUrl : '../../dictionary/getTree.form'
		}),
		split : true,
		collapsible : true,
		rootVisible  : true,
		width : 200,
		maxWidth : 250,
		listeners:{
			click:function(node){
				if(node.isLeaf())
					Ext.getCmp("dictionary_grid").ownerCt.selectedNode=node.id;
				else
					Ext.getCmp("dictionary_grid").ownerCt.selectedNode="";
				Ext.getCmp("dictionary_grid").ownerCt.store.load();
				
			}
		}
	});
	this.deleteConn = new Ext.data.Connection({
		method:'post',
		url:'../../dictionary/delete.form'
	});
	
	Dictionary.panel.superclass.constructor.call(this,{
		layout:'border',
		items:[this.gridPanel,this.treePanel],
		listeners:{
			render:function(){
				this.addWin = new Dictionary.Add.win();
				this.query();
				Utils.renderPrivilege();
			}
		}
	});
}
Ext.extend(Dictionary.panel,Ext.Viewport,{
	initSave:function(){
		this.addWin.show();
		this.addWin.initAdd();
	},
	initUpdate:function(){
		var sm = this.gridPanel.getSelectionModel();
		var record = sm.getSelections();
		if(record.length ==0){
			Utils.warn("请�选择一条记录！");
			return;
		}
		this.addWin.show();
		this.addWin.initUpdate(record[0].data);
	},
	query:function(){
		this.selectedNode="";
		this.store.load({
			parems:{
				start:0,
				limit:15
			}
		});
	},
	del:function(){
		var sm = this.gridPanel.getSelectionModel();
		var record = sm.getSelections();
		if(record.length ==0){
			Utils.warn("请�选择一条条记录！")
			return;
		}
		var id  = record[0].data.id;
		var conn = this.deleteConn;
		Ext.MessageBox.confirm('系统提示', "是否删除<font color=red>'"+ record[0].data.dicName+"'</font>?", function(e) {
			if (e == 'yes') {
				Utils.request(conn,{
					params:{
						id:id
					},
					scope:this,
					success:function(){
						this.scope.query();
						Utils.info("删除成功");
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
	var dictionary = new Dictionary.panel();
})
