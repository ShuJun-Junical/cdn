let phone,dingGroup;

async function submit() {
    phone = $("#phone").val();
    pswd = $("#pswd").val();
    address = $("#address").val();
    dormitory = $("#dormitory").val();
    var eula = $("#eula").is(":checked");
    dingGroup = new mdui.Dialog("#ding",);
    if (!phone || !pswd || !address || !dormitory) return mdui.snackbar("请将信息填写完整",);
    if (!eula) return mdui.snackbar("请先同意许可协议",);
    stuInfo = await login(phone, pswd);
    var confirmDialog = new mdui.Dialog("#confirmInfo",);
    var added = await phoneIsAddded(phone)
    if (added) return mdui.snackbar("该手机号已经添加过了",);
    if (stuInfo === false) return mdui.snackbar("密码错误",);
    if (stuInfo === -1) return mdui.snackbar("登录出现未知错误",);
    headTeacher = await getTeacher(stuInfo.stuClass);
    let confirmList = `
    <li>鑫考云账号：${phone}</li>
    <li>学生姓名：${stuInfo.stuName}</li>
    <li>学生班级：${stuInfo.stuClass}</li>
    <li>班主任姓名：${headTeacher}</li>
    <li>所在地：${address}</li>
    <li>宿舍：${dormitory}</li>
    <li>是否与感染者有过密切接触：否</li>
    <li>家庭成员是否发热异常：否</li>
    <li>本人及家属是否去过中高风险地区：否</li>
    <li>本人及家属是否接触过及其从国外入境人员：否</li>`
    $("#confirmList").html(confirmList);
    confirmDialog.open();
}

function upload(){
    const user = new AV.Object('users');
    user.set('name', stuInfo.stuName);
    user.set('phone', phone);
    user.set('teacher', headTeacher);
    user.set('address', address);
    user.set('dormitory', dormitory);
    user.set('pswd', pswd);
    user.save().then((user) => {
        // 成功保存之后，执行其他逻辑
        const phon = new AV.Object('addedPhone');
        phon.set('phone', phone);
        phon.save().then((user) => {
            log(`保存成功。objectId：${user.id}`);
            mdui.snackbar("提交成功~",);
            dingGroup.open();
        }, (error) => mdui.snackbar("出现未知错误，请重试",));
    }, (error) => mdui.snackbar("出现未知错误，请重试",)
    );
}

async function login(phone, pswd) {
    loginUrl = 'https://usr.xinkaoyun.com/api/HSCPC/Login'
    r = await post(loginUrl, { userName: phone, password: pswd });
    result = eval(`(${r})`);
    if (result.resultCode == -1) return false;
    else if (result.resultCode == 0) return { stuClass: result.data.pardt[0].ClassName, stuName: result.data.pardt[0].StuName };
    else return -1;
}

async function getTeacher(stuClass) {
    const query = new AV.Query('headteacher');
    query.equalTo('class', stuInfo.stuClass);
    tempObj = await query.first();
    teacherName = tempObj.get('teacher');
    return teacherName
}

async function phoneIsAddded(phone) {
    const query = new AV.Query('addedPhone');
    query.equalTo('phone', phone);
    tempObj = await query.first();
    if (!tempObj) return false;
    return true;
}

function post(url, data) {
    return new Promise(function (resolve, reject) {
        var formData = new FormData();
        $.each(data, function (index, value) {
            formData.append(index, value);
        })
        var xhr = new XMLHttpRequest();
        xhr.open('post', url);
        xhr.send(formData);
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.readyState == 4 && xhr.status == 200) {
                var ret = xhr.responseText;
                resolve(ret);
            } else {
                reject('服务器错误');
            }
        }
    })
}
