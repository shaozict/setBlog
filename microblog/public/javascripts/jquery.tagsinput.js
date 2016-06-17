/*

 jQuery Tags Input Plugin 1.3.3

 Copyright (c) 2011 XOXCO, Inc

 Documentation for this plugin lives here:
 http://xoxco.com/clickable/jquery-tags-input

 Licensed under the MIT license:
 http://www.opensource.org/licenses/mit-license.php

 ben@xoxco.com

 revise by yangjie5.20160416

 */

(function($) {

	var delimiter = new Array();
	var tags_callbacks = new Array();

	function Csys(bw, bh, tw, th) {
		var boxwidth = bw || 500, //面板宽度
			boxheight = bh || 500,//面板高度
			tagwidth = tw || 110,//标签宽度
			tagheight = th || 50,//标签高度
			unit = 10;          //随机精度（1精度最高）
		var lenx = Math.floor((boxwidth - tagwidth) / unit),
			leny = Math.floor((boxheight - tagheight) / unit);
		var tx = Math.ceil(tagwidth / unit),
			ty = Math.ceil(tagheight / unit);
		this.csyslist = new Array();
		this.modlist = new Array();
		for (var j = 0; j < leny; j++) {
			for (var i = 0; i < lenx; i++) {
				this.csyslist[j * lenx + i] = j * lenx + i;
				this.modlist.push(this.csyslist[j * lenx + i]);
			}
		}
		if (typeof this.gps != "function") {
			Csys.prototype.gps = function() {
				if (!this.modlist.length) {
					for (var j = 0; j < leny; j++) {
						for (var i = 0; i < lenx; i++) {
							this.csyslist[j * lenx + i] = j * lenx + i;
							this.modlist.push(this.csyslist[j * lenx + i]);
						}
					}
				}
				var lenm = this.modlist.length;
				var r = Math.floor(Math.random() * (lenm - 1));
				var ox = this.modlist[r] % lenx,
					oy = Math.floor(this.modlist[r] / lenx);
				var minx = ox - tx > 0 ? ox - tx : 0,
					maxx = ox + tx < lenx ? ox + tx : lenx,
					miny = oy - ty > 0 ? oy - ty : 0,
					maxy = oy + ty < leny ? oy + ty : leny;
				for (var j = miny; j < maxy; j++) {
					for (var i = minx; i < maxx; i++) {
						this.csyslist[j * lenx + i] = false;
					}
				}
				this.modlist = [];
				for (var j = 0; j < leny; j++) {
					for (var i = 0; i < lenx; i++) {
						if (typeof(this.csyslist[j * lenx + i]) == "number") {
							this.modlist.push(this.csyslist[j * lenx + i]);
						}
					}
				}
				return {
					"left": ox * unit,
					"top": oy * unit
				};

			}
		}
	}

	$.fn.doAutosize = function(o) {
		var minWidth = $(this).data('minwidth'),
			maxWidth = $(this).data('maxwidth'),
			val = '',
			input = $(this),
			testSubject = $('#' + $(this).data('tester_id'));

		if (val === (val = input.val())) {
			return;
		}

		// Enter new content into testSubject
		var escaped = val.replace(/&/g, '&amp;').replace(/\s/g, ' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		testSubject.html(escaped);
		// Calculate new width + whether to change
		var testerWidth = testSubject.width(),
			newWidth = (testerWidth + o.comfortZone) >= minWidth ? testerWidth + o.comfortZone : minWidth,
			currentWidth = input.width(),
			isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth) || (newWidth > minWidth && newWidth < maxWidth);

		// Animate width
		if (isValidWidthChange) {
			input.width(newWidth);
		}


	};
	$.fn.resetAutosize = function(options) {
		// alert(JSON.stringify(options));
		var minWidth = $(this).data('minwidth') || options.minInputWidth || $(this).width(),
			maxWidth = $(this).data('maxwidth') || options.maxInputWidth || ($(this).closest('.tagsinput').width() - options.inputPadding),
			val = '',
			input = $(this),
			testSubject = $('<tester/>').css({
				position: 'absolute',
				top: -9999,
				left: -9999,
				width: 'auto',
				fontSize: input.css('fontSize'),
				fontFamily: input.css('fontFamily'),
				fontWeight: input.css('fontWeight'),
				letterSpacing: input.css('letterSpacing'),
				whiteSpace: 'nowrap'
			}),
			testerId = $(this).attr('id') + '_autosize_tester';
		if (!$('#' + testerId).length > 0) {
			testSubject.attr('id', testerId);
			testSubject.appendTo('body');
		}

		input.data('minwidth', minWidth);
		input.data('maxwidth', maxWidth);
		input.data('tester_id', testerId);
		input.css('width', minWidth);
	};

	$.fn.addTag = function(value, options) {
		options = jQuery.extend({
			focus: false,
			callback: true
		}, options);
		this.each(function() {
			var id = $(this).attr('id');
			if (typeof this.csys != "object") {
				var bw = parseInt($('#' + id + '_tagsinput').width()),
					bh = parseInt($('#' + id + '_tagsinput').height());
				var tw = parseInt(this.outting.tagwidth),
					th = parseInt(this.outting.tagheight);
				this.csys = new Csys(bw, bh, tw, th);
			}
			var csys = this.csys;
			var tagslist = $(this).val().split(delimiter[id]);
			if (tagslist[0] == '') {
				tagslist = new Array();
			}

			var valuelist = value.split(/;|；/);
			var len = valuelist.length;
			for (var i = 0; i < len; i++) {
				value = jQuery.trim(valuelist[i]);
				if (options.unique) {
					var skipTag = $(this).tagExist(value);
					if (skipTag == true) {
						//Marks fake input as not_valid to let styling it
						//						$(".tag_alert").text('"'+value+'"标签重复添加');
						$('#' + id + '_tag').addClass('not_valid');
					}
				} else {
					var skipTag = false;
				}
				if (value != '' && skipTag != true) {
					var gps = csys.gps(); //产生随机坐标
					var tag = document.createElement("span");
					$(tag).addClass('tag').append(
						$('<span>').text(value),
						$('<a>', {
							href: '#',
							text: 'x',
							value: value
						}).click(function() {
							var value = $(this).val();
							return $('#' + id).removeTag(escape(value));
						})
					).css({
						"position": "absolute",
						"left": gps.left,
						"top": gps.top
					});
					$('#' + id + '_tagsinput').append(tag);

					tagslist.push(value);

					//$('#' + id + '_tag').val('');
					if (options.focus) {
						$('#' + id + '_tag').focus();
					} else {
						$('#' + id + '_tag').blur();
					}

					$.fn.tagsInput.updateTagsField(this, tagslist);

					if (options.callback && tags_callbacks[id] && tags_callbacks[id]['onAddTag']) {
						var f = tags_callbacks[id]['onAddTag'];
						f.call(this, value);
					}
					if (tags_callbacks[id] && tags_callbacks[id]['onChange']) {
						var i = tagslist.length;
						var f = tags_callbacks[id]['onChange'];
						f.call(this, $(this), tagslist[i - 1]);
					}
				}

			}

		});

		return false;
	};

	$.fn.removeTag = function(value) {
		value = unescape(value);
		this.each(function() {
			var id = $(this).attr('id');

			var old = $(this).val().split(delimiter[id]);

			$('#' + id + '_tagsinput .tag:contains(' + value + ')').remove();
			str = '';
			for (i = 0; i < old.length; i++) {
				if (old[i] != value) {
					str = str + old[i] + delimiter[id];
				}
			}
			$(this).val(str);

			if (tags_callbacks[id] && tags_callbacks[id]['onRemoveTag']) {
				var f = tags_callbacks[id]['onRemoveTag'];
				f.call(this, value);
			}
		});

		return false;
	};

	$.fn.tagExist = function(val) {
		var id = $(this).attr('id');
		var tagslist = $(this).val().split(delimiter[id]);
		return (jQuery.inArray(val, tagslist) >= 0); //true when tag exists, false when not
	};

	// clear all existing tags and import new ones from a string
	$.fn.importTags = function(str) {
		id = $(this).attr('id');
		$('#' + id + '_tagsinput .tag').remove();
		$.fn.tagsInput.importTags(this, str);
	}

	$.fn.tagsInput = function(options) {
		var settings = jQuery.extend({
			interactive: true,
			defaultText: '',
			minChars: 0,
			width: '300px',
			height: '100px',
			tagwidth: '100px',
			tagheight: '40px',
			oneoff: 3,
			button: false,
			option: false,
			close: false,
			autocomplete: {
				selectFirst: false
			},
			'hide': true,
			'unique': true,
			'delimiter': "；",
			removeWithBackspace: true,
			placeholderColor: '#666666',
			autosize: true,
			comfortZone: 20,
			inputPadding: 6 * 2
		}, options);
		this.each(function() {
			this.outting = {
				"tagwidth": settings.tagwidth,
				"tagheight": settings.tagheight
			};
			if (settings.hide) {
				$(this).hide();
			}
			var id = $(this).attr('id');
			if (!id || delimiter[$(this).attr('id')]) {
				id = $(this).attr('id', 'tags' + new Date().getTime()).attr('id');
			}

			var data = jQuery.extend({
				pid: id,
				real_input: '#' + id,
				holder: '#' + id + '_tagsinput',
				input_wrapper: '#' + id + '_addTag',
				fake_input: '#' + id + '_tag'
			}, settings);

			delimiter[id] = data.delimiter;

			if (settings.onAddTag || settings.onRemoveTag || settings.onChange) {
				tags_callbacks[id] = new Array();
				tags_callbacks[id]['onAddTag'] = settings.onAddTag;
				tags_callbacks[id]['onRemoveTag'] = settings.onRemoveTag;
				tags_callbacks[id]['onChange'] = settings.onChange;
			}

			var markup = '<div id="' + id + '_addTag">';

			if (settings.interactive) {
				markup = markup + '<input id="' + id + '_tag" value="" data-default="' + settings.defaultText + '" />';
			}

			markup = markup + '<span style="color:red;" class="tag_alert"></span></div><div class="tags_clear"></div>';

			$(markup).insertAfter(this);
			if ($(data.real_input).val() != '') {
				$.fn.tagsInput.importTags($(data.real_input), $(data.real_input).val());
			}
			if (settings.interactive) {
				$(data.fake_input).val($(data.fake_input).attr('data-default'));
				$(data.fake_input).css('color', settings.placeholderColor);
				$(data.fake_input).resetAutosize(settings);

				$(data.holder).bind('click', data, function(event) {
					$(event.data.fake_input).focus();
				});

				$(data.fake_input).bind('focus', data, function(event) {
					if ($(event.data.fake_input).val() == $(event.data.fake_input).attr('data-default')) {
						$(event.data.fake_input).val('');
					}
					$(event.data.fake_input).css('color', '#000000');
				});

				if (settings.autocomplete_url != undefined) {
					autocomplete_options = {
						source: settings.autocomplete_url
					};
					for (attrname in settings.autocomplete) {
						autocomplete_options[attrname] = settings.autocomplete[attrname];
					}

					if (jQuery.Autocompleter !== undefined) {
						$(data.fake_input).autocomplete(settings.autocomplete_url, settings.autocomplete);
						$(data.fake_input).bind('result', data, function(event, data, formatted) {
							if (data) {
								$('#' + id).addTag(data[0] + "", {
									focus: true,
									unique: (settings.unique)
								});
							}
						});
					} else if (jQuery.ui.autocomplete !== undefined) {
						$(data.fake_input).autocomplete(autocomplete_options);
						$(data.fake_input).bind('autocompleteselect', data, function(event, ui) {
							$(event.data.real_input).addTag(ui.item.value, {
								focus: true,
								unique: (settings.unique)
							});
							return false;
						});
					}


				} else {
					// if a user tabs out of the field, create a new tag
					// this is only available if autocomplete is not used.
					$(data.fake_input).bind('blur', data, function(event) {
						var d = $(this).attr('data-default');
						if (!(settings.button)) {
							if ($(event.data.fake_input).val() != '' && $(event.data.fake_input).val() != d) {
								if ((event.data.minChars <= $(event.data.fake_input).val().length) && (!event.data.maxChars || (event.data.maxChars >= $(event.data.fake_input).val().length)))
									$(event.data.real_input).addTag($(event.data.fake_input).val(), {
										focus: true,
										unique: (settings.unique)
									});
							} else {
								$(event.data.fake_input).val($(event.data.fake_input).attr('data-default'));
								$(event.data.fake_input).css('color', settings.placeholderColor);
							}
						}
						return false;
					});

				}
				// if user types a comma, create a new tag
				$(data.fake_input).bind('keypress', data, function(event) {
					if (!(settings.button) && event.which == 13) {
						event.preventDefault();
						if ((event.data.minChars <= $(event.data.fake_input).val().length) && (!event.data.maxChars || (event.data.maxChars >= $(event.data.fake_input).val().length)))
							$(event.data.real_input).addTag($(event.data.fake_input).val(), {
								focus: true,
								unique: (settings.unique)
							});
						$(event.data.fake_input).resetAutosize(settings);
						return false;
					} else if (event.data.autosize) {
						$(event.data.fake_input).doAutosize(settings);

					}
				});
				if (settings.button) {
					$(settings.button).click(function() {
						//event.preventDefault();
						var value = $.trim($(data.fake_input).val());

						var valuelist = value.split(delimiter[id]);
						var len = valuelist.length;
						if (len > settings.oneoff + 1) {
							$(".tag_alert").text("  单次最多输入3个标签");
							return false;
						}
						//yangjie5.20160426
						//for (var i = 0; i < len; i++) {
						//	val = jQuery.trim(valuelist[i]);
						//	if (settings.unique) {
						//		var skipTag = $(data.real_input).tagExist(val);
						//		if (skipTag == true) {
						//			//Marks fake input as not_valid to let styling it
						//			$(".tag_alert").text('"'+val+'"标签重复添加');
						//			return false;
						//			//$('#' + id + '_tag').addClass('not_valid');
						//		}
						//	}
						//}
						//$(".tag_alert").text("");
						$(data.real_input).addTag(value, {
							focus: true,
							unique: (settings.unique)
						});
						//$(data.fake_input).val("");
						$(data.fake_input).resetAutosize(settings);
						return false;
					});
				};
				if (settings.option) {
					$(settings.option).on("click", ".item", function() {
						var $this = $(this);
						var $target = $(data.fake_input);
						if ($target.val() == $target.attr('data-default')) $target.val("");
						if ($target.val().indexOf($this.text()) != -1) {
							return false;
						}
						$target.val($target.val() + $this.text() + delimiter[id]);
					});
				};
				//关闭添加印象弹窗,20160426
				if (settings.close) {
					$(settings.close).click(function() {
						var $this = $(this);
						$(".tag_alert").text("");
						$(data.fake_input).val("");
						$this.closest(".modalbox").hide();
					});
				};
				//Delete last tag on backspace
				data.removeWithBackspace && $(data.fake_input).bind('keydown', function(event) {
					if (event.keyCode == 8 && $(this).val() == '') {
						event.preventDefault();
						var last_tag = $(this).closest('.tagsinput').find('.tag:last').text();
						var id = $(this).attr('id').replace(/_tag$/, '');
						last_tag = last_tag.replace(/[\s]+x$/, '');
						$('#' + id).removeTag(escape(last_tag));
						$(this).trigger('focus');
					}
				});
				$(data.fake_input).blur();

				//Removes the not_valid class when user changes the value of the fake input
				if (data.unique) {
					$(data.fake_input).keydown(function(event) {
						if (event.keyCode == 8 || String.fromCharCode(event.which).match(/\w+|[谩茅铆贸煤脕脡脥脫脷帽脩,/]+/)) {
							$(this).removeClass('not_valid');
						}
					});
				}
			} // if settings.interactive
		});

		return this;

	};

	$.fn.tagsInput.updateTagsField = function(obj, tagslist) {
		var id = $(obj).attr('id');
		$(obj).val(tagslist.join(delimiter[id]));
	};

	$.fn.tagsInput.importTags = function(obj, val) {
		$(obj).val('');
		var id = $(obj).attr('id');
		var tags = val.split(delimiter[id]);
		for (i = 0; i < tags.length; i++) {
			$(obj).addTag(tags[i], {
				focus: false,
				callback: false
			});
		}
		if (tags_callbacks[id] && tags_callbacks[id]['onChange']) {
			var f = tags_callbacks[id]['onChange'];
			f.call(obj, obj, tags[i]);
		}
	};

})(jQuery);