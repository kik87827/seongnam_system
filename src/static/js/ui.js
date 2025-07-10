$(function () {
  commonInit();
  
});

$(window).on("load",function(){
  footerFunc();
  datePickEvt();
  fileUpload();
});

function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf("samsung") > -1) {
    browserAdd("samsung");
  }

  if (navigator.platform.indexOf("Win") > -1 || navigator.platform.indexOf("win") > -1) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }

  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}

function footerFunc() {
  var linkSwiper = new Swiper(".partner_item_list", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 50,
    speed: 500,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".partner_control_wrap .btn_slick_control.nav_next",
      prevEl: ".partner_control_wrap .btn_slick_control.nav_prev",
    },
  });

  $(".btn_slick_control.nav_auto").on("click", function () {
    let $this = $(this);
    $this.toggleClass("play");

    if ($this.hasClass("play")) {
      linkSwiper.autoplay.stop();
    } else {
      linkSwiper.autoplay.start();
    }
  });

  $("#btn_partner_global").on("click", function (e) {
    e.preventDefault();
    $(".partner_global_layer").slideToggle();
  });
  $(".btn_global_close").on("click", function (e) {
    e.preventDefault();
    $(".partner_global_layer").slideUp();
  });
}

/* popup */
/* class DesignPopup {
  constructor(option) {
    // variable
    this.option = option;
    this.selector = document.querySelector(this.option.selector);
    this.touchstart = "ontouchstart" in window;
    if (!this.selector) {
      return;
    }

    this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
    this.domHtml = document.querySelector("html");
    this.domBody = document.querySelector("body");
    this.pagewrap = document.querySelector(".page_wrap");
    this.layer_wrap_parent = null;
    this.btn_closeTrigger = null;
    this.scrollValue = 0;

    // init
    const popupGroupCreate = document.createElement("div");
    popupGroupCreate.classList.add("layer_wrap_parent");
    if (!this.layer_wrap_parent && !document.querySelector(".layer_wrap_parent")) {
      this.pagewrap.append(popupGroupCreate);
    }
    this.layer_wrap_parent = document.querySelector(".layer_wrap_parent");


    // event
    this.btn_close = this.selector.querySelectorAll(".btn_popup_close");
    this.bg_design_popup = this.selector.querySelector(".bg_dim");
    let closeItemArray = [...this.btn_close];
    if (!!this.selector.querySelectorAll(".close_trigger")) {
      this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
      closeItemArray.push(...this.btn_closeTrigger);
    }
    if (closeItemArray.length) {
      closeItemArray.forEach((element) => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          this.popupHide(this.selector);
        }, false);
      });
    }
  }
  dimCheck() {
    const popupActive = document.querySelectorAll(".popup_wrap.active");
    if (!!popupActive[0]) {
      popupActive[0].classList.add("active_first");
    }
    if (popupActive.length > 1) {
      this.layer_wrap_parent.classList.add("has_active_multi");
    } else {
      this.layer_wrap_parent.classList.remove("has_active_multi");
    }
  }
  popupShow() {
    this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
    if (this.selector == null) {
      return;
    }
    if (this.touchstart) {
      this.domHtml.classList.add("touchDis");
    }
    this.selector.classList.add("active");
    setTimeout(() => {
      this.selector.classList.add("motion_end");
    }, 30);
    if ("beforeCallback" in this.option) {
      this.option.beforeCallback();
    }
    if ("callback" in this.option) {
      this.option.callback();
    }
    this.layer_wrap_parent.append(this.selector);
    this.dimCheck();
  }
  popupHide(option) {
    let target = this.option.selector;
    let instance_option = option;
    if (!!target) {
      this.selector.classList.remove("motion");
      if ("beforeClose" in this.option) {
        this.option.beforeClose();
      }
      if ("beforeClose" in instance_option) {
        instance_option.beforeClose();
      }
      //remove
      this.selector.classList.remove("motion_end");
      setTimeout(() => {
        this.selector.classList.remove("active");
        let closeTimer = 0;
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = 0;
        } else {
          if ("closeCallback" in this.option) {
            this.option.closeCallback();
          }
          closeTimer = setTimeout(() => {
            if ("closeCallback" in instance_option) {
              instance_option.closeCallback();
            }
          }, 30);
        }
      }, 400);
      this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
      this.dimCheck();


      if (this.design_popup_wrap_active.length == 1) {
        this.domHtml.classList.remove("touchDis");
      }
    }
  }
} */

