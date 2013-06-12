Ext.namespace("Notice");
Notice.panel = function(){
	this.noticeId;
	this.addWin=null;
	this.store = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: '../../notice/list.form'
		}),
		remoteSort:true,
		reader: new Ext.data.JsonReader({
			root: 'result',
			totalProperty: 'total',
			fields: ['id','noticeName','noticeContent','createUserId','noticeTime','createTime']
		}),listeners:{
			 beforeload :{    
	    	  	fn : function(thiz,options){
       	          Ext.apply(thiz.baseParams,
       	          { 
       	          	 //name:this.queryName.getValue()
       	          });    
              },
              scope:this 
	    	}
		}
	});
	
    this.renderUser = function(value){
    	return parent.Main.Global.users[value];
    }
	this.colModel = new Ext.grid.ColumnModel({
		defaults : {
			width : 100,
			sortable : true
		},
		columns : [
			{header : '标题',dataIndex : 'noticeName'}, 
			{header : '发布人',dataIndex : 'createUserId',renderer:this.renderUser}, 
			{header : '创建时间',dataIndex : 'noticeTime'},
			{header : '创建时间',dataIndex : 'createTime'}
		]
	});
	this.editButton = new Ext.Button({text:'编辑',id:'900002',iconCls:'table_edit',scope:this,handler:this.initUpdate,disabled:true});
	this.gridPanel = new Ext.grid.GridPanel({
		id:'notice_grid',
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
			new Ext.Button({text:'删除',id:'900003',iconCls:'table_delete',scope:this,handler:this.del,disabled:true})
		],
        loadMask: {msg: '加载数据,请稍倄1�7...'},
      	bbar:new Ext.PagingToolbar({
			 pageSize: 15,
	         store: this.store,
	         items :['-',{text: '导出到Excel',iconCls:'excel',scope:this, handler : this.exportExcel}],
	         displayInfo: true,
	         displayMsg: '显示第 {0} 条到 {1} 条记录，共 {2} 页',
	         emptyMsg: "没有记录...",
	         plugins:[new Ext.ux.plugins.PageComboResizer()]//
		}),
		listeners:{
			rowdblclick :function(grid, rowIndex,e){
				var record = grid.store.getAt(rowIndex);
				grid.ownerCt.addWin.show();
				if(grid.ownerCt.editButton.disabled)
					grid.ownerCt.addWin.showDetail(record.data,false);
				else
					grid.ownerCt.addWin.showDetail(record.data,true);
			},
			rowclick:function(grid, rowIndex,e){
				var record = grid.store.getAt(rowIndex);
				grid.ownerCt.detailTemp.overwrite(grid.ownerCt.detailPanel.body, record.data);
			}
		}
	});
	this.detailTemp =  new Ext.Template(
          '<div style="padding-left: 10px;padding-top:10px;" >',
          		'{noticeContent}',
            '</div>'
     );
	this.detailPanel = new Ext.Panel({
		title:'详细信息',
		split:true,
		height:300,
		collapsible : true,
		autoScroll:true,
		region:'south'
	});
	this.deleteConn = new Ext.data.Connection({
		method:'post',
		url:'../../notice/delete.form'
	});
	
	Notice.panel.superclass.constructor.call(this,{
		layout:'border',
		items:[this.gridPanel,this.detailPanel],
		listeners:{
			render:function(){
				this.addWin = new Notice.Add.win();
				this.query();
				Utils.renderPrivilege();
			}
		}
	});
}
Ext.extend(Notice.panel,Ext.Viewport,{
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
			Utils.warn("请�选择一条记录！")
			return;
		}
		var id  = record[0].data.id;
		var conn = this.deleteConn;
		Ext.MessageBox.confirm('系统提示', "是否删除<font color=red>'"+ record[0].data.noticeName+"'</font>?", function(e) {
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
	var notice = new Notice.panel();
})
