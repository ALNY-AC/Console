// @ts-nocheck
var codeTool = (function () {
    var obj = {
        user_code: [],
        user_code_count: 0,
        loca: '',//继续输入状态，
        init: function (f) {

            $(document).on('keydown', '.code-edit', function (e) {
                if (e.keyCode == 38) {
                    //向上找命令
                    user_code_count++;
                    if (user_code_count >= codeTool.user_code.length) {
                        user_code_count = codeTool.user_code.length;
                    }

                    $(this).text(codeTool.user_code[codeTool.user_code.length - user_code_count]);
                    set_focus($(this));

                    return false;
                }
                if (e.keyCode == 40) {
                    //向下找命令
                    user_code_count--;
                    if (user_code_count <= 0) {
                        user_code_count = 1;
                    }
                    $(this).text(codeTool.user_code[codeTool.user_code.length - user_code_count]);
                    set_focus($(this));
                    return false;
                }
                if (e.keyCode == 13) {
                    user_code_count = 0;

                    if (codeTool.loca != '' && codeTool.loca != null) {

                        codeTool.paresCode(codeTool.loca + ' ' + $(this).text());

                    } else {
                        codeTool.paresCode($(this).text());
                    }


                    var h = $(document).height() - $(window).height();
                    $(document).scrollTop(h);
                    return false;
                }
            });

            if (f) {
                f();
            }


        },
        paresCode: function (_code) {
            codeTool.user_code.push(_code);

            //先分割_code
            _code = _code.split(/\s+/g);
            var funName = _code[0];

            if (funName == '') {
                code['empty'].fun();
                return;
            }



            //系统的命令
            for (const key in code) {
                const element = code[key];

                _key = element.prefix.split(/\s+/g);

                for (let i = 0; i < _key.length; i++) {
                    const item = _key[i];

                    if (funName === item) {
                        element.fun(_code.slice(1));
                        return;
                    }

                }

            }

            //用户的命令
            for (const key in userCode) {
                const element = userCode[key];

                _key = element.prefix.split(/\s+/g);

                for (let i = 0; i < _key.length; i++) {
                    const item = _key[i];

                    if (funName === item) {
                        element.fun(_code.slice(1));
                        return;
                    }

                }

            }

            code['error'].fun();
        },
        print: function (conf) {

            if (conf == null) {
                conf = {
                    content: conf
                }
            }

            //基本变量声明
            var user_head = localStorage.user_head ? localStorage.user_head : 'me';
            var robot_head = localStorage.robot_head ? localStorage.robot_head : 'Mr. Robot';
            robot_head = conf.head ? conf.head : robot_head;

            user_head += " >";
            robot_head += " >";

            //获得代码视图组件的容器
            var $codeBox = $('.code-box');
            //让所有的不能编辑
            $('.code-edit').removeAttr('contenteditable');
            //创建代码组件容器
            var $codeItem = $('<div/>').addClass('code-item');//这个是代码组件的容器
            var $codeHead = $('<div/>').addClass('code-head');//这个是代码行的头部，一般是用户的签名，比如 me 或者 Mr. Robot
            var $codeEdit = $('<div/>').addClass('code-edit');//这个是显示代码或者输入代码的地方
            $codeHead.html(user_head);//设置签名，这个是用户的签名
            $codeEdit.attr('contenteditable', 'true');//让组件可编辑
            $codeEdit.html(conf.text ? conf.text : '');//如果有预设文本，就插入
            //基础组件创建完毕
            //组装组件
            $codeItem.append($codeHead);
            $codeItem.append($codeEdit);

            //判断是否有要显示的内容
            if (conf.content != null) {
                //要是有要显示的内容，就得创建显示的组件，其实和基本的组件一样的创建方式。
                var $contentCodeItem = $('<div/>').addClass('code-item');//这个是代码组件的容器
                var $contentCodeHead = $('<div/>').addClass('code-head');//这个是代码行的头部，一般是用户的签名，比如 me 或者 Mr. Robot
                var $contentCodeShow = $('<div/>').addClass('code-edit');//这个是显示代码的地方
                $contentCodeHead.html(robot_head);//设置机器人的签名
                //设置内容显示
                $contentCodeShow.html(conf.content);
                //组装组件
                $contentCodeItem.append($contentCodeHead);
                $contentCodeItem.append($contentCodeShow);
                //插到容器中
                $codeBox.append($contentCodeItem);

                //设置状态，比如错误，正确，之类的
                switch (conf.type) {
                    case 'error':
                    case -1:
                        //这是错误状态
                        $contentCodeItem.addClass('text-danger');
                        break;
                    case 'success':
                    case 1:
                        //这是正确状态
                        $contentCodeItem.addClass('text-success');
                        break;
                    case 'warning':
                    case 0:
                        //这是警告状态
                        $contentCodeItem.addClass('text-warning');
                        break;
                    case 'primary':
                    case 2:
                        //这是普通状态
                        $contentCodeItem.addClass('text-primary');
                        break;
                    case 'info':
                    case 3:
                        //这是信息状态
                        $contentCodeItem.addClass('text-info');
                        break;
                    default:
                        break;
                }
                //预设样式
                if (conf.style) {
                    $contentCodeItem.css(conf.style);
                }
                //添加预设class
                if (conf.class) {
                    $contentCodeItem.addClass(conf.class);
                }
            }
            //到这里该向容器插入让用户输入的组件了
            $codeBox.append($codeItem);//插进去
            //让用户输入的获得焦点
            set_focus($codeEdit);
            // $codeEdit.focus();

            $('.code-edit:last').blur(function () {
                $(this).focus();
            })

        }


    }

    return obj;

}());


//辅助函数=====
/**
 * 让组件获得焦点，并且将光标放到最后
 */
function set_focus($el) {
    el = $el[0];  //jquery 对象转dom对象
    el.focus();
    if ($.support.msie) {
        var range = document.selection.createRange();
        this.last = range;
        range.moveToElementText(el);
        range.select();
        document.selection.empty(); //取消选中
    }
    else {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}