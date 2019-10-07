$(function () {
    $(".navbar-toggler").click(function () {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
        } else {
            $(this).addClass("on");
        }
    });
    $(".login").hover(function () {
        $(this).addClass("on");
        // console.log("一如");
    }, function () {
        $(this).removeClass("on");
    });
    $(".modal-close").click(function () {
        $('.modal').modal('hide');
    });
    let headerHeight = $(".header-top").height() + $(".header-middle").height();
    $(window).scroll(function () {
        let offsetY = $("body").scrollTop() + $("html").scrollTop();
        if (headerHeight <= offsetY) {
            $(".header-top").removeClass("d-xl-block");
            $(".header-middle").hide();
        }
        else {
            $(".header-top").addClass("d-xl-block");
            $(".header-middle").show();
        }
    });
    new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            bulletActiveClass: 'my-bullet-active',
            bulletClass: 'my-bullet',

        },
        autoplay: {
            delay: 3000,//1秒切换一次
        },
        on: {
            init: function () {
                swiperAnimateCache(this); //隐藏动画元素
                swiperAnimate(this); //初始化完成开始动画
            },
            slideChangeTransitionEnd: function () {
                swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
                let offsetY = this.activeIndex * 45;
                $(".swiper-name>span").animate({
                    top: -offsetY
                });
                $(".swiper-num>span").animate({
                    top: -offsetY
                });
            }
        }

    });
    let controller = new ScrollMagic.Controller();
    let scene = new ScrollMagic.Scene({
        triggerElement: "toggler-section",
        triggerHook: "onLeave",
        duration: "110%"
    });
    scene.setPin(".section1", {pushFollowers: false});
    scene.setTween(".section1", 3, {
        opacity: 0.5
    });
    controller.addScene(scene);
    let scene2 = new ScrollMagic.Scene(
        {
            triggerElement: "toggler-section2",
            triggerHook: "onEnter",
        });
    scene2.setVelocity([".section2-top>div", ".section2-top>div>p"], {
        top: "0px",
        opacity: "1"
    }, {
        duration: 1000
    });
    controller.addScene(scene2);
    let scene3 = new ScrollMagic.Scene({
        triggerElement: ".toggler-section2",
        triggerHook: "onLeave",
        offset: $(".section2-top").height() + 100,
        duration: "100%"
    });
    scene3.setPin(".section2", {pushFollowers: false});

    let tm = new TimelineMax();
    tm.add([
        new TweenMax(".middle-left", 2, {
            transform: "translateX(-100%)",
            opacity: 0
        }), new TweenMax(".middle-right", 2, {
            transform: "translateX(100%)",
            opacity: 0
        }), new TweenMax(".middle-middle", 2, {
            opacity: 1,
            delay:0.4
        }),
    ]);
    tm.add(
        new TweenMax(".middle-top",3,{
            opacity:1
        })
    );
    scene3.setTween(tm);
    controller.addScene(scene3);
});
