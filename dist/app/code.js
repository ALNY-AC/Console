// @ts-nocheck
var code = {
    cls: {
        info: '清空控制台',
        prefix: "cls",
        fun: function () {
            //清空
            $('.code-box').empty();
            codeTool.print();

        },
    },
    'help': {
        info: '帮助命令',
        prefix: "? help",
        fun: function () {
            //帮助

            let $div = $('<div/>');
            $div.append('<div style="font-size:25px;font-weight: bold;padding-bottom:10px;"><i class="fa fa-connectdevelop"></i> Mr. Robot CTOS 控制中心 </div>');

            for (let x in code) {

                let item = code[x];
                let $code_item = $('<div/>');
                $code_item.html('[<span class="text-danger"> ' + item.prefix + '</span> ] : <span class="text-info">' + item.info + '</span>');
                $code_item.css('padding', '5px 0');
                $div.append($code_item);

            }

            $div.append(`<div style="height:1px;background-color:#0f0;margin:10px 0;color:#000"></div>`);
            $div.append(`<div>用户的命令：</div>`);

            for (let x in userCode) {

                let item = userCode[x];
                let $code_item = $('<div/>');
                $code_item.html('[<span class="text-danger"> ' + item.prefix + '</span> ] : <span class="text-info">' + item.info + '</span>');
                $code_item.css('padding', '5px 0');
                $div.append($code_item);

            }

            codeTool.print({
                content: $div
            });

        }
    },
    'hi': {
        info: '你好命令',
        prefix: "你好 hi hello",
        fun: function () {

            var heoolText = '';
            var random = Math.floor(Math.random() * 10);

            switch (random) {
                case 0:
                    heoolText = '(握手)';
                    break;
                case 1:
                    heoolText = '你好啊！';
                    break;
                case 2:
                    heoolText = '你好呀！';
                    break;
                case 3:
                    heoolText = '你也好！';
                    break;
                case 4:
                    heoolText = '(*^▽^*)';
                    break;
                case 5:
                    heoolText = '(*´▽｀)ノノ';
                    break;
                case 6:
                    heoolText = 'hi';
                    break;
                case 7:
                    heoolText = '你好！';
                    break;
                case 8:
                    heoolText = '(^_^)';
                    break;
                case 9:
                    heoolText = '(^_^)~';
                    break;
                default:
                    heoolText = 'Hello~';
                    break;
            }
            codeTool.print({
                content: heoolText
            });

        },
    },
    "@": {
        info: '搜索命令',
        prefix: "@",
        fun: function (key) {

            window.open('http://www.baidu.com/s?wd=' + key);

            codeTool.print({
                content: '帮你搜索这些：【' + key + '】，给你打开了搜索结果。'
            });

        },
    },
    // test: {
    //     info: '测试用的命令',
    //     prefix: "test",
    //     fun: function (_test) {

    //         var text = "\
    //         <span class='fa fa-cube'></span> 背包\
    //         <ul>\
    //         <li>手枪</li>\
    //         <li>技能书</li>\
    //         <li>电子板</li>\
    //         <li>继电器</li>\
    //         </ul>\
    //         ";

    //         codeTool.print({
    //             content: text
    //         });

    //     },
    // },
    info: {
        info: '本程序信息',
        prefix: 'info',
        fun: function () {

            var robot_head_info = localStorage.robot_head_info ? localStorage.robot_head_info : 'Mr. Robot >';
            var $div = $('<div/>');
            $div.append(`<div style="font-size:25px;font-weight: bold;padding-bottom:10px;"><i class="fa fa-connectdevelop"></i> ${robot_head_info} CTOS 控制中心</div>`);
            $div.append(`<div style="color:#f00;padding:5px 0">当前版本 ${config.version}</div>`);
            $div.append(`<div style="color:#f00;padding:5px 0">作者：<a href='https://github.com/ALNY-AC/' target="_black">${config.author}</div>`);
            $div.append(`<div style="color:#f00;padding:5px 0">输入 <kbd>?、help</kbd> 查看帮助</div>`);
            $div.append(`<div style="color:#f00;padding:5px 0">输入 <kbd>list</kbd> 快速查看收藏列表</div>`);
            codeTool.print({
                content: $div
            });
        }
    },
    set: {
        info: '设置功能，可使用 set ? 查看帮助列表',
        prefix: 'set',
        fun: function (a) {
            if (a.length <= 0) {

                codeTool.print({
                    content: '输入 【set ?】 查看指令列表'
                });
                return
            }

            if (a[0] == '?') {
                //查看帮助列表
                var $div = $('<div/>');
                $div.append(`<div style="font-size:15px;font-weight: bold;padding-bottom:10px;"><i class="fa fa-question-circle"></i> [set] 指令列表</div>`);

                $div.append(`<div style="padding-bottom:5px;" class=""><span class="text-warning">set robot <想要修改的机器人姓名></span><span class="text-success">&nbsp&nbsp&nbsp&nbsp//修改机器人先生的签名，不输入参数为重置</span></div>`);
                $div.append(`<div style="padding-bottom:5px;" class=""><span class="text-warning">set user <想要修改自己的名字></span><span class="text-success">&nbsp&nbsp&nbsp&nbsp//修改自己的签名，不输入参数为重置</span></div>`);
                codeTool.print({
                    content: $div
                });
            }

            switch (a[0]) {
                case 'robot':

                    var head = a[1] ? a[1] : "Mr. Robot"
                    localStorage.robot_head = head;
                    codeTool.print({
                        type: 1,
                        content: '修改成功'
                    });
                    break;
                case 'user':

                    var head = a[1] ? a[1] : "me"
                    localStorage.user_head = head;
                    codeTool.print({
                        type: 1,
                        content: '修改成功'
                    });

                    break;
                default:
                    break;
            }



        }
    },
    empty: {
        info: '空操作',
        prefix: "empty",
        fun: function () {
            //空操作
            codeTool.print({});
        }
    },
    error: {
        info: '错误的命令',
        prefix: "error",
        fun: function () {
            //错误指令
            codeTool.print({
                type: -1,
                content: '未知指令！'
            });
        }
    }

}
var userCode = {};