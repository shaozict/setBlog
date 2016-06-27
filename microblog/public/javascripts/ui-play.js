/**
 * Created by yangjie5 on 2016/6/23.
 */
(function () {
    var $player = $("#player");
    var $rbtn = $("#playbtn");
    function Player(parm) {
        this.parm = $.extend({
            type: 0,
            id: 30281179,
            auto: 0,
            width: 330,
            height: 430
        }, parm);
        this.init();
    }

    Player.prototype = {
        init:function(){
            this.dragElement("#player");
            this.lazyload("#playpanel");
        },
        dragElement: function (tar) { //拖动
            var $target = $(tar);
            $target.css("position", "fixed");
            var isnot = false;
            var offset = {};
            $target.on({
                "mousedown": function (event) {
                    var event = event || window.event;
                    offset = {
                        orileft: $target.offset().left,
                        oritop: $target.offset().top,
                        fixleft: $target.offset().left - event.screenX,
                        fixtop: $target.offset().top - event.screenY
                    };
                    isnot = true;
                },
                "mouseup": function (event) {
                    var event = event || window.event;
                    isnot = false;
                    if (!(($target.offset().left - offset.orileft) || ($target.offset().top - offset.oritop))) {
                        play.position("#playpanel", "#playbtn");
                    }
                    return false;
                }
            });
            $(document).on({         //事件绑定到window上，ie8不兼容
                "mousemove": function (event) {
                    var event = event || window.event;
                    if (isnot) {
                        $target.css({
                            left: event.screenX + offset.fixleft,
                            right: "auto"
                        });
                        $target.css({
                            top: event.screenY + offset.fixtop,
                            bottom: "auto"
                        });
                    }
                    return false;
                },
                "mouseup": function (event) {
                    var event = event || window.event;
                    isnot = false;
                    if ($("#playpanel").is(":visible")) {
                        $("#playpanel").hide();
                    }
                }
            });
        },
        lazyload: function (tar) {   //延迟加载 播放器
            var $target = $(tar);
            var setime = 500;
            var parm = this.parm;
            var html = '<iframe id="playifr" ' +
                'frameborder="no" border="0" marginwidth="0" marginheight="0" width=" ' + parm.width + '" height="' + parm.height + '" ' +
                'src="http://music.163.com/outchain/player?type=' + parm.type + '&amp;id=' + parm.id + '&amp;auto=' + parm.auto + '&amp;height=' + parm.height + '">' +
                '</iframe>';
            setTimeout(function () {
                $target.html(html);
            }, setime);
        },
        position: function (tar, ori, dec) {    //确定播放器展示位置
            var $target = $(tar);
            var $origin = $(ori);
            var dec = dec || {"l": $target.outerWidth(), "t": $target.outerHeight()};
            var offset = {
                left: $origin.offset().left,
                right: $(window).width() - $origin.offset().left - $origin.outerWidth(),
                top: $origin.offset().top,
                bottom: $(window).height() - $origin.offset().top - $origin.outerHeight()
            };
            if ($target.is(":visible")) {
                $target.hide();
            } else {
                if (offset.top > dec.t) {
                    if(offset.left > dec.l){
                        $target.css({
                            "position": "absolute",
                            "left": $origin.position().left-$target.width(),
                            "right": "auto",
                            "bottom": "auto",
                            "top": $origin.position().top - $target.height(),
                            "display": "block"
                        })
                    }else {
                        $target.css({
                            "position": "absolute",
                            "left": $origin.position().left,
                            "right": "auto",
                            "bottom": "auto",
                            "top": $origin.position().top - $target.height(),
                            "display": "block"
                        })
                    }
                } else {
                    if(offset.left > dec.l){
                        $target.css({
                            "position": "absolute",
                            "left": $origin.position().left-$target.width(),
                            "right": "auto",
                            "bottom": "auto",
                            "top": $origin.position().top + $origin.outerHeight(),
                            "display": "block"
                        })
                    }else{
                        $target.css({
                            "position": "absolute",
                            "left": $origin.position().left,
                            "bottom": "auto",
                            "top": $origin.position().top + $origin.outerHeight(),
                            "display": "block"
                        })
                    }
                }
            }
        },
        playing: function (tar) {
            var $target = $(tar),
                $imusic = $target.find("i-music");
            var state = {
                pause: "uniF04C",
                play: "uniF04B",
                next: "uniF04E"
            };
            if (parm.auto) {
                $imusic.text("&#x" + state.pause);
            }
        }
    };
    var play = new Player();
})();
