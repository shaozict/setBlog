/**
 * Created by yangjie5 on 2016/6/14.
 */
var message ={};
message.art = {
    "data": [
        {
            "autor":"杨杰i",
            "date":"2016年3月5日",
            "title": "原生javascript事件触发器实现",
            "key": "事件触发器,trigger",
            "abstract": "事件触发器可以实现自定义事件的调用，以及实现在代码程序中（模拟用户操作）间接实现事件调用。例如在页面上实现“文件上传图片”功能的时候，基于用户体验，期望能够点击元素A时就能打开文件上传弹框，这时，就可以在A元素的事件处理程序中定义事件触发器触发input元素的click事件...",
            "href": "1"
        }, {
            "autor":"杨杰i",
            "date":"2016年4月15日",
            "title": "Tags irrInput",
            "key": "随机排列,印象标签",
            "abstract": "这是在tagsinput插件基础上进行了扩展。包括重构了部分代码，增加了些许功能。主要是扩展了一个Csys二维空间的随机函数，增加了input标签的随机排列。",
            "href": "2"
        }, {
            "autor":"杨杰i",
            "date":"2016年7月6日",
            "title": "html邮件制作实践",
            "key": "Html邮件",
            "abstract": "最近经常接到制作页面邮件的需求。本文首先简要介绍了html邮件的制作思路，然后针对工作中页面邮件的特点，提供了一种制作方法。",
            "href": "3"
        }
    ],
    "unit":true
};
message.rep = ["ssbssbss"];
message.rep.push = function(obj){
    message.rep[message.rep.length]=obj;
}
module.exports = message;