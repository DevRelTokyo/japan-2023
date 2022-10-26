(function($) {
    "use strict";

    /*-------------------------------------
    Contact Form initiating
    -------------------------------------*/
    var contactForm = $('#contact-form');
    if (contactForm.length) {
        contactForm.validator().on('submit', function(e) {
            var $this = $(this),
                $target = contactForm.find('.form-response');
            if (e.isDefaultPrevented()) {
                $target.html("<div class='alert alert-success'><p>Please select all required field.</p></div>");
            } else {
                $.ajax({
                    url: "php/mailer.php",
                    type: "POST",
                    data: contactForm.serialize(),
                    beforeSend: function() {
                        $target.html("<div class='alert alert-info'><p>Loading ...</p></div>");
                    },
                    success: function(text) {
                        if (text === "success") {
                            $this[0].reset();
                            $target.html("<div class='alert alert-success'><p>Message has been sent successfully.</p></div>");
                        } else {
                            $target.html("<div class='alert alert-success'><p>" + text + "</p></div>");
                        }
                    }
                });
                return false;
            }
        });
    }

    /*-------------------------------------
    After Load All Content Add a Class In Body
    -------------------------------------*/
    $(window).on('load', addNewClass);

    function addNewClass() {
        $('body').imagesLoaded().done(function(instance) {
            $('body').addClass('loaded');
        });
    }

    /*-------------------------------------
    Intersection Observer
    -------------------------------------*/
    if (!!window.IntersectionObserver) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active-animation");
                    //entry.target.src = entry.target.dataset.src;
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: "0px 0px -100px 0px"
        });
        document.querySelectorAll('.has-animation').forEach(block => {
            observer.observe(block)
        });
    } else {
        document.querySelectorAll('.has-animation').forEach(block => {
            block.classList.remove('has-animation')
        });
    }

    /*-------------------------------------
    Carousel
    -------------------------------------*/
    let sliderTestimonialOne = $('.sliderTestimonialOne');
    if (sliderTestimonialOne) {
        let sliderTestimonialOne = new Swiper(".sliderTestimonialOne", {
            slidesPerView: 3,
            loop: true,
            slideToClickedSlide: true,
            spaceBetween: 30,
            autoplay: {
                delay: 2000,
            },
            speed: 800,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
            },
        });
    }

    let sliderEventOne = $('.sliderEventOne');
    if (sliderEventOne) {
        let sliderEventOne = new Swiper(".sliderEventOne", {
            slidesPerView: 4,
            loop: true,
            slideToClickedSlide: true,
            spaceBetween: 30,
            autoplay: {
                delay: 200000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            speed: 800,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
                1440: {
                    slidesPerView: 4,
                },
            },
        });
    }

    let sliderscheduleOne = $('.sliderscheduleOne');
    if (sliderscheduleOne) {
        let sliderscheduleOne = new Swiper(".sliderscheduleOne", {
            slidesPerView: 3,
            loop: false,
            slideToClickedSlide: true,
            speed: 800,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true
            },

            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
            },
        });
    }

    /*-------------------------------------
	// video Thumbnail slider
	------------------------------------*/
    $(".schedule-slider-thumbnail-style-1").each(function(i) {
        let shceduleSliderThumbnailStyle1 = $(this).get(0);
        let prev = $(this).parents(".schedule-slider-main-wrap").find(".slider-btn-prev").get(0);
        let next = $(this).parents(".schedule-slider-main-wrap").find(".slider-btn-next").get(0);

        let thumbS = new Swiper(shceduleSliderThumbnailStyle1, {
            loop: true,
            slidesPerView: 3,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            speed: 800,
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
            },
        });

        let scheduleSliderStyle1 = new Swiper(".shcedule-slider-style-1", {
            loop: false,
            spaceBetween: 35,
            speed: 800,
            effect: 'coverflow',
            thumbs: {
                swiper: thumbS,
            },
        });
    });

    /*-------------------------------------
  	Jquery Serch Box
  	-------------------------------------*/
    $('a[href="#template-search"]').on("click", function(event) {
        event.preventDefault();
        var target = $("#template-search");
        target.addClass("open");
        setTimeout(function() {
            target.find('input').focus();
        }, 600);
        return false;
    });

    $("#template-search, #template-search button.close").on("click keyup", function(event) {
        if (
            event.target === this ||
            event.target.className === "close" ||
            event.keyCode === 27
        ) {
            $(this).removeClass("open");
        }
    });

    /*-------------------------------------
    Offcanvas Menu activation code
    -------------------------------------*/
    $('#wrapper').on('click', '.offcanvas-menu-btn', function(e) {
        e.preventDefault();
        var $this = $(this),
            wrapper = $(this).parents('body').find('>#wrapper'),
            wrapMask = $('<div />').addClass('offcanvas-mask'),
            offCancas = $('#offcanvas-wrap'),
            position = offCancas.data('position') || 'left';

        if ($this.hasClass('menu-status-open')) {
            wrapper.addClass('open').append(wrapMask);
            offCancas.css({
                'transform': 'translateX(0)'
            });
        } else {
            removeOffcanvas();
        }

        function removeOffcanvas() {
            wrapper.removeClass('open').find('> .offcanvas-mask').remove();
            if (position === 'left') {
                offCancas.css({
                    'transform': 'translateX(-105%)'
                });
            } else {
                offCancas.css({
                    'transform': 'translateX(105%)'
                });
            }
        }
        $(".offcanvas-mask, .offcanvas-close").on('click', function() {
            removeOffcanvas();
        });

        return false;
    });

    $(window).on('scroll', function() {

        // Back Top Button
        var heroAreaHeight = $("#hero-area-space").outerHeight();
        if ($(window).scrollTop() > heroAreaHeight) {
            $('#template-fixed-bg-wrap').addClass('for-bg-fixed');
        } else {
            $('#template-fixed-bg-wrap').removeClass('for-bg-fixed');
        }
        // Back Top Button
        if ($(window).scrollTop() > 700) {
            $('.return-to-top').addClass('back-top');
        } else {
            $('.return-to-top').removeClass('back-top');
        }

        // Sticky Menu
        if ($('header').hasClass('sticky-on')) {
            var stickyPlaceHolder = $("#sticky-placeholder"),
                menu = $("#navbar-wrap"),
                menuH = menu.outerHeight(),
                topbarH = $('#topbar-wrap').outerHeight() || 0,
                targrtScroll = topbarH,
                header = $("header");
            if ($(window).scrollTop() > targrtScroll) {
                header.addClass('sticky');
                stickyPlaceHolder.height(menuH);
            } else {
                header.removeClass('sticky');
                stickyPlaceHolder.height(0);
            }
        }

        // Sticky Menu
        if ($('header.header4').hasClass('sticky-on')) {
            var stickyPlaceHolder = $("#sticky-placeholder"),
                menu = $("#navbar-wrap"),
                menuH = menu.outerHeight(),
                topbarH = 60,
                targrtScroll = topbarH,
                header = $("header");
            if ($(window).scrollTop() > targrtScroll) {
                header.addClass('sticky');
                stickyPlaceHolder.height(menuH);
            } else {
                header.removeClass('sticky');
                stickyPlaceHolder.height(0);
            }
        }
    });

    /*-------------------------------------
    Background image
    -------------------------------------*/
    $("[data-bg-image]").each(function() {
        var img = $(this).data("bg-image");
        $(this).css({
            backgroundImage: "url(" + img + ")"
        });
    });


    /*-------------------------------------
    Google Map
    -------------------------------------*/
    $(window).on("load", function() {


        if ($('.rt-mfp-gallery-item')) {
            $('.rt-mfp-gallery-item').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        }


        let videoPopUp = $(".play-btn");
        if (videoPopUp.length) {
            videoPopUp.magnificPopup({
                type: "iframe",
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">' +
                        '<div class="mfp-close"></div>' +
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                        "</div>",
                    patterns: {
                        youtube: {
                            index: "youtube.com/",
                            id: "v=",
                            src: "https://www.youtube.com/embed/%id%?autoplay=1",
                        },
                        vimeo: {
                            index: "vimeo.com/",
                            id: "/",
                            src: "//player.vimeo.com/video/%id%?autoplay=1",
                        },
                        gmaps: {
                            index: "//maps.google.",
                            src: "%id%&output=embed",
                        },
                    },
                    srcAction: "iframe_src",
                },
            });
        }
        // wow
        wow.init();
        // Page Preloader
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    });

    /*-------------------------------------
    Countdown
    -------------------------------------*/
    $(function() {
        var eventCounter = $(".countdown");
        if (eventCounter.length) {
            eventCounter.countdown("2022/06/01", function(e) {
                $(this).html(
                    e.strftime(
                        "<div class='countdown-section'><div><div class='countdown-number'>%m</div> <div class='countdown-unit'>Month%!m</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%n</div> <div class='countdown-unit'>Day%!n</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H</div> <div class='countdown-unit'>Hour%!H</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M</div> <div class='countdown-unit'>Minutes</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> <div class='countdown-unit'>Seconds</div> </div></div>"
                    )
                );
            });
        }
    });

    /*--------------------------------
    CurrentYear
    -------------------------------*/
    let currentYear = document.getElementById("currentYear");
    if (currentYear) {
        let date = new Date();
        let currYear = date.getFullYear();
        currentYear.innerText = currYear;
    }

    /*-------------------------------------
    Masonry
    -------------------------------------*/
    let masonryItems = $('.masonry-items');
    if (masonryItems.length) {
        $('.masonry-items').masonry({
            itemSelector: '.masonry-item',
            columnWidth: '.masonry-item',
            horizontalOrder: true
        });
    }

    /*-------------------------------------
    WOW
    -------------------------------------*/
    var wow = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: false,
        live: true,
        scrollContainer: null,
    });

    /*-------------------------------------
    Mobile Menu Toggle
    -------------------------------------*/
    $(".sidebarBtn").on("click", function(e) {
        e.preventDefault();
        if ($(".rt-slide-nav").is(":visible")) {
            $(".rt-slide-nav").slideUp();
            $("body").removeClass("slidemenuon");
        } else {
            $(".rt-slide-nav").slideDown();
            $("body").addClass("slidemenuon");
        }
    });

    /*-------------------------------------
    Mobile Menu Dropdown
    -------------------------------------*/
    var a = $(".offscreen-navigation .menu");
    if (a.length) {
        a.children("li").addClass("menu-item-parent");
        a.find(".menu-item-has-children > a").on("click", function(e) {
            e.preventDefault();
            $(this).toggleClass("opened");
            var n = $(this).next(".sub-menu"),
                s = $(this).closest(".menu-item-parent").find(".sub-menu");
            a.find(".sub-menu").not(s).slideUp(250).prev("a").removeClass("opened"),
                n.slideToggle(250);
        });
        a.find(".menu-item:not(.menu-item-has-children) > a").on(
            "click",
            function(e) {
                $(".rt-slide-nav").slideUp();
                $("body").removeClass("slidemenuon");
            }
        );
    }

    /*---------------------------------------
    Background Parallax
    --------------------------------------- */
    if ($('.parallaxie').length) {
        $(".parallaxie").parallaxie({
            speed: 0.5,
            offset: 0,
        });
    }

    /*-------------------------------------
    Buble Background On Hover
    -------------------------------------*/
    $('.animated-bg-wrap').on('mouseenter', function(e) {
        var parentOffset = $(this).offset(),
            relX = e.pageX - parentOffset.left,
            relY = e.pageY - parentOffset.top;
        if ($(this).find('.animated-bg-wrap .animated-bg')) {
            $('.animated-bg-wrap .animated-bg').css({
                top: relY,
                left: relX,
            });
        }
    });
    $('.animated-bg-wrap').on('mouseout', function(e) {
        var parentOffset = $(this).offset(),
            relX = e.pageX - parentOffset.left,
            relY = e.pageY - parentOffset.top;
        if ($(this).find('.animated-bg-wrap .animated-bg')) {
            $('.animated-bg-wrap .animated-bg').css({
                top: relY,
                left: relX,
            });
        }
    });

    /*-------------------------------------
    Menu Active Class
    -------------------------------------*/
    function menuActiveClass() {
        let currentPage = location.pathname.split("/"),
            current = (currentPage[currentPage.length - 1]);
        $(".menu li a").each(function() {
            let $this = $(this);
            if ($this.attr("href") === current) {
                $this.parents('.menu-item').addClass("active");
                $this.parents(".menu-item-has-children").addClass("active");
            }
        });
    }
    menuActiveClass();

    /*-------------------------------------
    Anchor Tag - Prevent Default
    -------------------------------------*/
    $('a[href=\\#]').on('click', function(e) {
        e.preventDefault();
    });


})(jQuery);