var hasNumber = {
	"A":0,
	"B":0,
	"C":0,
	"D":0,
	"E":0
}
var running = 0;
$().ready(function () {
	var li = $("#control-ring li");
	$.each(li, function () {
		$(this).click(function () {
			getNum(this)
		})
	})
	$("#info-bar").click(result);
	$("#at-plus-container").mouseleave(function () {
		setTimeout(leave, 700)
	});
})
// 数据的获取
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
		running = 0
	})
}
function leave() {
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
