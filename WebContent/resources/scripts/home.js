Ext.namespace("Home");
Ext.namespace("Home.Message");

Home.porlet = function(){
	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
	this.timePanel = new Ext.ux.Portlet({
		id:'calendar',
		title:'日历',
		height:250,
		closeAction:'hide',
		hidden:true,
		autoScroll:true,
		html:"<div id='calendar1'></div>",
		tools:[{
		        id:'gear',
		        handler: function(){
		            Ext.Msg.alert('Message', 'The Settings tool was clicked.');
		        }
		    },{
		        id:'close',
		        handler: function(e, target, panel){
		           Ext.getCmp(panel.id+'_check').setChecked(false);
		           panel.hide();
		        }
		}]
	});
	this.taskPanel = new Ext.ux.Portlet({
		title:'任务',
		height:250,
		id:'task',
		closeAction:'hide',
		hidden:true,
		autoScroll:true,
		tools:[{
		        id:'refresh',
		        handler: function(){
		            Ext.Msg.alert('Message', 'The Settings tool was clicked.');
		        }
		    },{
		        id:'close',
		        handler: function(e, target, panel){
		            Ext.getCmp(panel.id+'_check').setChecked(false);
		            panel.hide();
		        }
		    }]
	});
	this.messageStore =  new Ext.data.JsonStore({
	    url: './notice/list.form',
	    root: 'result',
	    fields: [
	        'noticeName', 'noticeTime','noticeContent'
	    ]
	});
	this.messageTemplate = new Ext.XTemplate(
		'<table width="97%" >',
			'<tpl for=".">',
			'<tr >',
	           '<td  style="padding-left: 5px;padding-top: 0px;font-size: 13px; ">',
	           '<a class="user-message" href="#" >{noticeName}</a> ',
	           '</td>',
	           '<td align="right" style="padding-left: 5px;padding-top: 1px;font-size: 13px; ">',
	             '{noticeTime}',
	           '</td>',
	         '</tr>',
	        '</tpl>',
	     '</table>'
	);
	this.messageView = new Ext.DataView({
        id: 'message-list',
        store:this.messageStore,
        autoHeight: true,
        singleSelect: true,
        tpl: this.messageTemplate,
        itemSelector: 'a.user-message',
        loadingText: '加载中，请稍候...',
        emptyText: '没有公告',
        listeners:{
        	render:function(){
        		this.store.load();	
        	}
        }
    });	
    this.messageView.on('click', this.messageDetail, this);
	this.messagePanel = new Ext.ux.Portlet({
		id:'notice',
		title:'公告',
		closeAction:'hide',
		hidden:true,
		height:250,
		iconCls:'notice',
		autoScroll:true,
		tools:[{
		        id:'refresh',
		        scope:this,
		        tip:'刷新公告',
		        handler: this.refrushMessage
		    },{
		        id:'close',
		        handler: function(e, target, panel){
		        	Ext.getCmp(panel.id+'_check').setChecked(false);
		            panel.hide();
		        }
		}],
		items:[this.messageView]
	});
	
	this.noticePanel = new Ext.ux.Portlet({
		id:'message',
		title:'信箱',
		closeAction:'hide',
		hidden:true,
		height:250,
		autoScroll:true,
		tools:[{
		        id:'gear',
		        handler: function(){
		            Ext.Msg.alert('Message', 'The Settings tool was clicked.');
		        }
		    },{
		        id:'close',
		        handler: function(e, target, panel){
		            Ext.getCmp(panel.id+'_check').setChecked(false);
		            panel.hide();
		        }
		    }]
	});
	
	this.userPageConn = new Ext.data.Connection({
		method:'post',
		url: './user/getHomePage.form'
	});
	this.saveCon = new Ext.data.Connection({
		method:'post',
		url: './user/saveConfig.form'
	});
	this.toolBar = new Ext.Toolbar({
		id:'toolBar',
		region:'north',
		height:30,
		items:['-',{
			text:'保存配置',
			iconCls:'save',
			scope:this,
			handler:function(){
				var portal=this.getComponent(1);
   				 var items=portal.items;
   				 var homepages =[];
   				 var cols =[];
   				 var row = [];
   				 var ishide =[];
				 for(var i=0;i<items.getCount();i++){
				    var c=items.get(i); 
				    var j =0;
				     c.items.each(function(portlet){
						 homepages.push(portlet.getId());
				    	 cols.push(i);
				    	 row.push(j);
				    	 if(Ext.getCmp(portlet.getId()+'_check').checked){
				    	 	ishide.push(1);
				    	 }else{
				    	 	ishide.push(0);
				    	 }
						 j++;
				     })

			    }
			    Utils.request(this.saveCon,{
			    	params:{
			    		homepage:homepages,
				    	col:cols,
				    	row:row,
				    	ishide:ishide
			    	},
			    	success:function(){
			    		Utils.info("保存成功！");
			    	}
			    })
			}
		}]
	});
	
	this.messageConn = new Ext.data.Connection({
		method:'post',
		url: './notice/list.form'
	});
	
	this.leftColum = new Ext.ux.PortalColumn({
		 columnWidth:.45,
         style:'padding:10px 0 10px 10px',
         items:[this.messagePanel,this.taskPanel]
	});
	this.rightColum = new Ext.ux.PortalColumn({
		 columnWidth:.54,
         style:'padding:10px 0 10px 10px',
         items:[this.noticePanel,this.timePanel]
	})
	Home.porlet.superclass.constructor.call(this,{
		layout:'border',	
		items:[this.toolBar, {xtype:'portal',id:'mainPortal',
            region:'center',
            items:[this.leftColum,this.rightColum]
        }],
        listeners:{
        	render:this.initTool
        }
           
	});
}
Ext.extend(Home.porlet,Ext.Viewport,{
	refrushMessage:function(){
		this.messageStore.load();
	},
	messageDetail:function(dataView,index,node,e ) {
		var store = dataView.getStore();
		var data = store.getAt(index).data;
		if(!Home.Message.win.instence){
			Home.Message.win.instence = new Home.Message.win();
		}
		Home.Message.win.instence.show();
		Home.Message.win.instence.showMessage(data);
	},
	initTool:function(){
		Utils.request(this.userPageConn,{
		params:{dicType:Utils.HOME_CONFIG},
		scope:this,
		success:function(data){
			this.scope.homeItems =new Ext.Button({
				text:'页面配置',
				iconCls:'config',
				menu:[]
			})
			var diclist = data.dic;
			var ulist = data.home;
			for(var i=0;i<diclist.length;i++){
				var o = {};
				o.text = diclist[i].dicName;
				o.checked=false;
				o.name= diclist[i].dicCode;
				o.id=diclist[i].dicCode+'_check';
				o.scope = this;
				o.listeners = {
					click:function(button){
						if(button.checked == false){
							Ext.getCmp(button.name).show();
						}else{
							Ext.getCmp(button.name).hide();
						}
					}
				}
				
				for(var j=0;j<ulist.length;j++){
					if(ulist[j].homePage == diclist[i].dicCode && ulist[j].ishide==1){
						o.checked=true;
					}
				}
				this.scope.homeItems.menu.add(o);
			}
			this.scope.toolBar.insertButton(0,this.scope.homeItems);
			this.scope.toolBar.doLayout();
			for(var k=0;k<ulist.length;k++){
				var o = ulist[k];
				if(o.col ==0){
					this.scope.leftColum.add(Ext.getCmp(o.homePage));
					if(o.ishide==1){
						Ext.getCmp(o.homePage).show();
					}
				}else if(o.col ==1){
					this.scope.rightColum.add(Ext.getCmp(o.homePage));
					if(o.ishide==1){
						Ext.getCmp(o.homePage).show();
					}
				}
			}
			if(ulist.length>0){
				this.scope.doLayout();
			}
		}
	});
	},
	checkPage:function(){
		
	},
	showLoading: function(flag) {
		if (!this.lm)
			this.lm = new Ext.LoadMask('message', {msg: '更新中，请稍候...'});
		if (flag) this.lm.show();
		else this.lm.hide();
	}
});

Home.Message.win = function(){
	this.contentTemp = new Ext.XTemplate(
	'<div style="text-align:center;font-size: 24px;"><h1>{noticeName}</h1></div>',
	'<div style=" padding-top:10px;padding-right:10px;color:#999999; font-size: 12px;text-align:right;">',
		'时间:{noticeTime}',
	'</div>',
	'<hr/>',
		'{noticeContent}'
	);
	Home.Message.win.superclass.constructor.call(this,{
		title:'信息详情',
		closeAction:'hide',
		iconCls:'notice',
		autoScroll:true,
		bodyStyle:'padding-left:20px;padding-top:5px;padding-right:20px;',
		width:700,
		height:400,
		maximizable :true,
		buttons:[{text:'关闭',scope:this,handler:function(){this.hide();}}],
		buttonAlgin:'right'
	})
}
Ext.extend(Home.Message.win,Ext.Window,{
	showMessage:function(data){
		this.contentTemp.overwrite(this.body, data);
	}
})
Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL='./resources/images/default/s.gif';
	var porlet = new Home.porlet();
	
		
});