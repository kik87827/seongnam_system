$(function () {
    localLayer();
    slickControlCardCall();
});
$(window).on("load",function(){
  maxHeightEach([
    {
      parent: ".mv_quadcard_list",
      target: ".mv_quadcard"
    },
    {
      parent: ".mv_gobox_list",
      target: ".mv_gobox_item"
    }
  ]);

  mcCardLayout();
});

function localLayer(){
    // 나의 할일
    $(".mv_quadcard").on("click", function (e) {
        e.preventDefault();
        var $this = $(this);
        var $thisLi = $this.closest("li");
        var $thisLayer = $thisLi.find(".mv_quadlocal_layer");
        var $thisUl = $this.closest(".mv_quadcard_list");

        $thisUl.children("li").not($thisLi).removeClass("active");
        $(".mv_quadlocal_layer").not($thisLayer).hide();
        $thisLi.toggleClass("active");
        $thisLayer.toggle();
    });
    // 배너 전체 보기
    $(".btn_total_list").on("click", function (e) {
        e.preventDefault();
        var $this = $(this);
        var $thisZone = $this.closest(".banner_global_zone");
        var $thisLayer = $thisZone.find(".mv_quadlocal_layer");
        $(".mv_quadlocal_layer").not($thisLayer).hide();
        $thisLayer.toggle();
        console.log($thisLayer);
    });
    $(".btn_quadlocal_close").on("click", function (e) {
        e.preventDefault();
        var $this = $(this);
        var $thisLayer = $this.closest(".mv_quadlocal_layer");
        var $thisLi = $this.closest(".mv_quadcard_list > li");

        $thisLi.removeClass("active");
        $thisLayer.hide();
    });

    $(document).on("click",function(e){
      if($(e.target).closest(".mv_quadcard_list").length === 0 && !$(e.target).hasClass("btn_total_list")){
        $(".mv_quadcard_list > li").removeClass("active");
        $(".mv_quadlocal_layer").hide();
      }
    });
}

function mcCardLayout() {
  var $binding_title_sub = $(".binding_title_sub");
  var $mc_row_tb = $(".mc_row_tb");

  titleSubAction();
  mcColsMaxSync();
  $(window).on("resize", function () {
    titleSubAction();
    mcColsMaxSync();
  });

  function titleSubAction() {
    if ($binding_title_sub.length === 0) { return; }
    $binding_title_sub.css("width", "");
    $binding_title_sub.each(function () {
      var $this = $(this);
      var $t_p = $this.closest(".binding_card");
      var $t_else = $t_p.find(".top_title_else_wrap");
      var $t_else_width = $t_else.length ? $t_else.outerWidth() : 0;

      $this.css("width", $t_p.outerWidth() - $this.position().left - $t_else_width - 30);
    });
  }

  function mcColsMaxSync(){
    if($mc_row_tb.length){
      $mc_row_tb.each(function(){
        var $this_mc = $(this);
        var $this_chlidren = $this_mc.children();
        var $maxArrayBowl = []; 
        var $cssTarget = $this_chlidren.children().not(".banner_container");
        $cssTarget.css("height","");
        $this_chlidren.each(function(){
          $maxArrayBowl.push($(this).outerHeight());
        });
       $cssTarget.css("height",Math.max.apply(null,$maxArrayBowl))
      });
    }
  }
}

function maxHeightEach() {
  var options = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);

  function action() {
    options.forEach(function(option) {
      var $targetParent = $(option.parent);
      $targetParent.each(function () {
        var maxHeight = [];
        var $thisEach = $(this);
        var $target = $thisEach.find(option.target);
        $target.css("height", "");
        $target.each(function () {
          maxHeight.push($(this).height());
        });
        $target.css("height", Math.max.apply(null, maxHeight));
      });
    });
  }

  action();
  $(window).on("resize", action);
}


function slickControlCardCall(){
  const $banner_container = $(".banner_container");

  $banner_container.each(function(){
    var $thisContainer = $(this);
    var $slider = $thisContainer.find(".banner_slider");
    var $total_dom = $thisContainer.find(".counter_obj .total");
    var $current_dom = $thisContainer.find(".counter_obj .current");
    var $btn_control_prev = $thisContainer.find(".btn_control.prev");
    var $btn_control_next = $thisContainer.find(".btn_control.next");
    var $btn_control_auto = $thisContainer.find(".btn_control.auto");
    var $btn_control_pause = $thisContainer.find(".btn_control.pause");
    var $total = 0;
    $slider.slick({
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: false,
      accessibility: false,
    });
    $total = $slider.slick("getSlick").slideCount;

    $slider.on("swipe", function(event, slick, direction){
      // 방향: left or right
      $slider.slick("slickPlay");
    });

    $slider.on("afterChange", function (event, slick, currentSlide) {
      $current_dom.text(currentSlide + 1);
    });
    $btn_control_prev.on("click",function(){
      $slider.slick("slickPrev");
    });
    $btn_control_next.on("click",function(){
      $slider.slick("slickNext");
    });
    $btn_control_pause.on("click", function () {
      $slider.slick("slickPause");
      $(this).hide();
      $btn_control_auto.show();
    });
    $btn_control_auto.on("click", function () {
      $slider.slick("slickPlay");
      $(this).hide();
      $btn_control_pause.show();
    });
  });
}