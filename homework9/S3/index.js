var hasNumber = {
	"A":0,
	"B":0,
	"C":0,
	"D":0,
	"E":0
}
var index = 0;
var indexButton = ["#A", "#B", "#C", "#D", "#E"]
var timeSwitch;
$().ready(function () {
	var li = $("#control-ring li");
	$(".apb").click(parallel);
	$.each(li, function () {
		$(this).click(function () {getNum(this)})
	})
	$("#info-bar").click(result);
	$("#at-plus-container").mouseleave(function () {
		clearInterval(timeSwitch);
		setTimeout(leave, 700)
	});
})
// 由于是同时按下，各种限制也取消了
function getNum(n) {
	var redPoint =  $(n).children("span.unread");
	redPoint.fadeIn("slow");
	hasNumber[$(n).attr("id")] = 1;
	$(n).addClass("grey");
	var url = "aaa" + Math.floor(Math.random() * 1000);
	$.get(url, function (data) {
		$(redPoint).text(data);
	})
}
function leave() {
	running = 0;
	hasNumber = {
		"A":0,"B":0,"C":0,"D":0,"E":0
	}
	var li = $("#control-ring li");
	li.each(function (i, n) {
		reset(n)
	})
}
function reset(n) {
	$(n).removeClass("grey");
	var redPoint =  $(n).children("span.unread");
	redPoint.fadeOut();
	$(redPoint).text("...");
	$("#info").text("");
}
function result() {
	if(hasNumber["A"]&&hasNumber["B"]&&hasNumber["C"]&&hasNumber["D"]&&hasNumber["E"]) {
		var li = $("#control-ring li");
		var result = 0;
		$.each(li, function () {
			var redPoint =  $(this).children("span.unread");
			result += Number($(redPoint).text());
		})
		if (result) {
			$("#info").text(result);
			$("#info").fadeIn("slow");
		}
	}
}
function parallel() {
	for (var i = 0; i < 5; i++) {
		$(indexButton[i]).click();
	}
	timeSwitch = setInterval(function () {
		$("#info").click()
	}, 1000)
}
