Ext.namespace("Update.Password");

Update.Password.win = function(){
	this.txtoldPassword = new Ext.form.TextField({
        width: 130,
        fieldLabel: '原密码',
        inputType: 'password',
        maxLength: 20,
        allowBlank: false,
        blankText: '请输入原密码!'
    }); 
	this.txtNewPassword = new Ext.form.TextField({
        width: 130,
        fieldLabel: '新密码',
        inputType: 'password',
        maxLength: 20,
        allowBlank: false,
        value: '',
        blankText: '请输入新密码!'
    }); 
	this.txtRePassword = new Ext.form.TextField({
        width: 130,
        fieldLabel: '确认密码',
        inputType: 'password',
        maxLength: 20,
        allowBlank: false,
        value: '',
        blankText: '请输入确认密码!'
    }); 
    this.btnUpdate = new Ext.Button({
        text: '修改',
        type: 'submit',
        handler: this.updatePassword,
        scope: this
    });
    this.btnReset = new Ext.Button({
        text: '重置',
        type: 'reset',
        handler: this.resetForm,
        scope: this
    });
    
    this.formPanel = new Ext.form.FormPanel({
    	frame:true,
    	bodyStyle:'padding-left:30px;padding-top:10px;',
    	height:180,
    	labelWidth:60,
    	items:[this.txtoldPassword,this.txtNewPassword,this.txtRePassword]
    	
    });
    
    this.conn = new Ext.data.Connection({
    	url:'./user/updatePassword.form',
    	method:'post'
    });
    
    Update.Password.win.superclass.constructor.call(this, {
    	title:'修改密码',
    	iconCls:'password',
		width:300,
		height:180,
		modal:true,
		resizable :false,
		closeAction :'hide',
		style:{algin:'center'},
		items:[this.formPanel],
		buttons:[this.btnUpdate,this.btnReset],
    	buttonAlign:'center'
    });
};
Ext.extend(Update.Password.win,Ext.Window,{
	updatePassword:function(){
		if(!this.formPanel.getForm().isValid()){
			return;
		}
		if(this.txtNewPassword.getValue()!= this.txtRePassword.getValue()){
			Utils.info("新密码于确认密码不一致！");
			return;
		}
		Utils.request(this.conn,{
			params:{
				oldPassword:this.txtoldPassword.getValue(),
				newPassword:this.txtNewPassword.getValue()
			},
			scope:this,
			success:function(data){
				Utils.info("密码修改成功！");
				this.scope.hide();
			}
		})	
	},
	resetForm:function(){
		this.formPanel.getForm().reset();
	}
});