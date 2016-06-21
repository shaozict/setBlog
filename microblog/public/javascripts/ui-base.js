/**
 * Created by yangjie5 on 2016/6/15.
 */
(function () {
    var $usertext = $("#usertext"),
        $username = $("#username"),
        $useremail = $("#useremail"),
        $usersumit = $("#usersumit");
    var unerr = {
        CheckEmail: function (mail) {
            var regMail = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/;
            if (regMail.test(mail)) {
                return true;
            }
            else {
                return false;
            }
        },
        errname: function (val) {

        },
        errtext: function (val) {
            var setting = {
                defaultTip:"",
                emptyTip: "回复不能为空",
            };
            var result ={};
            var mail = val;
            if ($.trim(mail) === "" || $.trim(mail) == setting.defaultValue) {
                result.errMsg = setting.emptyTip;
            } else result.success = true;
            return result;
        },
        erremail: function (val) {
            var setting = {
                defaultTip:"",
                emptyTip: "邮箱不能为空",
                errorTip: "请输入正确格式的邮箱"
            };
            var result ={};
            var mail = val;
            if ($.trim(mail) === "" || $.trim(mail) == setting.defaultValue) {
                result.errMsg = setting.emptyTip;
            }
            else if (!unerr.CheckEmail(mail)) {
                result.errMsg = setting.errorTip;
            } else result.success = true;
            return result;
        }
    };
    $usersumit.click(function () {
        var rtext = unerr.errtext($usertext.val());
        if(!rtext.success) {
            $usertext.next(".err").text(rtext.errMsg);
            return false;
        };
        var remail = unerr.erremail($useremail.val());
        if(!remail.success) {
            $useremail.next(".err").text(remail.errMsg);
            return false;
        };
        $.ajax({
            type: "POST",
            url: "/reply/mes",
            data: {
                text:$usertext.val(),
                name:$username.val(),
                email:$useremail.val()
            },
            success: function(msg){
                $usertext.val("");
                $username.val("");
                $useremail.val("");
                alert( msg );
            }
        })
    })
})();
(function () {
    $(document).on('click.unfold', '[data-dismiss="unfold"]', function () {
        var $this = $(this)
        var selector = $this.attr('data-target').split(",");
        selector.forEach(function(tar){
            var $target = $(tar);
            $target.is(":hidden") ? $target.show() : $target.hide();
        })
    })
})();