$().ready(function () {
	$("#regist").click(function () {
		console.log(12313);
		window.location.href='/regist'
	})
	$('#password').change(checkPasswordForm);
})
function checkPasswordForm() {
	var patten = new RegExp(/^[a-z0-9_-]{6,12}$/);
	var name = $(this).val();
	if (!patten.test(name)) {
		$(this).attr("class", "red")
		$("#errorInfo").text("6~12位数字、大小写字母、中划线、下划线");
		$("#errorInfo").attr("class","err");
	} else {
		$("#errorInfo").text("请输入信息");
		$(this).removeClass("red")
		$("#errorInfo").attr("class","correct");
	}
}
