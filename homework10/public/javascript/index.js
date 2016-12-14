var flag = {
	one:0,
	two:0,
	three:0,
	four:0,
	five:0,
	six:0,
	errorcode:""
}
$().ready(function () {
	$("#username").change(checkname);
	$("#username").click(nameReq);
	$("#id").change(checkid);
	$("#id").click(idReq);
	$("#password").click(passwordReq);
	$("#passwordCheck").click(checkPasswordReq);
	$("#passwordCheck").change(CheckpasswordSame);
	$("#password").change(checkPasswordForm);
	$("#phone").change(checkphone);
	$("#phone").click(phoneReq);
	$("#email").change(checkemail);
	$("#email").click(emailReq);
	$("#reset").click(function () {
		$.each($("input[type = 'text']"), function () {
			$(this).val("");
		})
		$.each($("input[type = 'password']"), function () {
			$(this).val("");
		})
	})
	$("#submit").click(subFunc)
})
function subFunc() {
	if (!flag.one) flag.errorcode += "用户名不合法\n";
	if (!flag.two) flag.errorcode += "学号不合法\n";
	if (!flag.three) flag.errorcode += "电话格式不合法\n";
	if (!flag.four) flag.errorcode += "邮箱格式不合法\n";
	if (!(flag.one&&flag.two&&flag.three&&flag.four&&flag.five&&flag.six)) {
		alert(flag.errorcode);
		flag.errorcode = "";
		return false;
	}
}
function nameReq() {
	$("#errorInfo").attr("class","err");
	$("#errorInfo").text("用户名6~18位英文字母、数字或下划线，必须以英文字母开头");
}
function idReq() {
	$("#errorInfo").attr("class","err");
	$("#errorInfo").text("学号8位数字，不能以0开头")
}
function phoneReq() {
	$("#errorInfo").attr("class","err");
	$("#errorInfo").text("电话11位数字，不能以0开头")
}
function emailReq() {
	$("#errorInfo").attr("class","err");
	$("#errorInfo").text("邮箱格式不合法")
}
function passwordReq() {
	$("#errorInfo").attr("class", "err");
	$("#errorInfo").text("6~12位数字、大小写字母、中划线、下划线")
}
function checkPasswordReq() {
	$("#errorInfo").attr("class", "err");
	$("#errorInfo").text("请确认密码")
}
function checkname() {
	var patten = new RegExp(/^\w+$/);
	var name = $(this).val();
	if (!patten.test(name)||name.length > 18||
		name.length < 6||(name[0] >= '0'&& name[0] <= '9')||
		name[0] == '_') {
		$(this).attr("class", "red")
		flag.one = 0;
	} else {
		$("#errorInfo").text("请输入信息");
		$("#errorInfo").attr("class","correct");
		$(this).attr("class", "green")
		flag.one = 1;
	}
}
function checkPasswordForm() {
	var patten = new RegExp(/^[a-z0-9_-]{6,12}$/);
	var name = $(this).val();
	if (!patten.test(name)) {
		$(this).attr("class", "red")
		flag.five = 0;
	} else {
		$("#errorInfo").text("请输入信息");
		$("#errorInfo").attr("class","correct");
		$(this).attr("class", "green")
		flag.five = 1;
	}
}
function CheckpasswordSame() {
	var password = $("#password").val();
	var check = $(this).val();
	if (password != check) {
		$(this).attr("class", "red");
		$("#errorInfo").text("密码不一致");
		flag.six= 0;
	} else {
		$("#errorInfo").text("请输入信息");
		$("#errorInfo").attr("class","correct");
		$(this).attr("class", "green")
		flag.six = 1;
	}
}
function checkid() {
	var name = $(this).val();
	if (name.length != 8||name[0] == 0) {
		$(this).attr("class", "red")
		flag.two = 0;
	} else {
		$("#errorInfo").text("请输入信息");
		$("#errorInfo").attr("class","correct");
		$(this).attr("class", "green");
		flag.two = 1;
	}
}
function checkemail() {
	var name = $(this).val();
	var patten = new RegExp(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/);
	if (patten.test(name)) {
		$("#errorInfo").text("请输入信息");
		$("#errorInfo").attr("class","correct");
		$(this).attr("class", "green");
		flag.four = 1;
	} else {
		$(this).attr("class", "red")
		flag.four = 0;
	}
}
function checkphone() {
	var name = $(this).val();
	if (name.length != 11||name[0] == 0) {
		$(this).attr("class", "red");
		flag.three = 0;
	} else {
		$("#errorInfo").text("请输入信息");
		$("#errorInfo").attr("class","correct");
		$(this).attr("class", "green");
		flag.three = 1;
	}
}
