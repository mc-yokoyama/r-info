(function ($) {
    'use strict';

    $(function () {
        var $header = $('#header');
        var $menu = $('#menu');
        var $menuTrigger = $('#menu-btn');
        var $menuText = $menuTrigger.find('.text');
        var open = 'open';
        var close = 'close';
        var menuOpen = 'menu-open';

        $header.addClass('fixed');
        $menu.css('display', 'none');
        $menuTrigger.addClass('close').attr('aria-expanded', 'false');

        $menuTrigger.on('click', function () {
            if (!$menu.is(':animated')) {
                if ($menuTrigger.hasClass(close)) {
                    $menuTrigger.removeClass(close).addClass(open).attr('aria-expanded', 'true');
                    $menu.slideDown();
                    $menuText.text('閉じる');
                    $header.addClass(menuOpen);
                } else if ($menuTrigger.hasClass(open)) {
                    $menuTrigger.removeClass(open).addClass(close).attr('aria-expanded', 'false');
                    $menu.slideUp();
                    $menuText.text('メニュー');
                    $header.removeClass(menuOpen);
                }
            }
        });
    });


    $(function () {
        var $tglTrigger = $('.js-tgl-trigger');
        var $tglContent = $('.js-tgl-content');

        $tglContent.css('display', 'none');
        $tglTrigger.attr('aria-expanded', 'false');

        $tglTrigger.each(function (i) {
            var $this = $(this);

            $this.attr('aria-controls', 'tgl-item-' + (i + 1)).next($tglContent).attr('id', 'tgl-item-' + (i + 1));
        });

        $tglTrigger.on('click', function () {
            var $this = $(this);

            if (!$tglContent.is(':animated')) {
                if ($this.hasClass('open')) {
                    $this.removeClass('open').attr('aria-expanded', 'false').next($tglContent).slideUp();
                    $this.find('.text').text('続きを読む');
                } else {
                    $this.addClass('open').attr('aria-expanded', 'true').next().slideDown();
                    $this.find('.text').text('閉じる');
                }
            }
        });
    });


    $(function () {
        var $headerHight = $('#header').height();

        $('a[href^="#anch"]').on('click', function () {
            var href = $(this).attr('href');
            var $target = $(href === '#' || href === '' ? 'html' : href);
            var position = $target.offset().top - $headerHight;

            $('html, body').animate({
                scrollTop: position
            }, 550, 'swing');
        });

        $(window).on('load', function () {
            var hash = location.hash;
            var $hash = $(hash);

            if ($hash.length) {
                $('html, body').scrollTop(Number($hash.offset().top) - $headerHight);
            }
        });
    });


    $(function () {
        var iconBlank = '<img src="/share/img/icon_blank.png" alt="別ウインドウで開きます" class="icon-blank">';
        // var iconBlank02 = '<img src="/share/img/icon_blank_02.png" alt="別ウインドウで開きます" class="icon-blank">';
        var iconBlank03 = '<img src="/share/img/icon_blank_03.png" alt="別ウインドウで開きます" class="icon-blank">';
        var iconPdf = '<img src="/share/img/icon_pdf.png" alt="PDFファイルを開きます" class="icon-pdf">';
        var iconExcel = '<img src="/share/img/icon_excel.png" alt="Excelファイルを開きます" class="icon-excel">';
        var iconWord = '<img src="/share/img/icon_word.png" alt="Wordファイルを開きます" class="icon-word">';

        var $linkModule = $('.link-01');
        var $btnModule = $('.btn-01, .btn-02');

        $linkModule.each(function () {
            var $this = $(this);
            var href = $this.attr('href');

            if (!$this.children().is('img') && (/\.pdf/.test(href))) {
                $this.append(iconPdf);
            } else if (!$this.children().is('img') && (/\.xlsx/.test(href))) {
                $this.append(iconExcel);
            } else if (!$this.children().is('img') && (/\.docx/.test(href))) {
                $this.append(iconWord);
            } else if (!$this.children().is('img') && $this.is('[target="_blank"]')) {
                $this.append(iconBlank);
            }
        });

        $btnModule.each(function () {
            var $this = $(this);

            if (!$this.children().hasClass('icon-blank') && $this.is('[target="_blank"]')) {
                $this.addClass('_blank').append(iconBlank03);
            }
        });
    });
}(jQuery));
