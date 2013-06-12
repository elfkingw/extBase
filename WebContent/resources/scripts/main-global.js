/**
 * 全局变量
 */
Ext.namespace("Main.Global");
/**getfunctionByUser
**/
var getStaticDataConn = new Ext.data.Connection({
	url:'./user/initStaticData.form',
	method:'post'
});

Utils.request(getStaticDataConn,{
	params:{},
	success:function(data){
		/**
		 * 用户功能权限
		 */
		Main.Global.userFunction = data.functions;
		/**
		 * 用户信息{id:'id',userName:'userName',cnname:'cnname'}
		 * Main.Global.users:{id:cnname};
		 */
		Main.Global.users = {};
		for(var i=0;i<data.users.length;i++){
			Main.Global.users[data.users[i].id] = data.users[i].cnname;
		}
		/**
		 * 数据字典
		 */
		Main.Global.dictionary = {};
		for(var j=0;j<data.dictionary.length;j++){
			var d = data.dictionary[j]
			var o = {};
			o['id'] = d.dicCode;
			o['value'] = d.dicName;
			if(!Main.Global.dictionary[d.dicType.dicType]){
				Main.Global.dictionary[d.dicType.dicType] = [];
			}
			Main.Global.dictionary[d.dicType.dicType].push(o);
		}
	}
});
