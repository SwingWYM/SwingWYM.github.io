

var data = new Array(),
	outcome = document.getElementById('outcome'),
	textarea = document.getElementById('textarea');

//字符串左右去空格
function trim(string){
	if (string.trim()) {
		return string.trim();
	}else{
		return string.replace(/(^\s*)|(\s*$)/g,'');
	}
}

//处理textarear里面的字符串
function getParticiple(string){
	var temp = [];
	temp = string.split(/[^0-9a-zA-Z\u2E80-\u9FFF]+/);
	return temp;
}


//渲染队列
function show(string){
	var html = '';
	console.log('string:' + string);
	for (var i = 0, len = data.length; i < len; i++) {
		var temp = data[i];
		// temp = temp.replace(/string/g, "<span class='select'>" + string + "<span>");
		temp = temp.replace(eval('/' + string + '/g'),"<span class='select'>" + string + "</span>")
		console.log('temp:' + temp);
		html += '<div>' + temp + '</div>';
	}
	outcome.innerHTML = html;
}

//左侧入事件
function leftToIn(){
	var	content = textarea.value;
	var temp = getParticiple(content);
	var searchObject = document.getElementById('mysearch');
	var searchContent = searchObject.value;
	for (var i = 0, len = temp.length; i < len; i++) {
		if (trim(temp[i])) {
			data.unshift(temp[i]);
		}
	}
	// console.log(data);
	show(searchContent);
	textarea.value = '';
}

//右侧入事件
function rightToIn(){
	var	content = textarea.value;
	var temp = getParticiple(content);
	var searchObject = document.getElementById('mysearch');
	var searchContent = searchObject.value;
	for (var i = 0, len = temp.length; i < len; i++) {
		if (trim(temp[i])) {
			data.push(temp[i]);
		}
	}
	// console.log(data);
	show(searchContent);
	textarea.value = '';
}

//左侧出事件
function leftToOut(){
	var out =  data.shift();
	var searchObject = document.getElementById('mysearch');
	var searchContent = searchObject.value;
	console.log(data);
	show(searchContent);
	textarea.value = '';
	alert(out);
}

//右侧出事件
function rightToOut(){
	var out = data.pop();
	var searchObject = document.getElementById('mysearch');
	var searchContent = searchObject.value;
	console.log(data);
	show(searchContent);
	textarea.value = '';
	alert(out);
}

//点击删除事件
function clickOut(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event),
		j;
	var searchObject = document.getElementById('mysearch');
	var searchContent = searchObject.value;
	if ((target.tagName.toLowerCase() == 'div' && target.id != 'outcome') || target.className == 'select') {
			if (target.className == 'select') {
				target = target.parentNode;
			}
			var divs = outcome.getElementsByTagName('div');
		for (var i = 0, len = divs.length; i < len; i++) {
			if (divs[i] == target) {
				j = data[i];
				data.splice(i, 1);//****************************删除某几项,slice,split,join***************
			}
		}
		alert(j);
	}
	show(searchContent);
}

//搜索事件
function getSearch(){
	var searchObject = document.getElementById('mysearch');
	var searchContent = searchObject.value;
	console.log('searchContent:' + searchContent);
	show(searchContent);
}

//给四个按钮添加点击事件
function init(){
	var leftIn = document.getElementById('leftIn'),
		rightIn = document.getElementById('rightIn'),
		leftOut = document.getElementById('leftOut'),
		rightOut = document.getElementById('rightOut'),
		outcome = document.getElementById('outcome'),
		searchInput = document.getElementById('mysearch'),
		searchBtn = document.getElementById('searchbtn'); 
	EventUtil.addHandler(leftIn, 'click', leftToIn);
	EventUtil.addHandler(rightIn, 'click', rightToIn);
	EventUtil.addHandler(leftOut, 'click', leftToOut);
	EventUtil.addHandler(rightOut, 'click', rightToOut);
	EventUtil.addHandler(outcome, 'click', clickOut);
	EventUtil.addHandler(searchBtn, 'click', getSearch);
	EventUtil.addHandler(searchInput, 'input' ,getSearch);
}

init();