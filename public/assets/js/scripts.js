$(function() {
    "use strict";
    var siteSticky = function() {
        $(".js-sticky-header").sticky({ topSpacing: 0 });
    };

    siteSticky();

    var siteMenuClone = function() {

        $('.js-clone-nav').each(function() {
            var $this = $(this);
            $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
        });

        $('body').on('click', '.arrow-collapse', function(e) {
            var $this = $(this);
            if ($this.closest('li').find('.collapse').hasClass('show')) {
                $this.removeClass('active');
            } else {
                $this.addClass('active');
            }
            e.preventDefault();

        });

        $(window).resize(function() {
            var $this = $(this),
                w = $this.width();

            if (w > 768) {
                if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                }
            }
        })

        $('body').on('click', '.js-menu-toggle', function(e) {
            var $this = $(this);
            e.preventDefault();

            if ($('body').hasClass('offcanvas-menu')) {
                $('body').removeClass('offcanvas-menu');
                $this.removeClass('active');
            } else {
                $('body').addClass('offcanvas-menu');
                $this.addClass('active');
            }
        })

        // click outisde offcanvas
        $(document).mouseup(function(e) {
            var container = $(".site-mobile-menu");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                }
            }
        });
    };
    siteMenuClone();



    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    let navbarlinks = select('#navbar_bottom .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('fixed-top')) {
            offset += -91
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
    }

    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar_bottom')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }
    setTimeout(function() { preloader.remove(); }, 3000);

    document.addEventListener("DOMContentLoaded", function() {

        window.addEventListener('scroll', function() {

            if (window.scrollY > 150) {
                document.getElementById('navbar_bottom').classList.add('fixed-top');

            } else {
                document.getElementById('navbar_bottom').classList.remove('fixed-top');

            }
        });
    });


    //Tracker

    $(document).ready(function() {

        $('.top_ticker').easyTicker({
            direction: 'up',
            easing: 'swing',
            speed: 'slow',
            interval: 5000,
            height: 'auto',
            visible: 1,
            mousePause: true,
            controls: {
                up: '',
                down: '',
                toggle: '',
                playText: 'Play',
                stopText: 'Stop'
            },
            callbacks: {
                before: false,
                after: false
            }
        });

    });

    // Back to top button
    (function() {
        $(document).ready(function() {
            return $(window).scroll(function() {
                return $(window).scrollTop() > 600 ? $("#back-to-top").addClass("show") : $("#back-to-top").removeClass("show")
            }), $("#back-to-top").click(function() {
                return $("html,body").animate({
                    scrollTop: "0"
                })
            })
        })
    }).call(this);

    // Cookie Popup
    const cookieStorage = {
        getItem: (item) => {
            const cookies = document.cookie
                .split(';')
                .map(cookie => cookie.split('='))
                .reduce((acc, [key, value]) => ({...acc, [key.trim()]: value }), {});
            return cookies[item];
        },
        setItem: (item, value) => {
            document.cookie = `${item}=${value};`
        }
    }
    const storageType = cookieStorage;
    const consentPropertyName = 'jdc_consent';
    const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
    const saveToStorage = () => storageType.setItem(consentPropertyName, true);
    window.onload = () => {
        const acceptFn = event => {
            saveToStorage(storageType);
            consentPopup.classList.add('hidden');
        }
        const consentPopup = document.getElementById('cookieConsentContainer');
        const acceptBtn = document.getElementById('accept');
        acceptBtn.addEventListener('click', acceptFn);
        if (shouldShowPopup(storageType)) {
            setTimeout(() => {
                consentPopup.classList.remove('hidden');
            }, 2000);
        }
    };

    // Lazy
    $(document).ready(function() { $(".lazy").each(function() { $(this).attr("src", $(this).attr("data-src")).delay(400).queue(function() { $(this).addClass('Load') }); }); });

    // ACcordion

    $(".accordion .accordion-title").on("click", function() {
        if ($(this).parent().find(".panel").css("display") === "none") {
            $(".accordion .panel").slideUp();
            $(".accordion .accordion-title").removeClass("active");
            $(this).parent().find(".panel").slideDown();
            $(this).addClass("active");
            $(".accordion .accordion-title .ri-arrow-up-s-line").hide();
            $(".accordion .accordion-title .ri-arrow-down-s-line").show();
            $(this).find(".ri-arrow-up-s-line").show();
            $(this).find(".ri-arrow-down-s-line").hide();
        } else {
            $(".accordion .panel").slideUp();
            $(".accordion .accordion-title").removeClass("active");
            $(".accordion .accordion-title").removeClass("active");
            $(".accordion .accordion-title .ri-arrow-up-s-line").hide();
            $(".accordion .accordion-title .ri-arrow-down-s-line").show();
        }
    });

    // MOdal
    $('#myModal').modal('show');


    // min/max
    /*window.inputNumber = function(el) {

            var min = el.prev().attr('min') || false;
            var max = el.next().attr('max') || false;
            var els = {};

            els.dec = el.prev();
            els.inc = el.next();

            el.each(function() {
                init($(this));
            });

            function init(el) {

                els.dec.on('click', decrement);
                els.inc.on('click', increment);

                function decrement() {
                    var value = el[0].value;
                    value--;
                    if (!min || value >= min) {
                        el[0].value = value;
                    }
                }

                function increment() {
                    var value = el[0].value;
                    value++;
                    if (!max || value <= max) {
                        el[0].value = value++;
                    }
                }
            }
    }

    inputNumber($('.input-number'));*/

    $(".input-number-increment").click(function() {
        var min = $(this).prev().attr('min') || false;
        var max = $(this).prev().attr('max') || false;

        var value = $(this).prev().val();
        value++;
        if (!max || value <= max) {
            $(this).prev().val(value++);
        }
        adjustInput(); //fonksiyonu çağır
    });

    $(".input-number-decrement").click(function() {
        var min = $(this).next().attr('min') || false;
        var max = $(this).next().attr('max') || false;

        var value = $(this).next().val();
        value--;
        if (!min || value >= min) {
            $(this).next().val(value);
        }
        adjustInput(); //fonksiyonu çağır
    });


    $('selectpicker').selectpicker();


    $(".toggle-password").click(function() {

        $(this).toggleClass("ri-eye-off-line");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    function increseNumber() {
        $('.input--amount-control').on('click', function(e) {
            var $button = $(e.target);
            var oldValue = $button.parent('.input--amount-control').find('input').val();
            if ($button.hasClass('amount-inc-btn')) {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                // Don't allow decrementing below zero
                if (oldValue > 1) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 1;
                }
            }
            $button.parent('.input--amount-control').find('input').val(newVal);
        });
    }

    increseNumber();

}); //end