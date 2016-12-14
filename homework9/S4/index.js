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
$().ready(function () {
	var li = $("#control-ring li");
	$(".apb").click(function () {
		random();
		$(indexButton[0]).click();
	})
	$.each(li, function () {
		$(this).click(function () {
			getNum(this);
		})
	})
	$("#info-bar").click(result);
	$("#at-plus-container").mouseleave(function () {
		setTimeout(leave, 500)
	});
})
function getNum(n) {
	if (!hasNumber[$(this).attr("id")]&&!running) {
		running = 1;
		var li = $("#control-ring li");
		li.each(function (i, obj) {
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
	$("#order").fadeOut("slow")
	$.each(li, function (i, n) {
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
// 通过生成随机的序列，按照这个序列的顺序去调用click函数达到随机点击的效果
function random() {
	var num1 = Math.floor(Math.random() * 5);
	var num2 = Math.floor(Math.random() * 5);
	var num3 = Math.floor(Math.random() * 5);
	var temp = indexButton[num1];
	indexButton[num1] = indexButton[num2];
	indexButton[num2] = indexButton[num3];
	indexButton[num3] = temp;
	$("#order").text("" + indexButton[0][1] + " " + indexButton[1][1]
	 + " " + indexButton[2][1] + " " + indexButton[3][1] + " " +
 	indexButton[4][1]);
	$("#order").fadeIn("slow");
}
function result() {
	if(hasNumber["A"]&&hasNumber["B"]&&hasNumber["C"]&&hasNumber["D"]&&hasNumber["E"]) {
		var li = $("#control-ring li");
		var result = 0
		$.each(li, function () {
			var redPoint =  $(this).children("span.unread");
			result += Number($(redPoint).text());
		})
		$("#info").text(result);
		$("#info").fadeIn("slow")
	}
}
