/**
 * Created by geminiwen on 14/10/31.
 */
$(function () {
    FastClick.attach(document.body);

    wechat('hideOptionMenu');
    var productLists = [];
    var selectedIndex = -1;

    var validMobile = function (mobile) {
        do {
            if (mobile.length != 11) {
                break;
            }
            if (!/^\d+$/.test(mobile)) {
                break;
            }
            return true;
        } while (false);

        return false;
    };

    var checkMobile = function () {
        $('.circle-small').hide();
        var mobile = $('#mobile').val();

        if (mobile !== "") {
            $('.clear_btn').css("display", "inline-block");
        } else {
            $('.clear_btn').hide();
        }

        var isValid = validMobile(mobile);
        if (isValid) {
            getProductList(mobile);
        } else {
            resetProductList();
        }
    };

    $('#mobile').on('input', checkMobile);



    $('.clear_btn').click(function () {
        $('#mobile').val('');
        $('.clear_btn').hide();
        resetProductList();
    });

    /**
     * 点击了某一项 要更改选择的内容
     */
    $('.content-container').on('click', '.box', function () {
        if ($(this).hasClass("disable")) {
            $('#no-product').find($('p')).empty().append("抱歉，您所拥有的流量不足以提取该产品。您可以继续抢好友发放的红包，或关注其他后续流量相关活动。").end().show();
            setTimeout(function () {
                $('#no-product').hide();
            }, 2000);
            return;
        }
        $("button.disable").removeClass("disable");
        $('.chose').removeClass('chose');
        $(this).parent().addClass('chose');
        var index = $('.box').index(this);
        var product = productLists[index];
        var ruleContent = "1、活动范围：全国电信、全国联通、浙江移动、北京移动、广东移动<br>2、用户领取的流量将存在浙商银行微信账户，可以在流量不足时，可以在浙商银行微信里兑换充值<br>3、客服电话：400 092 5259";
        selectedIndex = index;
        $('#exchange-flow').text("-" + product.prod_par_value);
        $('#prod-amount').text(product.remainCount == -1 ? "少量库存": product.remainCount);
        $('#prod-amount-container').show();
        $('.circle-small').show();
        var prodDesc = product.prod_desc === "" ||  product.prod_desc === null ? ruleContent : product.prod_desc;
        $('.rule-content').empty().append(prodDesc);
    });

    var getProductList = function (mobile) {
        $.ajax({
            url: "/client/api/wechat/product/index",
            data: {
                "mobile": mobile,
                "page": "1",
                "clientName": clientName,
                "version": version
            },
            dataType: "json",
            beforeSend: function () {
                $('.mask').show();
                $('#modal-loading').show();
            },
            success: function (data) {
                var code = data.code;
                if (code != 1000) {
                    $('#no-product').find($('p')).empty().append("服务器出错。").end().show();
                    setTimeout(function () {
                        $('#no-product').hide();
                    }, 2000);
                    return;
                }
                $('.mask').hide();
                $('#modal-loading').hide();
                renderProductList(data.list);
            },
            error: function () {
                $('.mask').hide();
                $('#modal-loading').hide();
            }
        })
    };

    var resetProductList = function () {
        $('.product-list').show();
        $('.no-exchange').hide();
        var template = $('#reset').text();
        var container = $('.content-container table tbody');
        $("button").addClass("disable");
        container.empty();
        container.html(template);
    };

    var renderProductList = function (productList) {
        var length = productList.length;
        var i, p, html = "", scope, disable, flow = $('#flow').text();
        productLists = productList;
        if (length == 0) {
            $('.product-list').hide();
            $('.no-exchange').show();
            return;
        }
        var container = $('.content-container table tbody');
        container.empty();
        for (i = 0; i < length; i++) {
            var templateNode = "";
            if (i % 2 == 0) {
                templateNode += "<tr>" ;
            }
            p = productList[i];
            scope = parseInt(p.prod_scope, 0) === 1 ? "全国" : "本地";
            if (parseInt(p.prod_par_value, 0) > parseInt(flow, 0)) {
                disable = "disable";
            } else {
                disable = "";
            }
            var template = "<td><div class=\"box " + disable + "\"><div class=\"inner\"><div class=\"centered\"><span class=\"value\">" + p.prod_par_value + "</span>M<p class=\"area\">" + scope + "</p></div></div></div></td>";
            templateNode += template;
            if (i % 2 == 1 || i == (length-1)) {
                templateNode +=  "</tr>";
            }
            html += templateNode;
        }
        container.append(html);
    };

    var doExchange = function (product) {
        $.ajax({
            'url': '/client/api/wechat/product/exchange',
            'data': {
                'mobile': $('#mobile').val(),
                'prodId': product.prod_id,
                'clientName': clientName,
                'version': version
            },
            'dataType': 'json',
            beforeSend: function () {
                $('.mask').show();
                $('#modal-loading').show();
            },
            success: function (data) {
                $('.mask').hide();
                $('#modal-loading').hide();
                var code = data.code;
                switch (code) {
                    case 5002:
                    {
                        $('#warning-info').text("产品库存不足");
                        $('#alert').modal("open");
                        break;
                    }
                    case 4002:
                    {
                        $('#no-product').find($('p')).empty().append("用户流量不足").end().show();
                        setTimeout(function () {
                            $('#no-product').hide();
                        }, 2000);
                        break;
                    }
                    case 5001:
                    {
                        $('#no-product').find($('p')).empty().append("产品没有找到").end().show();
                        setTimeout(function () {
                            $('#no-product').hide();
                        }, 2000);
                        break;
                    }
                    case 8001:
                    {
                        $('#no-product').find($('p')).empty().append(data.msg).end().show();
                        setTimeout(function () {
                            $('#no-product').hide();
                        }, 2000);
                        break;
                    }
                    case 9998:
                    {
                        var url = data.url;
                        window.location.replace(url);
                        break;
                    }
                    case 1000:
                    {
                        window.location.replace("/exchange/exchangeSuccess");
                        break;
                    }
                    default :
                    {
                        $('#no-product').find($('p')).empty().append(data.msg).end().show();
                        setTimeout(function () {
                            $('#no-product').hide();
                        }, 2000);
                        break;
                    }
                }
            },
            error: function () {
                $('.mask').hide();
                $('#modal-loading').hide();
            }
        });
    };


    $('#confirm-exchange').click(function () {
        if ($(this).hasClass("disable")) {
            return;
        }
        if (selectedIndex == -1) {
            $('#no-product').find($('p')).empty().append("请选择产品").end().show();
            setTimeout(function () {
                $('#no-product').hide();
            }, 2000);
            return;
        }
        var product = productLists[selectedIndex];

        var prodParValue = product.prod_par_value;
        $('#order-content').html("您将要提取的是<strong>" + prodParValue + "M</strong>流量");
        $('.mask').show();
        $('#order-prompt').modal({
            relatedElement: this,
            onConfirm: function() {
                product = productLists[selectedIndex];
                doExchange(product);
                $('.mask').hide();
            },
            onCancel: function() {
                $('.mask').hide();
            }
        })
    });

    checkMobile();
});