/* function designModal(option) {
  const modalGroupCreate = document.createElement("div");
  let domHtml = document.querySelector("html");
  let design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
  let modal_wrap_parent = null;
  let modal_item = null;
  let pagewrap = document.querySelector(".page_wrap");
  let showNum = 0;
  let okTextNode = option.okText ?? '확인';
  let cancelTextNode = option.cancelText ?? '취소';
  let closeBtnDisplay = option.closeDisplay ?? true;
  let submitBtnDisplay = option.submitDisplay ?? true;
  modalGroupCreate.classList.add("modal_wrap_parent");

  if (!modal_wrap_parent && !document.querySelector(".modal_wrap_parent")) {
    pagewrap.append(modalGroupCreate);
  } else {
    modalGroupCreate.remove();
  }
  modal_wrap_parent = document.querySelector(".modal_wrap_parent");

  let btnHTML = ``;

  if (option.modaltype === "confirm") {
    btnHTML = `
    <a href="javascript:;" class="btn_modal_submit cancelcall"><span class="btn_modal_submit_text">${cancelTextNode}</span></a>
    <a href="javascript:;" class="btn_modal_submit primary okcall"><span class="btn_modal_submit_text">${okTextNode}</span></a>
    `;
  } else {
    btnHTML = `
      <a href="javascript:;" class="btn_modal_submit primary okcall"><span class="btn_modal_submit_text">${okTextNode}</span></a>
    `;
  }


  let modal_template = `
    <div class="modal_wrap">
        <div class="bg_dim"></div>
        <div class="modal_box_tb">
            <div class="modal_box_td">
                <div class="modal_box_item">
                    <div class="modal_box_message_row">
                        <p class="modal_box_message">${option.message}</p>
                    </div>
                    <div class="btn_modal_submit_wrap">
                        ${btnHTML}
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
  modal_wrap_parent.innerHTML = modal_template;
  modal_item = modal_wrap_parent.querySelector(".modal_wrap");
  modal_item.classList.add("active");
  if (showNum) {
    clearTimeout(showNum);
  }
  showNum = setTimeout(() => {
    modal_item.classList.add("motion_end");
    modal_item.addEventListener("transitionend", (e) => {
      if (e.currentTarget.classList.contains("motion_end")) {
        if (option.showCallback) {
          option.showCallback();
        }
      }
    });
  }, 10);

  let btn_modal_submit_wrap = modal_item.querySelector(".btn_modal_submit_wrap");
  let btn_modal_submit = modal_item.querySelectorAll(".btn_modal_submit");
  let btn_modal_close = modal_item.querySelectorAll(".btn_modal_close");
  if (!submitBtnDisplay) {
    modal_item.querySelector(".modal_box_item").classList.add("submit_not");
  }
  if (!!btn_modal_submit) {
    btn_modal_submit.forEach((item) => {
      let eventIs = false;

      if (!submitBtnDisplay) {
        item.remove();
        btn_modal_submit_wrap.remove();
      } else {
        if (eventIs) {
          item.removeEventListener("click");
        }
        item.addEventListener("click", (e) => {
          let thisTarget = e.currentTarget;
          closeAction();
          if (thisTarget.classList.contains("okcall")) {
            if (option.okcallback) {
              option.okcallback();
            }
          } else if (thisTarget.classList.contains("cancelcall")) {
            if (option.cancelcallback) {
              option.cancelcallback();
            }
          }
          eventIs = true;
        });
      }


    });
  }
  if (!closeBtnDisplay) {
    modal_item.querySelector(".modal_box_item").classList.add("close_not");
  }
  if (!!btn_modal_close) {
    btn_modal_close.forEach((item) => {
      let eventIs = false;
      if (!closeBtnDisplay) {
        item.remove();
      } else {
        if (eventIs) {
          item.removeEventListener("click");
        }
        item.addEventListener("click", (e) => {
          closeAction();
          eventIs = true;
        });
      }
    })
  }

  function closeAction() {
    let actionNum = 0;
    modal_item.classList.remove("motion_end");
    if (design_popup_wrap_active.length === 0) {
      domHtml.classList.remove("touchDis");
    }
    if (actionNum) {
      clearTimeout(actionNum);
    }
    actionNum = setTimeout(() => {
      modal_item.classList.remove("active");
      modal_item.remove();
    }, 500);
  }
} */


function popupShow(option){
  $(function(){
    var $target = $(option.target) || option.target;
    var $target_close = $target.find(".close_trigger,.btn_layer_close");
    var $page_wrap = $(".page_wrap");
    var $popup_wrap = $(".popup_wrap");
    var $html_body = $("html,body");
    var $layer_dim = null;
    var setTimer = 0;

    
  
    if($(".layer_dim").length === 0){
      $page_wrap.append("<div class='layer_dim' />");
      $layer_dim = $(".layer_dim");
    }
    
    if(!!$target){
      $popup_wrap.not($target).hide();
      console.log();
      $layer_dim.fadeIn();
      $target.fadeIn();
  
      if(setTimer){clearTimeout(setTimer)}
      setTimer = setTimeout(function(){
        if("callback" in option){
          option.callback();
        }
      },520);
  
      $html_body.addClass("touchDis");
  
      $target_close.on("click",function(){
        popupHide({
          target : $(this).closest(".popup_wrap")
        });
      });
    }
  });
}

function popupHide(option){
  $(function(){
    var $target = $(option.target) || option.target;
    var $html_body = $("html,body");
    var $layer_dim = $(".layer_dim");
    var setTimer = 0;

    
    if(!!$target){
      $layer_dim.fadeOut(function(){
        $layer_dim.remove();
      });
      $target.fadeOut();
      if(setTimer){clearTimeout(setTimer)}
      setTimer = setTimeout(function(){
        if("callback" in option){
          option.callback();
        }
      },520);
      $html_body.removeClass("touchDis");
    }
  });
}

function datePickEvt() {
  $(function(){
    $.datepicker.setDefaults({
      closeText: "닫기",
      prevText: "이전달",
      nextText: "다음달",
      currentText: "오늘",
      monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
      dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
      dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
      weekHeader: "주",
      dateFormat: "yy-mm-dd", // 날짜형태 예)yy년 m월 d일
      firstDay: 0,
      isRTL: false,
      showMonthAfterYear: true,
      yearSuffix: "년",
    });

    $(".datepicker").datepicker({
      minDate: 0,
    });
  });
}

function fileUpload() {
  $(function(){
    $("#file_upload").on("change", function () {
        var fileName = $("#file_upload").val();
        $(".sort_file_txt").html(fileName);
      });
  });
}