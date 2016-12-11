var http = require('http')
var Promise = require('bluebird')
var cheerio = require('cheerio')
var baseUrl = 'http://www.imooc.com/learn/'
var videoIds = [348, 259, 197, 134, 75]

function filterChapters(html){
	var $ = cheerio.load(html)
	var title = $($('.course-infos span')[0]).text()
	var number = $($('.course-infos span')[2]).text()
	var chapters = $('.chapter')

	// courseData = {
	// 	title : title,
	// 	number : number,
	// 	videos : [{
	// 		chapterTitle : '',
	// 		videos : [
	// 			title : '',
	// 			id : ''
	// 		]
	// 	}]
	// }

	var courseData = {
		title : title,
		number : number,
		videos : []
	}

	chapters.each(function(item){
		var chapter = $(this)
		var chapterTitle = chapter.find('strong').text().trim()
		var videos = chapter.find('.video').children('li')
		var chapterData = {
			chapterTitle : chapterTitle,
			videos : []
		}

		videos.each(function(item){
			var video = $(this).find('.J-media-item')
			var videoTitle = video.text().trim()
			var id = video.attr('href').split('video/')[1]
			chapterData.videos.push({
				title : videoTitle,
				id : id
			})
		})

		courseData.videos.push(chapterData)
	})
	return courseData
}

function printCourseInfo(coursesData){
	coursesData.forEach(function(courseData){
		console.log(courseData.number + '人学过' + courseData.title + '\n')
	})
	coursesData.forEach(function(courseData){
		console.log('### ' + courseData.title)

		courseData.videos.forEach(function(item){
			var chapterTitle = item.chapterTitle

			console.log(chapterTitle + '\n')

			item.videos.forEach(function(video){
				console.log('  [' + video.id + ']  ' + video.title + '\n')
			})
		})
	})
	
}

function getPageAsync(url){
	return new Promise(function(resolve, reject){
		console.log('正在爬取' + url)

		http.get(url,function(res){
			var html = ''

			res.on('data',function(data){
				html += data
			})

			res.on('end',function(){
				resolve(html)
			})
		}).on('error',function(e){
			reject(e)
			console.log('爬取数据失败！')
		})
	})
}

var fetchCourseArray = []

videoIds.forEach(function(id){
	fetchCourseArray.push(getPageAsync(baseUrl + id))
})

Promise
	.all(fetchCourseArray)
	.then(function(pages){
		var coursesData = []

		pages.forEach(function(html){
			var courses = filterChapters(html)

			coursesData.push(courses)
		})
		coursesData.sort(function(a, b){
			return a.number < b.number
		})
		console.log(coursesData)
		printCourseInfo(coursesData)
	})
