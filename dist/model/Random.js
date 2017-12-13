/*
 * 参数   length 
 *          想要获随机数的长度
 */

function getRandom(length) {

    var str = '';

    for(var i = 1; i <= length; i++) {
        str += String.fromCharCode(97 + parseInt(Math.random() * 25));
    }
    var time = '' + new Date().getTime();

    time = time.substr(time.length - 5, time.length);

    return str + time;

}