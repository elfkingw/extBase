Ext.namespace("Data");
//currnet user
Data.userInfo = null;
var conn = new Ext.data.Connection({
	method: 'POST',
	url:'./user/initStaticData.form?timesnap=' + Date.parse(new Date())
})
Utils.request(conn,{
	params:{
	},
	success:function(data){
		Data.userInfo = data.userInfo;
	}
});
