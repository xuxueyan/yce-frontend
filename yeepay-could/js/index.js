// 扫码
$(function() {
        $(".weixin").mouseover(function() {
            $(".saoma").show(200);
        }).mouseleave(function() {
            $(".saoma").hide(200);
        })
    })
    // 获取页面宽度
    // $(function() {
    //         $("body").css("width", $(window).width());
    //     })

// 获取屏幕分辨率
$(document).ready(function() {
        var ratio = window.screen.width
        if (ratio < 1500) {
            $("#change-css").attr("href","css/small.css")
        }else if (ratio > 1500) {
             $("#change-css").attr("href","css/index.css")
        }
    })
    // 列表
$(function() {
    // 第一栏
    $(".ul-first li.flist").each(function(f_nav) {
            var f_active = $(this)
            f_active.hover(function() {
                $(".flist-active").css({
                    "top": 40 + f_nav * 40
                });
            })
        })
        // 第二栏
    $(".ul1-second li.slist").each(function(s_nav) {
            var s_active = $(this)
            s_active.hover(function() {
                $(".slist-active").css({
                    "top": 40 + s_nav * 40
                });
            })
        })
        // 产品大纲
    $(".list2-first .ul-first li").each(function(s_fnav) {
        var s_fnavlist = $(this)
        s_fnavlist.mouseover(function() {
            $(".nav-list2 .list2-on").removeClass("list2-on");
            $(".nav-list2 .list2-second").eq(s_fnav).addClass("list2-on");
        })
    })
})

$(function() {
        // 获取li元素数量并赋值
        var imgsize = $('.first-ad .ad-img .ad-box').size();
        for (var i = 1; i <= imgsize; i++) {
            var li = "<div></div>";
            $('.ad-num').append(li);
        }
        // 手动轮播
        $(".ad-num div").eq(0).addClass("active");
        $(".ad-num div").mouseover(function() {
                $(this).addClass("active").siblings().removeClass("active");
                // 获取当前元素的索引值，并赋值给var
                var indexlogo = $(this).index();
                i = indexlogo; //将自动切换与手动控制进行时间统一


                // 淡入淡出效果
                $(".ad-img div").eq(indexlogo).fadeIn(1000).siblings().stop().fadeOut(1000);
            })
            // 自动轮播
        var i = 0;
        var motion = setInterval(rightmove, 5000)

        function rightmove() {
            i++;
            if (i == imgsize) {
                i = 0;
            }
            $(".ad-num div").eq(i).addClass("active").siblings().removeClass("active");
            $(".ad-img div").eq(i).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
        }

        function leftmove() {
            i--;
            if (i == -1) {
                i = imgsize - 1;
            }
            $(".ad-num div").eq(i).addClass("active").siblings().removeClass("active");
            $(".ad-img div").eq(i).fadeIn(1000).siblings().stop().fadeOut(1000);
        }
        $('.first-ad').hover(function() {
            clearInterval(motion)
        }, function() {
            motion = setInterval(rightmove, 5000)
        })
    })
    // 置顶显示
$(function() {
    $(window).scroll(function() {
            var body_h = $(document).scrollTop();
            if (body_h > 300) {
                $(".quick div.top").css({
                    opacity: 1
                })
            } else if (body_h < 100) {
                $(".quick div.top").css({
                    opacity: 0
                })
            }
        })
        // 返回顶部
    $(".quick div.top").click(function() {
        var speed = 200; //滑动的速度
        $('body,html').animate({
            scrollTop: 0
        }, speed);
        return false;
    });

})
