var optionsMenu = {
    item: $('.menu-main td > .frame-item-menu > div'),
    duration: 200,
    drop: 'ul',
    itemSub: '.frame-item-menu > ul > li',
    frameSub: '.frame-item-menu > ul > li > div',
    effecton: 'fadeIn',
    effectoff: 'fadeOut'
};
var optionCompare = {
    left: '.leftDescription li',
    right: '.comprasion_tovars_frame > li',
    elEven: 'li',
    frameScroll: '.comprasion_tovars_frame',
    mouseWhell: false,
    scrollNSP: true,
    scrollNSPT: '.items_catalog',
    onlyDif: $('[data-href="#only-dif"]'),
    allParams: $('[data-href="#all-params"]'),
    hoverParent: '.characteristic'
};
var genObj = {
    wishListIn: 'btn_cart',
    compareIn: 'btn_cart'
}

jQuery(document).ready(function() {
    $('.formCost input[type="text"], .number input').live('keypress', function(event) {
        var key, keyChar;
        if (!event)
            var event = window.event;

        if (event.keyCode)
            key = event.keyCode;
        else if (event.which)
            key = event.which;

        if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39)
            return true;
        keyChar = String.fromCharCode(key);

        if (!/\d/.test(keyChar)) {
            $(this).tooltip();
            return false;
        }
        else
            $(this).tooltip('remove');
    });
    if (ltie7) {
        ieInput()
    }

    $('#slider').sliderInit({
        minCost: $('#minCost'),
        maxCost: $('#maxCost')
    });

    if ($.exists('.lineForm')) {
        var params = {
            changedEl: ".lineForm select",
            visRows: 100,
            scrollArrows: true
        }
        cuSel(params);
    }
    $('.menu-main').menuPacket2(optionsMenu);

    $('.drop').drop({
        overlayColor: '#000',
        overlayOpacity: '0.6',
        before: function(el, dropEl) {
            //check for drop-report
            if ($(dropEl).hasClass('drop-report')) {
                $(dropEl).find('li').remove();
                var elWrap = $(el).closest('li').clone().removeAttr('style'),
                dropEl = $(dropEl).find('.drop-content');

                //adding product info into form
                var formCont = $('#data-report');
                var productId = el.getAttribute('data-prodid');
                formCont.find('input[name="ProductId"]').val(productId)

                elWrap.find('.photo').prependTo(elWrap)

                if (!dropEl.parent().hasClass('active')) {
                    if (!$.exists_nabir(dropEl.find('.frame-search-thumbail')))
                        dropEl.append('<ul class="frame-search-thumbail items"></ul>');
                    dropEl.find('.frame-search-thumbail').append(elWrap).find('.top_tovar, .btn, .frame_response').remove().end().parent().find('[data-clone="data-report"]').remove().end().append($('[data-clone="data-report"]').clone().removeClass('d_n'));
                }
            }
        },
        after: function(el, dropEl){
            $(dropEl).removeClass('left-report').removeClass('top-right-report');
            if ($(dropEl).hasClass('drop-report')) {
                if ($(el).offset().left < 322 - $(el).outerWidth()) $(dropEl).addClass('left-report').css('left', $(el).offset().left);
            }
            if ($(el).data('placement') == 'top right'){
                $(dropEl).addClass('top-right-report');
            }
        }
    });
    $('.tabs').tabs({
        after: function(el) {
            if (el.parent().hasClass('comprasion_head')) {
                $('.frame_tabsc > div').equalHorizCell(optionCompare);
                if (optionCompare.onlyDif.parent().hasClass('active'))
                    optionCompare.onlyDif.click();
                else
                    optionCompare.allParams.click();
            }
        }
    });

    $('.frame_tabsc > div').equalHorizCell(optionCompare);
    $('[data-rel="plusminus"]').plusminus({
        prev: 'prev.children(:eq(1))',
        next: 'prev.children(:eq(0))'
    })

    try {
        $('a[rel="group"]').fancybox({
            'padding': 45,
            'margin': 0,
            'overlayOpacity': 0.7,
            'overlayColor': '#212024',
            'scrolling': 'no'
        })
    } catch (err) {
    }
});
wnd.load(function() {
    if ($('.cycle li').length > 1) {
        $('.cycle').cycle({
            speed: 600,
            timeout: 2000,
            fx: 'fade',
            pager: '.cycle .nav',
            pagerEvent: 'click',
            pauseOnPagerHover: true,
            next: '.frame_baner .next',
            prev: '.frame_baner .prev',
            pager:      '.pager',
            pagerAnchorBuilder: function(idx, slide) {
                return '<a href="#"></a>';
            }
        }).hover(function() {
            $('.cycle').cycle('pause');
        }, function() {
            $('.cycle').cycle('resume');
        });
    }


    var $js_carousel = $('.carousel_js'),
    $frame_button = new Array();
    $item = new Array();
    $item_l = new Array();
    $item_w = new Array();
    $this_carousel = new Array();
    $this_prev = new Array();
    $this_next = new Array();

    $js_carousel.each(function(index) {
        var index = index,
        $this = $(this);

        $frame_button[index] = $this.find('.groupButton')
        $item[index] = $this.find('.items:first > li');
        $item_l[index] = $item[index].length;
        $item_w[index] = $item[index].outerWidth(true);
        $this_carousel[index] = $this.find('.carousel');
        $this_prev[index] = $this.find('.btn_prev');
        $this_next[index] = $this.find('.btn_next');
    })
    function carousel() {
        var cont_width = $('.container').width();
        $js_carousel.each(function(index) {
            var index = index,
            $count_visible = (cont_width / ($item_w[index])).toFixed(1);
            if ($item_w[index] * $item_l[index] - ($item_w[index] - $item[index].width()) > cont_width) {
                $this_carousel[index].jcarousel({
                    buttonNextHTML: $this_next[index],
                    buttonPrevHTML: $this_prev[index],
                    visible: $count_visible,
                    scroll: 1
                })
                $this_next[index].add($this_prev[index]).css('display', 'inline-block').appendTo($frame_button[index]);
            }
            else {
                $this_carousel[index].width($item_w[index] * $item_l[index])
                $this_next[index].add($this_prev[index]).css('display', 'none');
            }
            if ($(this).hasClass('frame_brand')) {
                var sH = 0;
                var brandsImg = $('.frame_brand img')
                brandsImg.each(function() {
                    var $thisH = $(this).height()
                    if ($thisH > sH)
                        sH = $thisH;
                })
                brandsImg.prev('.helper').css('height', sH);
            }
        });
    }

    carousel();

    wnd.resize(function() {
        carousel();
        navPortait();
        $('.frame_tabsc > div').equalHorizCell('refresh');
        $('.menu-main').menuPacket2('refresh');
    })
    
    navPortait();

    $('[data-toggle="buttons-radio"] .btn').on('click', function(event) {
        $(this).siblings().removeClass('active').end().addClass('active');
    })

    d_r_f_item = $('[data-radio-frame]').children();

    if ($.exists_nabir(d_r_f_item)) {
        d_r_f_item_class = d_r_f_item.attr('class').match(/span([0-9]+)/)[0];
        try {
            var span = $('.right').attr('class').match(/span([0-9]+)/)[0];
        }
        catch (err) {
        }
    }
    $('.list_pic_btn .btn').on('click', function() {
        if ($(this).children().is('.icon-cat_list')) {
            d_r_f_item.removeClass(d_r_f_item_class).addClass(span);
        }
        else {
            d_r_f_item.removeClass(span).addClass(d_r_f_item_class);
        }
    });

    var itemThumbs = $('.item_tovar .frame_thumbs > li');
    if ($.exists_nabir(itemThumbs)) {
        itemThumbs.click(function() {
            var $this = $(this);
            $this.addClass('active').siblings().removeClass('active');
        })
        $('.fancybox-next').live('click', function() {
            $this = itemThumbs.filter('.active');
            if (!$this.is(':last-child'))
                $this.removeClass('active').next().addClass('active')
            else
                itemThumbs.first().click()
        })
        $('.fancybox-prev').live('click', function() {
            $this = itemThumbs.filter('.active');
            if (!$this.is(':first-child'))
                $this.removeClass('active').prev().addClass('active')
            else
                itemThumbs.last().click()
        })
    }
    var fr_lab_l = $('.frameLabel').length;
    $('.frameLabel').each(function(index) {
        $(this).css({
            'position': 'relative',
            'z-index': fr_lab_l - index
        })
    });
    $('#suggestions').autocomlete();
    $('.btn-navbar').click(function() {
        var frameNavBar = $('.frame-navbar');
        if (!frameNavBar.hasClass('in'))
            frameNavBar.addClass('in').show();
        else
            frameNavBar.removeClass('in').hide();
    });
    $('.navStaticPages > ul > li > a').click(function(event) {
        $this = $(this);
        if ($this.next().length > 0) {
            event.preventDefault();
            $this.toggleClass('active');
            $this.next().slideToggle(500);
        }
    });
    /* Refresh when remove item from Compare */
    $('.frame_tabsc > div').equalHorizCell('refresh');
    /* End. Refresh when remove item from Compare */

    /* REMOVE LATER */
    $('.btn.btn_small.btn_small_p').unbind('click').click(function() {
        var $this = $(this),
        compTov = $this.closest('.comprasion_tovars_frame'),
        left = $this.closest('.rightDescription').prev()
        
        $this.parents('li').remove();
        if (compTov.children().length == 0) left.remove();
        else $('.frame_tabsc > div').equalHorizCell('refresh');
    });

    /*fancybox-based imagebox initialization*/
    $('a.fancybox').fancybox();
});
def_min = $('span#opt1').data('def_min');
def_max = $('span#opt2').data('def_max');
cur_min = $('span#opt3').data('cur_min');
cur_max = $('span#opt4').data('cur_max');

/*$(".star-big").starRating({
        width: 26,
        afterClick: function(el, value) {
            alert(value)
            console.log(el)
        }
    });*/

