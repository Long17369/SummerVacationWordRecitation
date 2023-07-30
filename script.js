// Version : 1.0.1.22
// Date : 2023/07/30 18:30
// Author : Long17369
var word;
var pos;
var count = 0;
function showword(who) {
	action2.style.display = 'none';
	wordCard.style.display = '';
	console.log('载入单词' + who);
	sleep(who);
	wait(Next, 'reset', who);
};
function wait(fun, await1, await2, await3) {
	if (word == null) {
		setTimeout(() => {
			wait(fun, await1, await2, await3)
		}, 10);
	}
	else if (word == undefined) {
		setTimeout(() => {
			wait(fun, await1, await2, await3)
		}, 10);
	}
	else {
		fun(await1, await2, await3)
	}
}
// function show(who) {
// 	var Word = document.getElementById('Word');
// 	var Creat;
// 	sleep(who);
// 	var words = word.word;
// 	Word.innerHTML = '';
// };
function Next(info, who) {
	if (info == "reset") {
		count = 0;
	}
	else if (info == 'next') {
		count++;
	};
	next(who, info);
};
function next(who, info) {
	sleep(who);
	if (info == 'reset') {
		var SetCount = document.getElementById('Count');
		SetCount.innerText = (word.word.length + 1);
	}
	else {
		if (count == word.word.length) {
			return end(who)
		};
	}
	var setcount = document.getElementById('count');
	setcount.innerText = (count + 1);
	var SetWord = document.getElementById('Word');
	SetWord.innerText = word.word[count];
	show_pos(who)
};
function show_pos(who) {

};
function showWord(count) {

};
function sleep(who) {
	if (word == undefined) {
		loadWord(who);
	}
	else if (word == null) {
		loadWord(who);
	}
};
function loadWord(who) {
	if (who == 'main') {
		var date = getDate();
		var open = './每日单词/' + date + '.json';
		console.log('main载入中');
	}
	else if (who == 'history') {
		return history();
	}
	else if (who == 'all') {
		return all();
	}
	else {
		console.log('载入失败');
		return
	};
	var request = new XMLHttpRequest();
	request.open('GET', open);
	request.responseType = 'json';
	request.send();
	request.onload = function () {
		word = request.response;
		if (word == null) {
			console.log('main载入失败');
			loaderroe(who, 1)
		}
		else {
			console.log('main载入成功');
			loadpos(who);
		};
	};
};
function loadpos(who) {
	for (info in word){
		load_pos(who, info);
	};
};
function load_pos(who, info) {
	var open = './word/synonym/' + info + '.json';
	var request = new XMLHttpRequest();
	request.open('GET', open);
	request.responseType = 'json';
	request.send();
	request.onload = function () {
		pos[info] = request.response;
		if (pos[info] == null) {
			console.log('单词：',info,'载入失败');
			errorcount++
			loaderroe_pos(who, 1, info)
		}
		else {
			console.log('单词：',info,'载入成功');
		};
	};
}
// function showWord(word) {
// 	var Word = document.getElementById('word');
// 	var Creat;
// 	var words = word.word;
// 	Word.innerHTML = '';
// 	for (var i in words) {
// 		Creat = document.createElement('word' + i);
// 		Creat.append(words[i] + '\n');
// 		var Creat1 = document.createElement('div');
// 		Creat1.append(Creat);
// 		Word.append(Creat1);
// 	};
// };
function getDate() {
	var date = new Date();
	var strDate = date.getDate();
	var nowMonth = date.getMonth() + 1;
	var nowDate = nowMonth + '.' + strDate;
	return nowDate;
};
function loaderroe(who, errorcount) {
	var date = new Date();
	var strDate = date.getDate() - errorcount;
	var nowMonth = date.getMonth() + 1;
	var open = './每日单词/' + (nowMonth + '.' + strDate) + '.json';
	var request = new XMLHttpRequest();
	request.open('GET', open);
	request.responseType = 'json';
	request.send();
	request.onload = function () {
		word = request.response;
		if (word == null) {
			console.log('main载入失败');
			errorcount++
			loaderroe(who, errorcount)
		}
		else {
			console.log('main载入成功');
			loadpos(who);
		};
	};
};
function loaderroe_pos(who, errorcount, info) {
	var open = './word/synonym/' + info + '.json';
	var request = new XMLHttpRequest();
	request.open('GET', open);
	request.responseType = 'json';
	request.send();
	request.onload = function () {
		pos[info] = request.response;
		if (pos[info] == null) {
			console.log('单词：',info,'载入失败');
			errorcount++
			loaderroe_pos(who, errorcount, info)
		}
		else {
			console.log('单词：',info,'载入成功');
		};
	};
}
function showChinese() {

};
function end(who) {
	Word.style.display = 'none'
	action.style.display = 'none'
	pricing.style.display = 'none'
	var zxcvbbnmdahksj = document.getElementById('posTag')
	zxcvbbnmdahksj.innerText = '完成（后续未完工）'
}
// function showword() {
// 	showWord(loadWord())
// }
