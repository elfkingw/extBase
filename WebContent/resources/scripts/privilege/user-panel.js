Ext.namespace("User");
User.panel = function(){
	this.addWin=null;
	this.currentUser = null;
	this.queryName = new Ext.form.TextField({
		width:100
		
	});
	
	this.queryBtn = new Ext.Button({
		text:'查询',
		iconCls:'query',
		scope:this,
		handler:this.queryUser
	});
	this.store = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: '../../user/list.form'
		}),
		reader: new Ext.data.JsonReader({
			root: 'result',
			totalProperty: 'total',
			fields: ['id', 'userName','cnname', 'createTime','email','birthday', 'sex','status']
		}),listeners:{
			 beforeload :{    
	    	  	fn : function(thiz,options){
       	          Ext.apply(thiz.baseParams,
       	          { 
       	          	 cnname:this.queryName.getValue()
       	          });    
              },
              scope:this 
	    	}
		}
	});
	this.renderStatus = function(value){
		return Utils.getPamarmById(Utils.STATUS,value);
	};
	this.renderDate  = function(value){
		return value?value.substring(0,10):'';
	}
	this.renderSex = function(value){
		var renderValue;
		switch(value){
			case '01':returnValue = '<div class="male" style="height: 16px;background-repeat: no-repeat;text-align:left">'
							  	 +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;男</div>';break;
			case '02':returnValue = '<div class="female" style="height: 16px;background-repeat: no-repeat;text-align:left">'
							  	 +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;女</div>';break;
			default: returnValue = value;				  	 
		}				  	
   		return returnValue;
	}
	this.colModel = new Ext.grid.ColumnModel({
		defaults : {
			width : 100,
			sortable : true
		},
		columns : [{header : '用户登录名',dataIndex : 'userName'}, 
			{header : '用户名',dataIndex : 'cnname'}, 
			{header : 'E-mail',	dataIndex : 'email',id:'email',width : 150}, 
			{header : '性别',dataIndex : 'sex',	renderer : this.renderSex,width : 40}, 
			{header : '生日',dataIndex : 'birthday',renderer : this.renderDate,align:'center'}, 
			{header : '状态',dataIndex : 'status',renderer : this.renderStatus,align:'center'}
		]
	});
	this.gridView=new Ext.grid.GridView({
		forceFit :true,
    	 getRowClass : function(record, rowIndex, p, store){ 
                if(record.data.status=='02'){ 
                    return 'grid-row-canel'; 
                } 
            } 
    }); 
	this.gridPanel = new Ext.grid.GridPanel({
//		title:'用户信息',
//		header:'false',
		excelTitle:'用户信息',
		id:'user_grid',
		region: 'center',
		cm:this.colModel,
		store:this.store,
		stripeRows: true, 
		autoExpandColumn:'email',
		viewConfig:this.gridView,
		tbar:[
			{text:'新增用户',iconCls:'table_add',scope:this,handler:this.initSave},'-',
			{text:'修改用户',iconCls:'table_edit',scope:this,handler:this.initUpdate},
			{text:'作废用户',iconCls:'table_delete',scope:this,handler:this.cancelUser},
			{text:'启用用户',iconCls:'table_row_insert',scope:this,handler:this.resumUser},
			'->','用户名称：',
			this.queryName,this.queryBtn		],
      		 loadMask: {msg: '加载中，请稍候...'},
      		 bbar:new Ext.PagingToolbar({
			 pageSize: 15,
	         store: this.store,
	         displayInfo: true,
	         items :['-',{text: '导出到Excel',iconCls:'excel',scope:this, handler : this.exportExcel}],
	         displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
	         emptyMsg: "没有记录..."
		}),
        listeners:{
        	rowclick : function( grid,rowIndex){
        		var id = grid.store.getAt(rowIndex).data['id'];
        		grid.ownerCt.currentUser=id;
        		grid.ownerCt.roleStore.load();
        		grid.ownerCt.roleGridPanel.expand();
        	}
        }
	});
	
	this.roleStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../../user/getRoleByUser.form'
		}),
		reader : new Ext.data.JsonReader({
			root : 'result',
			totalProperty : 'total',
			fields : ['id', 'roleName', 'description', 'status']
		}),
		listeners : {
			beforeload : {
				fn : function(thiz, options) {
					Ext.apply(thiz.baseParams, {
						id : this.currentUser
					});
				},
				scope : this
			}
		}
	});	
	
	this.roleColModel = new Ext.grid.ColumnModel({
		columns:[
			{header:'角色名称',dataIndex:'roleName'},
			{header:'描述',dataIndex:'description'}
		]
	});
	this.roleGridPanel = new Ext.grid.GridPanel({
		title:'角色',
		region:'east',
		split:true,
		collapsed:true,
		width:250,
		collapsible:true,
		cm:this.roleColModel,
		store:this.roleStore,
		loadMask: {msg: '加载中，请稍候...'},
        viewConfig: { forceFit: true }
		
	});
	this.updateStatusConn = new Ext.data.Connection({
			method:'post',
			url:'../../user/updateStatus.form'
		});
	User.panel.superclass.constructor.call(this,{
		layout:'border',
		items:[this.gridPanel,this.roleGridPanel],
		listeners:{
			render:function(){
				this.addWin = new User.Add.win();
				this.queryUser();
			}
		}
	});
}
Ext.extend(User.panel,Ext.Viewport,{
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
	queryUser:function(){
		this.store.load({
			parems:{
				start:0,
				limit:15
			}
		})
	},
	cancelUser:function(){
		var sm = this.gridPanel.getSelectionModel();
		var record = sm.getSelections();
		if(record.length ==0){
			Utils.warn("请选择一条记录");
			return;
		}
		if(record[0].data.status =='02'){
			Utils.info("用户<font color=red>‘"+ record[0].data.cnname+"’</font>已是作废状态");
			return;
		}
		var id  = record[0].data.id;
		var conn = this.updateStatusConn;
		Ext.MessageBox.confirm('系统提示', "是否作废用户<font color=red>‘"+ record[0].data.cnname+"’</font>？", function(e) {
			if (e == 'yes') {
				Utils.request(conn,{
					params:{
						id:id,
						status:'02'
					},
					scope:this,
					success:function(){
						record[0].data.status='02';
						record[0].commit();
						Utils.info("作废用户成功！");
					}
				});
			} 
		}, this);
	},
	resumUser:function(){
		var sm = this.gridPanel.getSelectionModel();
		var record = sm.getSelections();
		if(record.length ==0){
			Utils.warn("请选择一条记录");
			return;
		}
		var id  = record[0].data.id;
		if(record[0].data.status =='01'){
			Utils.info("用户<font color=red>‘"+ record[0].data.cnname+"’</font>已是启用状态");
			return;
		}
		var conn = this.updateStatusConn;
		Ext.MessageBox.confirm('系统提示', "是否启用用户<font color=red>‘"+ record[0].data.cnname+"’</font>？", function(e) {
			if (e == 'yes') {
				Utils.request(conn,{
					params:{
						id:id,
						status:'01'
					},
					scope:this,
					success:function(){
						record[0].data.status='01';
						record[0].commit();
						Utils.info("启用用户成功！");
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

Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL='../../resources/images/default/s.gif';
	var user = new User.panel();
})
