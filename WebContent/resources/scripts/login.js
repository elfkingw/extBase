
Ext.namespace("Login");

Login.form = function() {
	this.txtUsername = new Ext.form.TextField({
        width: 130,
        fieldLabel: '用户名',
        maxLength: 30,
        allowBlank: false,
        blankText: '请输入用户名!'
    }); 
	this.txtPassword = new Ext.form.TextField({
        width: 130,
        fieldLabel: '密码',
        inputType: 'password',
        maxLength: 20,
        allowBlank: false,
        value: '',
        blankText: '请输入密码!'
    }); 
    this.btnLogin = new Ext.Button({
        text: '登录',
        type: 'submit',
        handler: this.login,
        iconCls: 'btn-login',
        scope: this
    });
    this.btnReset = new Ext.Button({
        text: '重置',
        type: 'reset',
        handler: function() {this.form.reset();},
        scope: this
    });
    
	Login.form.superclass.constructor.call(this, {
        frame: true,
        labelAlign: 'right',
        header: false,
        labelWidth: 85,
        width: 280,
        waitMsgTarget: true,
        renderTo: 'login-panel',
        items: [new Ext.form.FieldSet({
            title: '登录信息',
            autoHeight: true,
            items: [ this.txtUsername, this.txtPassword ]
        })],
        
        keys: {key: 13, fn: this.login, scope: this},

        buttonAlign: 'right',
        buttons: [this.btnLogin, this.btnReset]
    });
	
	this.conn = new Ext.data.Connection({
        method: 'POST',
        url: './user/login.form?timesnap=' + Date.parse(new Date())
    });
};
Ext.extend(Login.form, Ext.form.FormPanel, {
    loginWaiting: function(flag) {
        if (flag) {
        	if (!this.loadMask)
        		this.loadMask = new Ext.LoadMask(Ext.get('login-panel'), {msg: '登录中，请稍候...'});
        	this.loadMask.show();
        } else {
        	this.loadMask.hide();
        }
    },
    login: function() {
		if (!this.form.isValid())
			return;
		this.loginWaiting(true);
	    Utils.request(this.conn, {
	    	params: {username: this.txtUsername.getValue(), password: this.txtPassword.getValue()},
	    	caller: this,
	    	success: function(form, action) {
	    		window.location.replace('./main.html');
	    	},
	    	after: function() {this.caller.loginWaiting(false);}
	    });
	}
});

Ext.onReady(function() {
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    Ext.BLANK_IMAGE_URL = './resources/images/default/s.gif';
    
    var parent = Utils.getParent();
    if (parent != null) {
    	parent.location.href = "login.html";
    }
    
    Login.instance = new Login.form();
    Login.instance.txtUsername.focus();
});
