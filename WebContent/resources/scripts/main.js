Ext.namespace("Main");
Main.htmlTab = function(o){
	Main.htmlTab.superclass.constructor.call(this,{
		id:o.id,
		title:o.title,
		closable : (!o.closable) ? false : o.closable,
		tabTip:o.title,
		html : ['<iframe name="frame-', o.id, 
		          '" scrolling="auto" frameborder="0" ',
		          ' width="100%" height="100%" src="',
				  o.src, '"></iframe>'].join('')
	});
};

Ext.extend(Main.htmlTab,Ext.Panel,{
	refresh:function(url){
		window.frames['frame-'+this.id].location = url; 
	}	
});


Main.container = function(menuStyle){
	this.homeTab = new Main.htmlTab({
		id:'homeTable',
		title:'工作首页',
		src:'home.html'
	});
	this.tabPosition ='bottom';
	if(menuStyle&&menuStyle=='tree'){
		var margin='5 5 5 0';
		this.tabPosition='top';
	}else{
		var margin='5 5 0 5';
	}
	
	Main.container.superclass.constructor.call(this,{
		region:'center',
		activeTab: 0,
        tabPosition: this.tabPosition,
 		margins:margin,
        resizeTabs : true,
        tabWidth : 120,
        minTabWidth : 120,
        enableTabScroll : true,
		items:[this.homeTab]
	});
};
Ext.extend(Main.container,Ext.TabPanel,{
	openTab:function(o){
		var tabId = 'tab-'+o.id;
		var tab = Ext.getCmp(tabId);
		if(tab){
			tab.refresh(o.src);
		}else{
			tab = new Main.htmlTab({
				id:'tab-'+o.id,
				title:o.title,
				closable:o.closable,
				src:o.src
			})
			this.add(tab);
		}
		this.setActiveTab(tab);
	},
	closeTab:function(tId){
		var tabId = 'tab-' + tId;
		var tab = this.getComponent(tabId);
		if (tab) {
			this.remove(tab);
		}
	}
});

Main.initUI = function(){
	 var cp = new Ext.state.CookieProvider(); 
	 Ext.state.Manager.setProvider(cp); 
	 var menuStyle = cp.get("menuStyle");
	Main.instance = new Main.container(menuStyle);
	if(menuStyle&&menuStyle=='tree'){
		var menu = new Navigation.treeMenu();
		var northHeight  =25;
	}else{
		var menu = new Navigation.menu();
		var northHeight  =50;
	}
	var tool = new Navigation.tool();
	var mainPanel = new Ext.Viewport({
		layout:'border',
		items:[Main.instance,new Ext.BoxComponent({
                region: 'north',
                el: 'menu'
//                height: northHeight
        }),menu]
	});
	tool.initToolBar();
	menu.initMenu();
};

Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL='./resources/images/default/s.gif';
	Main.initUI();
})

