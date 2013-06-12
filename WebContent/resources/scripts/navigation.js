Ext.namespace("Navigation");
//cookie操作 控制菜单样式
Navigation.cp = new Ext.state.CookieProvider(); 
Ext.state.Manager.setProvider(Navigation.cp); 

Navigation.menu = function(){
	
	this.conn = new Ext.data.Connection({
		url:'./privilege/getMenus.form'
	});
	Navigation.menu.superclass.constructor.call(this,{
	   height:35,
	   renderTo:'menu',
	   items:[]	
	});
};

Ext.extend(Navigation.menu,Ext.Toolbar,{
	initMenu:function(){
		Utils.request(this.conn,{
			params:{},
			scope:this,
			success:function(data){
				var menus = data.menus;
				var topMenus =[];
				var menuCache ={};
				Ext.each(menus,function(m,index,array){
					if(!m.parentMenuId){
						topMenus.push(new Ext.Toolbar.Button({
							text:m.name,
							id:m.menuId,
							iconCls:m.icon,
							scale: 'medium',
							menu:new Ext.menu.Menu({
								items:[]
							})
						}));
					}else{
						if(m.isLeaf=='02'){//不是子节点
							if(!menuCache[m.parentMenuId])
								menuCache[m.parentMenuId]=[];
							menuCache[m.parentMenuId].push({text:m.name,id:m.menuId,iconCls:m.icon,isLeaf:false,menu:new Ext.menu.Menu({items:[]})});
						}else{
							if(!menuCache[m.parentMenuId])
								menuCache[m.parentMenuId]=[];
							menuCache[m.parentMenuId].push({text:m.name,id:m.menuId,iconCls:m.icon,isLeaf:true,menuUrl:m.url,handler:this.open});
						}
					}
				},this.scope);
				
				//加帮助
				topMenus.push(new Ext.Toolbar.Button({
						text:'帮助',
						iconCls:'help',
						scale: 'medium',
						menu:new Ext.menu.Menu({
							items:[
								{
									text:'关于',iconCls:'help16',isLeaf:true,menuUrl:'',handler:function(){Ext.MessageBox.show({
										title: "关于",
										msg: "elfkingw 基于ExtJs UI 解决方案@About elfkingw@gmail.com",
										buttons: Ext.MessageBox.OK,
										closable: false,
										iconCls: "help16"
								});}
								}
							]
						})
				}));
				
			   Ext.each(topMenus,function(me,index,array){
			   	    var list = menuCache[me.id];
			   	    if(list != undefined){
				   		for(var i =0;i<list.length;i++){
				   			if(list[i].isLeaf==false)
				   			{
				   				list[i].menu.add(menuCache[list[i].id]);
				   			}
				   		}
			   			me.menu.add(menuCache[me.id]);
			   	    }
			   		this.add(me);
			   },this.scope);
			   this.scope.doLayout();
			}
		});
	},
	open:function(menu){
		Main.instance.openTab({id:menu.id,title:menu.text,src:menu.menuUrl,closable:true});
	}
});

Navigation.treeMenu = function(){
	this.conn = new Ext.data.Connection({
		url:'./privilege/getTopMenus.form'
	});
	Navigation.treeMenu.superclass.constructor.call(this,{
		title:'菜单',
		width:200,
		region:'west',
		maxWidth:250,
		split:true,
		collapsible: true,
        margins:'5 0 5 5',
        layout:'accordion',
        collapsible: true,
        layoutConfig:{
           animate:false
        },
		items:[]
	});
};
Ext.extend(Navigation.treeMenu,Ext.Panel,{
	initMenu:function(){
		Utils.request(this.conn,{
			params:{},
			scope:this,
			success:function(data){
				var menus = data.menus;
				Ext.each(menus,function(m,index,array){
					var treePanel= new Ext.tree.TreePanel({
						root:new Ext.tree.AsyncTreeNode({text:'我是根',id:m.menuId}),
						loader: new Ext.tree.TreeLoader({dataUrl:'./privilege/getChildMenus.form'}),
						title:m.name,
						rootVisible:false,
						listeners:{
							click:function(node){
								var menu= node.attributes;
								Main.instance.openTab({id:menu.id,title:menu.text,src:menu.url,closable:true})
							}
						}
					});
					this.add(treePanel);
				},this.scope)
				this.scope.doLayout();
			}
		});
	}
	
});

Navigation.tool = function(){
	this.homeBtn = new Ext.Button({
		text:'主页',
		tooltip:'点击返回到主页',
		iconCls:'password',
		handler:this.updatePassword
	});
	this.updatePwBtn = new Ext.Button({
		text:'修改密码',
		tooltip:'修改密码',
		iconCls:'password',
		handler:this.updatePassword
	});
	this.logout = new Ext.Button({
		text:'系统注销',
		tooltip:'系统注销',
		iconCls:'logout',
		handler:this.userLogout
	});
	var menuStyle = Navigation.cp.get("menuStyle")
	if(menuStyle&&menuStyle=='tree'){
		this.treeChecked=true;
		this.commonChecked=false;
	}else{
		this.treeChecked=false;
		this.commonChecked=true;
	}
	this.changeStyle= new Ext.Toolbar.Button({
		text:'菜单风格',
		iconCls:'switch',
		tooltip:'菜单风格',
		menu:[
			 {
                text: '树型菜单',
                checked: this.treeChecked,
                group: 'theme',
                id:'tree',
                listeners:{
	                click:this.changeStyle 
                }
             }, {
                text: '传统菜单',
                checked: this.commonChecked,
                group: 'theme',
                id:'common',
                listeners:{
	                click:this.changeStyle 
                }
            }
		]
	});
	
	this.conn = new Ext.data.Connection({
		url:'./user/getCurrentUser.form',
		method:'post'
	});
	
	Navigation.tool.superclass.constructor.call(this,{
		height:27,
		renderTo:'menu',
		items:['->','在线用户：','-',this.updatePwBtn,'-',this.changeStyle,'-',this.logout]
	});
};
Ext.extend(Navigation.tool,Ext.Toolbar,{
	initToolBar:function(){
		Utils.request(this.conn,{
			params:{},
			scope:this,
			success:function(data){
				this.scope.insertButton(2,new Ext.Toolbar.TextItem("<font color='#0000FF' face='Verdana, Arial, Helvetica, sans-serif' style='font-weight: bolder;'>"+data.userInfo.cnname+"</font>"));	
				this.scope.doLayout();		
			}
		});
	},
	changeStyle:function(menu){
		if(menu.id=='tree'){
			Navigation.cp.set("menuStyle",'tree');
		}else{
			Navigation.cp.set("menuStyle",'tool');
		}
		window.location.href="main.html";
	},
	updatePassword:function(){
		if(!Update.Password.win.instance){
			Update.Password.win.instance = new Update.Password.win();
		}
		Update.Password.win.instance.resetForm();
		Update.Password.win.instance.show();
	},
	userLogout:function(button){
		var con = new Ext.data.Connection({
			url:'./user/logout.form',
			method:'post'
		});
		Utils.request(con,{
			params:{},
			success:function(){
				window.location.href='./login.html';
			}
		})
	}
});

