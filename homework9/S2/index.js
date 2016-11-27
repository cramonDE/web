var hasNumber = {
	"A":0,
	"B":0,
	"C":0,
	"D":0,
	"E":0
}
var index = 1;
var indexButton = ["#A", "#B", "#C", "#D", "#E", "#info"]
var running = 0;
var li = $("#control-ring li");
//按照序列中的顺序，一个函数接收到数据后才开始调用下一个函数
$().ready(function () {
	var li = $("#control-ring li");
	$(".apb").click(function () {$("#A").click();})
	$.each(li, function () {
		$(this).click(function () {getNum(this)})
	})
	$("#info-bar").click(result);
	$("#at-plus-container").mouseleave(function () {
		setTimeout(leave, 700)
	});
})
function getNum(n) {
	if (!hasNumber[$(n).attr("id")]&&!running) {
		running = 1;
		var li = $("#control-ring li");
		$.each(li, function (i, obj) {
			if (n != obj) $(obj).addClass("grey");
		})
		var redPoint =  $(n).children("span.unread");
		redPoint.fadeIn("slow");
		hasNumber[$(n).attr("id")] = 1;
		sentAjax(n);
		}
}
function sentAjax(n) {
	$.get("http://localhost:3000", function (data) {
		var redPoint =  $(n).children("span.unread");
		var li = $("#control-ring li");
		$(redPoint).text(data);
		$.each(li, function (i, n) {
				$(n).addClass("grey");
		})
		$.each(li, function (i, n) {
			if (!hasNumber[$(n).attr("id")]) {
				$(n).removeClass("grey");
			}
		})
		running = 0;
		$(indexButton[index]).click();
		index++;
	})
}
function leave() {
	index = 1;
	running = 0;
	hasNumber = {
		"A":0,"B":0,"C":0,"D":0,"E":0
	}
	var li = $("#control-ring li");
	li.each(function (i, n) {
		reset(n);
	})
}
function result() {
	if(hasNumber["A"]&&hasNumber["B"]&&hasNumber["C"]&&hasNumber["D"]&&hasNumber["E"]) {
		var li = $("#control-ring li");
		var result = 0;
		$.each(li, function () {
			var redPoint =  $(this).children("span.unread");
			result += Number($(redPoint).text());
		})
		$("#info").text(result);
		$("#info").fadeIn("slow")
	}
}
function reset(n) {
	$(n).removeClass("grey");
	var redPoint =  $(n).children("span.unread");
	redPoint.fadeOut();
	$(redPoint).text("...");
	$("#info").text("");
}
