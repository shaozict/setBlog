/**
 * Created by yangjie5 on 2016/6/20.
 */

$.ajax({
    type: "get",
    url: "/reply",
    success: function (docs) {
        var idReplys = document.getElementById("replys");
        var idReplys_n = document.getElementById("replys_n");
        idReplys_n.innerHTML ='('+ docs.length+')';
        var html ='';
        for (var i = 0; i < docs.length; i++) {
            html =html+ '<div class="rep-cell"> ' +
                '<div class = "user-inf" >' +
                ' <span class = "f-name" >' +docs[i].name +' </span> ' +
                '<span class = "f-time" > 2016年5月10日 </span> ' +
                '</div> ' +
                '<div class = "user-content" > ' +
                '<p> '+(docs[i].text||"") + '</p> ' +
                '</div> ' +
                '</div> ';
        }
        idReplys.innerHTML=html;
    }
})