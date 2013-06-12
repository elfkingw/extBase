Ext.namespace("Utils");
//数据字典静态变量==========
Utils.SEX = 'sex';
Utils.STATUS = 'status';
Utils.HOME_CONFIG = 'home_config';
//=======================
Utils.msg = function(title, msg, icon) {
	Ext.MessageBox.show({
		minWidth:150,
		title: title,
		msg: msg,
		buttons: Ext.MessageBox.OK,
		closable: false,
		icon: icon
	});
};

Utils.info = function(msg, title) {
	Utils.msg( (!title) ? '系统提示' : title, msg, Ext.MessageBox.INFO);
};
Utils.warn = function(msg, title) {
	Utils.msg( (!title) ? '系统提示' : title, msg, Ext.MessageBox.WARNING);
};
Utils.error = function(msg, title) {
	Utils.msg( (!title) ? '系统提示' : title, msg, Ext.MessageBox.ERROR);
};
Utils.connectionError = function() {
	Utils.error('连接失败', '连接服务器失败。请稍候再试！');
};
Utils.confirm = function(o) {
	Ext.MessageBox.confirm('系统提示', o.msg, function(e) {
		if (e == 'yes') {
			if (o.success)
				o.success();
		} else {
			if (o.cancel)
				o.cancel();
		}
	}, o.scope);
};
Utils.notification = function(o) {	// request Ext.ux.Notification.js
	if (typeof o === 'string') {
		o = {message: o};
	}
	new Ext.ux.Notification({
		iconCls: 'x-icon-information',
		title: o.title || '系统提示',
		html: o.message || '',
		autoDestory: o.destory || true,
		hideDelay: o.delay || 5000
	}).show(document);
};

Utils.regError = new RegExp("\\t.*\n", "g");
Utils.regHTML = /<[^>].*?>/g;

Utils.prepareError = function(txt) {
	return txt.replace(Utils.regError, '');
};
Utils.getHTMLData = function(s) {
    return s.replace(Utils.regHTML, '');
};
Utils.getSubHTMLData = function(s,length){
	s = Utils.getHTMLData(s);
	return s.substring(0,length)+'....';
}

Utils.clone = function(o) {
	if (!o || 'object' !== typeof o) {
		return o;
	}
	var c = '[object Array]' === Object.prototype.toString.call(o) ? [] : {};
    var p, v;
    var p, v;
    for(p in o) {
        if(o.hasOwnProperty(p)) {
            v = o[p];
            if(v && 'object' === typeof v) {
                c[p] = Ext.ux.clone(v);
            } else {
                c[p] = v;
            }
        } // End If
    }   // End for
    return c;
};	// End Clone 

Utils.justRequest = function(conn, o) {
	conn.request({
		callback: function(a, s, r) {
			if (r.status >= 400)
				Utils.error(r.statusText, Utils.prepareError(r.responseText));
		},
		success: function(resp, action) {
			var data = Ext.util.JSON.decode(resp.responseText);
            if (data && data.success === "false") {
            	Utils.error( Utils.prepareError(data.error),"错误");
            	if (o.failture)
            		o.failture(data, action);
            }
		},
		failture: function(resp, action) {
			if (o.failture) o.failture();
            if (action.failureType == 'connect')
            	Utils.connectionError();
            else
            	Utils.error("失败", "[错误类型=" + action.failureType + "] 请联系管理员!");
		}
	});
};
Utils.getJson = function(o){
	var array = [];
	if(!o)
		return [];
	if(o){
		for(var a in o){
			var b ={};
			b.value = a
			b.name = o[a];
			array.push(b);
		}
		
	}
}
Utils.request = function(conn, o) {
	var cn = typeof conn === 'string' ? new Ext.data.Connection({url: conn}) : conn;
	cn.request({
		params: o.params,
		caller: o.caller,
		callback: function(a, s, r) {
			if (o.after) o.after();
			if (r.status <= 0)
				Utils.error("连接失败", "连接超时，请检查网络!");
			else if (r.status >= 400)
				Utils.error(r.statusText, Utils.prepareError(r.responseText));
		},
		success: function(resp, action) {
			var data = Ext.util.JSON.decode(resp.responseText);
            if (data && data.success === "true") {
            	if (o.success)
            		o.success(data, action);
            } else {
            	Utils.error( Utils.prepareError(data.error),"错误");
            	if (o.failture)
            		o.failture(data, action);
            }
		},
		failture: function(resp, action) {
			if (o.failture) o.failture();
            if (action.failureType == 'connect')
            	Utils.connectionError();
            else
            	Utils.error("失败", "[错误类型=" + action.failureType + "] 请联系管理员!");
		}
	});
};

Utils.getParameter = function(item) {
    var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
    return svalue ? svalue[1] : svalue;
};

Utils.openWindow = function(url, name) {
	window.open(url, name, 'status=no,toolbar=no,menubar=no');
};

Utils.getParent = function() {
	if (parent == window) return null;
	return parent;
};

Utils.getStaticData = function(){
	if(parent == window)
		return Data;
	else
		return parent.Data;
};
// extends Ext
Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        } 
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    }
});



Utils.DEBUG = true;
Utils.debug = function(msg) {
	if (!console || !Utils.DEBUG) return;
	console.debug(msg);
};
/**
 * 按钮权限控制
 */
Utils.renderPrivilege = function(){
	var menus = parent.Main.Global.userFunction;
	if(menus){
		for(var i =0;i<menus.length;i++){
			var button = Ext.getCmp(menus[i].menuId);
			if(button){
				button.enable();			
			}
		}
	}
}
/**
 * 数据字典转换
 * @param {} dicType
 * @param {} id
 * @return {}
 */
Utils.getPamarmById = function(dicType,id){
	var d = parent.Main.Global.dictionary;
	if(d&&d[dicType]){
		for(var i=0;i<d[dicType].length;i++){
			if(d[dicType][i].id ==id){
				return d[dicType][i].value;
			}
		}
	}
	return id;
}
/**
 *获取数组数据字典 
 * @param {} dicType 数据字典类型
 * @return {}
 */
Utils.getDictionarys = function(dicType){
	var d = parent.Main.Global.dictionary;
	console.info(d);
	if(d&&d[dicType]){
		return d[dicType];
	}
	return [];
}
/**
 * 根据数据字典类型获取radio的items
 * @param {} dicType
 * @param {} radioName reaio的name
 * @return {}
 */
Utils.getDicRadio = function(dicType,radioName){
	var d = parent.Main.Global.dictionary;
	var items =[];
	if(d&&d[dicType]){
		for(var i=0;i<d[dicType].length;i++){
			var o ={};
			o.boxLabel = d[dicType][i].value;
			o.inputValue = d[dicType][i].id;
			o.name = radioName;
			if(i==0){
				o.checked=true;	
			}
			items.push(o);
		}
	}
	return items;
}