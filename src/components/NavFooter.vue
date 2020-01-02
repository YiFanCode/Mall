<template>
    <div class="footer">
        <div class="footer-logo">
            <img src="/imgs/logo-footer.png" alt="">
            <p class="site-name">小米商城</p>
        </div>
        <div class="footer-link">
            <p>
                <a href="">MIUI</a><span>|</span>
                <a href="">米家</a><span>|</span>
                <a href="">米粉卡</a><span>|</span>
                <a href="">政企服务</a><span>|</span>
                <a href="">小米天猫店</a><span>|</span>
                <a href="">小米集团隐私政策</a><span>|</span>
                <a href="">小米公司儿童信息保护规则</a>
            </p>
            <p>Copyright ©2019 mi.futurefe.com All Rights Reserved.</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'nav-footer'
    }
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
.footer{
    box-sizing: border-box;
    border-top: 4px solid $colorA;
    background: $colorB;
    text-align: center;
    font-size: $fontI;
    color: $colorD;
    padding: 46px 0;
    .footer-logo{
        img{
            display: inline-block;
            width: 53px;
            height: 36px;
        }
        .site-name{
            margin: 10px 0 27px 0;
            line-height: $fontI;
        }
    }
    .footer-link{
        p{
            line-height: 23px;
        }
        span{
            margin: 0 5px;
        }
        a{
            color: $colorD;
        }
    }
}
</style>