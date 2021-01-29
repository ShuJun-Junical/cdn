$(function () {
    setTimeout(() => {
        var inst = new mdui.Dialog('#eulaDialog',);
        inst.open();
    }, "1500");
})

function verified() {
    onlyCode = document.getElementById("olcd").value;
    name = document.getElementById("name").value;

    const stu = new AV.Query('Students');
    stu.equalTo('onlyCode', onlyCode);
    stu.first().then((students) => {
        const realName = students.get('name');
        //console.log(realName);
        if (realName == name) {
            document.cookie = "name=" + encodeURI(name) + "; path=/";
            document.cookie = "onlyCode=" + encodeURI(onlyCode) + "; path=/";
            mdui.snackbar({ message: '验证成功！请稍候，正在加载' });
            window.location.href = "./donate.html"
        }
        else {
            mdui.snackbar("认证失败，请检查信息是否无误",);
        }
    });
}
