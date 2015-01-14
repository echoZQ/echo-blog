<!DOCType html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link type="text/css" rel="stylesheet" href="http://cdn.amazeui.org/amazeui/2.0.0/css/amazeui.min.css">
    <link type="text/css" rel="stylesheet" href="/static/css/client/zheshang/exchange.css">
    <title>提取</title>
</head>
<body>
<div class="banner">
    <img src="/static/images/client/zheshang/exchange_bg.png">
    <div class="circle-big">
        <img src="/static/images/client/zheshang/circle_big.png">
        <div class="text">
            <p>我的流量</p>
            <p><span style="font-size: 26px;" id="flow"><?php if(!empty($user['flow'])) echo $user['flow']; else echo "0"; ?></span><span>M</span></p>
        </div>
    </div>
    <div class="circle-small" style="display: none;">
        <img src="/static/images/client/zheshang/circle_small.png">
        <div class="text">
            <p><span id="exchange-flow">0</span><span>M</span></p>
        </div>
    </div>
</div>
<div class="input">
    <input type="tel" id="mobile" value="<?php echo $user['phone']; ?>" placeholder="请输入手机号码查看可兑换产品" maxlength="11">
</div>
<div class="header">
    <div class="left">可兑换产品</div>
    <div class="right"><a href="http://weixin.liulianggo.com/app/qgzheshangyh/history">历史记录</a></div>
</div>
<div class="product-list">
    <div class="content-container">
        <table cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <div class="box disable">
                        <div class="inner">
                            <div class="centered">
                                <span class="value">50</span>M
                                <p class="area">全国</p>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="box disable">
                        <div class="inner">
                            <div class="centered">
                                <span class="value">50</span>M
                                <p class="area">全国</p>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="box disable">
                        <div class="inner">
                            <div class="centered">
                                <span class="value">80</span>M
                                <p class="area">全国</p>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="box disable">
                        <div class="inner">
                            <div class="centered">
                                <span class="value">100</span>M
                                <p class="area">全国</p>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="box disable">
                        <div class="inner">
                            <div class="centered">
                                <span class="value">150</span>M
                                <p class="area">全国</p>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="box disable">
                        <div class="inner">
                            <div class="centered">
                                <span class="value">200</span>M
                                <p class="area">全国</p>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="no-exchange">
    <div>
        <img src="/static/images/no-exchange.png" style="display: block;margin-bottom: 20px" />
        <div>相关产品正在努力上架中</br>敬请期待</div>
    </div>
</div>
<div class="info">
    <button id="confirm-exchange">确定兑换</button>
</div>
<div class="rule">
    <p>活动规则</p>
    <div class="rule-content">
        1、活动范围：全国电信、全国联通、浙江移动、北京移动、广东移动<br>
        2、用户领取的流量将存在浙商银行微信账户，可以在流量不足时，可以在浙商银行微信里兑换充值<br>
        3、客服电话：400 092 5259
    </div>
</div>

<div class="am-modal am-modal-alert" tabindex="-1" id="alert">
    <div class="am-modal-dialog">
        <div class="am-modal-hd">啊哦</div>
        <div class="am-modal-bd" id="warning-info">
        </div>
        <div class="am-modal-footer">
            <span class="am-modal-btn">确定</span>
        </div>
    </div>
</div>

<div class="am-modal am-modal-prompt" tabindex="-1" id="order-prompt">
    <div class="am-modal-dialog">
        <div class="am-modal-hd">订单确认</div>
        <div class="am-modal-bd" id="order-content">

        </div>
        <div class="am-modal-footer">
            <span class="am-modal-btn" data-am-modal-cancel>取消</span>
            <span class="am-modal-btn" data-am-modal-confirm>提交</span>
        </div>
    </div>
</div>

<div id="modal-loading">
    <div class="am-modal-hd">正在载入...</div>
    <div class="am-modal-bd">
        <span class="am-icon-spinner am-icon-spin"></span>
    </div>
</div>

<div class="mask"></div>

<div id="no-product">
    <div class="am-alert am-alert-danger">
        <p>抱歉，您所拥有的流量不足以提取该产品。您可以继续抢好友发放的红包，或关注其他后续流量相关活动。</p>
    </div>
</div>

    <script type="text/javascript">
        var flowAmount = '<?php echo $user['flow']; ?>';
        var clientName = '<?php echo $clientName; ?>';
        var version = '<?php echo $version;?>';
    </script>
    <script type="text/javascript" src="/assets/javascript/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="/assets/javascript/wechat.min.js"></script>
    <script type="text/javascript" src="http://cdn.amazeui.org/amazeui/2.0.0/js/amazeui.min.js"></script>
    <script type="text/javascript" src="/assets/javascript/fastclick.min.js" ></script>
    <script type="text/javascript" src="/static/javascript/dist/client/zheshang/productList.min.js" ></script>
</body>
</html>
