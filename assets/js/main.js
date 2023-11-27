document.addEventListener('DOMContentLoaded', function () {

	// Fixed Triangle
	function fixedTriangle() {
		var fixedTriangle = document.querySelector(".triangle--fixed");
		if (!fixedTriangle) return;
		var logo = document.querySelector(".header .logo");

		var logoWidth = logo.offsetWidth;
		var percent = (logoWidth / 100) * 7.8;


		var borderWidth = logo.offsetLeft + percent;
		console.log(borderWidth / 2 + percent);

		fixedTriangle.style.borderWidth = borderWidth / 2 + percent + "px";
		if (window.outerWidth < 1200) {
			fixedTriangle.style.borderWidth = borderWidth / 2 + percent - 1 + "px";
		}
		if (window.outerWidth < 992) {
			fixedTriangle.style.borderWidth = borderWidth / 2 + percent - 6 + "px";
		}
		if (window.outerWidth < 576) {
			fixedTriangle.style.borderWidth = borderWidth / 2 + percent - 3 + "px";
		}


	}


	fixedTriangle();
	window.addEventListener("resize", function () {
		fixedTriangle();
	});
});


(function ($) {
	"use strict";
	$(document).ready(function () {
		// Global variables
		const windowWidth = $(window).width();

		/* ======= Sticky Menu ======= */
		! function () {
			var lastScrollTop = 0;
			var windows = $(window);
			var sticky = $(".custom-header");

			windows.on("scroll", function () {
				var scroll = windows.scrollTop();

				if (!scroll) {
					sticky.removeClass("stick");
					sticky.css({
						transitionDuration: '0s'
					})
				}
				if (scroll > sticky.innerHeight()) {
					sticky.addClass('stick');
					setTimeout(function () {
						sticky.css({
							transitionDuration: '.5s'
						})
					}, 50)

					if (scroll > lastScrollTop) {
						sticky.addClass('up');
						sticky.removeClass('down');
					} else {
						sticky.addClass('down');
						sticky.removeClass('up');
					}
				}
				lastScrollTop = scroll;
			});
		}();

		// popup video
		$(".popup-video").magnificPopup({
			type: "iframe",
			iframe: {
				markup: '<div class="mfp-iframe-scaler">' +
					'<div class="mfp-close"></div>' +
					'<iframe class="mfp-iframe" frameborder="0" allow="autoplay"></iframe>' +
					"</div>",
				patterns: {
					youtube: {
						index: "youtube.com/",
						id: "v=",
						src: "https://www.youtube.com/embed/%id%?autoplay=1",
					},
				},
			},
		});
		// Wow JS
		new WOW().init();
		const csLG = new Swiper("#blogSlider1", {
			initialSlide: 0,
			loop: true,
			grabCursor: true,
			allowTouchMove: false,
			effect: "creative",
			speed: 1000,
			creativeEffect: {
				prev: {
					shadow: false,
					translate: ["-20%", 0, -1],
				},
				next: {
					translate: ["100%", 0, 0],
				},
			},
		});
		const csSM = new Swiper("#blogSlider2", {
			initialSlide: 1,
			loop: true,
			grabCursor: true,
			allowTouchMove: false,
			effect: "creative",
			speed: 1000,
			creativeEffect: {
				prev: {
					shadow: false,
					translate: ["-20%", 0, -1],
				},
				next: {
					translate: ["100%", 0, 0],
				},
			},
		});
		const csSM2 = new Swiper("#blogSlider3", {
			initialSlide: 2,
			loop: true,
			grabCursor: true,
			speed: 1000,
			allowTouchMove: false,
			effect: "creative",
			creativeEffect: {
				prev: {
					shadow: false,
					translate: ["-20%", 0, -1],
				},
				next: {
					translate: ["100%", 0, 0],
				},
			},
		});
		var prevButton = document.getElementById("custom-prev-button");
		var nextButton = document.getElementById("custom-next-button");
		prevButton.addEventListener("click", function () {
			csLG.slidePrev();
			csSM.slidePrev();
			csSM2.slidePrev();
		});
		nextButton.addEventListener("click", function () {
			csLG.slideNext();
			csSM.slideNext();
			csSM2.slideNext();
		});
		//Dropdown
		if (windowWidth >= 992) {
			$(".custom-dropdown").hover(
				function () {
					$(this).find(".sub-menu").slideDown("fast");
				},
				function () {
					$(this).find(".sub-menu").slideUp("fast");
				}
			);
		}
		if (windowWidth <= 991) {
			$(".custom-dropdown").click(function () {
				var isActive = $(this).hasClass("active");
				$(".custom-dropdown").removeClass("active");
				$(".custom-dropdown").not(this).find(".sub-menu").slideUp("fast");
				$(this).find(".sub-menu").slideToggle("fast");
				if (!isActive) {
					$(this).addClass("active");
				}
			});
		}

		// Sticky Sidebar
		if (windowWidth > 991) {
			let previewImgs = $("#previewImg");
			if (previewImgs.length > 0) {
				let containerEl = previewImgs.closest("#scrollSection");
				previewImgs.theiaStickySidebar({
					containerSelector: containerEl,
					additionalMarginTop: 0,
					additionalMarginBottom: 0,
				});
			}
		}
		// Sticky photo change, bar animation for division page
		const scrollSection = $("#scrollSection");
		if (scrollSection.length > 0) {
			const solutions = $("#scrollSection .solution");
			const sectionTop = scrollSection.offset().top;
			solutions.each(function (index) {
				const solutionTop = $(this).offset().top;
				const offsetTopPx = solutionTop - sectionTop;
				$(this).attr("data-offset-top", offsetTopPx);
				if (index != 0) {
					$(this).data("downscroll-fired", false);
				} else {
					$(this).data("downscroll-fired", true);
				}
			});
			var lastScrollTop = 0;
			$(window).scroll(function () {
				let winScroll = $(window).scrollTop();
				const headerHeight = $("#mainHeader").height();
				const sectionTop = scrollSection.offset().top - headerHeight;
				const winHeight = $(window).height();
				const halfWinHeight = winHeight / 2;
				const imgItem = $("#galleryWrap");
				let scrolledPixels = winScroll - sectionTop + halfWinHeight - 190;
				if (winScroll > lastScrollTop) {
					solutions.each(function (index) {
						var dataOffsetTop = $(this).data("offset-top");
						if (scrolledPixels >= dataOffsetTop) {
							if (!$(this).data("downscroll-fired")) {
								let wrapperBgSrc = $(this).data("bg-src");
								let wrapperProductSrc = $(this).data("product-src");
								let innerImgs = imgItem.find("img");
								$(innerImgs[0]).animate({opacity: 0}, 500, function () {
									$(this).attr("src", wrapperBgSrc);
									$(this).animate({opacity: 1}, 500);
								});
								$(innerImgs[1]).animate({opacity: 0}, 500, function () {
									$(this).attr("src", wrapperProductSrc);
									$(this).animate({opacity: 1,}, 500);
								});
								$(this).data("downscroll-fired", true);
								setTimeout(function () {
									imgItem.removeClass("wrap" + index);
									imgItem.addClass("wrap" + (index + 1));
								}, 500)
							}
						}
					});
				} else {
					solutions.each(function (index) {
						var dataOffsetTop = $(this).data("offset-top");
						if (scrolledPixels < dataOffsetTop) {
							if (index !== 0) {
								if ($(this).data("downscroll-fired")) {
									let wrapperBgSrc = $(solutions[index - 1]).data("bg-src");
									let wrapperProductSrc = $(solutions[index - 1]).data("product-src");
									let innerImgs = imgItem.find("img");
									$(innerImgs[0]).animate({opacity: 0}, 500, function () {
										$(this).attr("src", wrapperBgSrc);
										$(this).animate({opacity: 1}, 500);
									});
									$(innerImgs[1]).animate({opacity: 0}, 500, function () {
										$(this).attr("src", wrapperProductSrc);
										$(this).animate({opacity: 1,}, 500);
									});
									$(this).data("downscroll-fired", false);
									setTimeout(function () {
										imgItem.removeClass("wrap1 wrap2 wrap3 wrap4 wrap5");
										imgItem.addClass("wrap" + index);
									}, 500);
								}
							}
						}
					});
				}
				lastScrollTop = winScroll;
			});
		}
	});



// wirte a code nishan 


 pagination: {
        el: ".swiper-pagination",
      },




})(jQuery);