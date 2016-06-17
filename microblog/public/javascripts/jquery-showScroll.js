$.fn.showScroll = function (l) {
	var l = l || 400;
	var $this = $(this);
	$this.hide();
	var drop = true;
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > l) {
			if (drop) {
				$this.slideDown(800);
				drop = false;
			}
		} else if (!drop) {
			$this.slideUp(500);
			drop = true;
		}
	});
	return $this;
}
$.fn.fixedScroll = function() {
	var $this = $(this);
	var pcss = $this.css("position"),
		tcss = $this.css("top"),
		fixsl;
	var drop = true;
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop(),
			sl = $this.offset().top;
		if (scrollTop > sl) {
			if (drop) {
				fixsl = sl;
				$this.css({
					"position": "fixed",
					"top": "0px"
				});
				drop = false;
			}
		} else if ((scrollTop < fixsl) && !drop) {
			$this.css({
				"position": pcss,
				"top": tcss
			});
			drop = true;
		}
	});
	return $this;
}
$.fn.scaleShow = function(l) {
	var l = l || 400;
	var $this = $(this);
	var orgStyle = $this.attr("style");
	$this.css("opacity", 0).css({
		"opacity": "0.1",
		"transform": "scale(0.1)",
		"-webkit-transform": "scale(0.1)"
	});
	$this.show(function() {
		$this.css({
			"transition": "all" + " " + l + "ms ease-in-out",
			"-webkit-transition": "all" + " " + l + "ms ease-in-out",
			"opacity": "1",
			"transform": "scale(1)",
			"-webkit-transform": "scale(1)"
		});
	});
	setTimeout(function() {
		$this.attr("style", orgStyle).css("display", "block");
	}, l)
	return $this;
}
$.fn.scaleHide = function(l) {
	var l = l || 400;
	var $this = $(this);
	var orgStyle = $this.attr("style");
	$this.css({
		"transition": "all " + l + "ms ease-in-out",
		"-webkit-transition": "all " + l + "ms ease-in-out",
		"opacity": "0",
		"transform": "scale(0.1)",
		"-webkit-transform": "scale(0.1)"
	});
	setTimeout(function() {
		$this.attr("style", orgStyle).css("display", "none");
	}, l);
	return $this;
}

