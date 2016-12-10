//简单的评论灌水
var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
	'content' : 'go！nodejs！',
	'cid' : '348'
});

var options = {
	hostname : 'www.imooc.com',
	port : 80,
	path : '/course/docomment',
	method : 'POST',
	headers : {
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length': postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=43107944-0cf5-4351-bccf-aad9a0e7c8b4; imooc_isnew_ct=1464706723; loginstate=1; apsid=UzNGU1MGMzNzI5NjNhMjYzY2Q2MDNlNWM5YjdjNTcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDg1NjYzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5OTcyOTUwMDlAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGI2ZmI1NWQ0YTFkNjMzMTZhMTYyMzU5ZDk2ZjY4YzNjFFoxWBRaMVg%3DMT; last_login_username=997295009%40qq.com; PHPSESSID=6t6vh7l1og3tocurt92erhm3g2; imooc_isnew=2; cvde=584badbc01062-8; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1480936646,1481280959,1481348095,1481354684; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1481354715',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/comment/348',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest',
	}
};

var req = http.request(options,function(res){
	console.log('Status:' + res.statusCode);
	console.log('headers:' + JSON.stringify(res.headers));

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	})

	res.on('end',function(){
		console.log('success！');
	})
});

req.on('error',function(e){
	console.log('Error:' + e.message);
})

req.write(postData);

req.end();