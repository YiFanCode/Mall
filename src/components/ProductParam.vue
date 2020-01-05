<template>
    <div class="nav-bar" :class="{'is_fixed': isFixed}">
        <div class="container">
            <div class="pro-title">{{title}}</div>
            <div class="pro-param">
                <a href="javascrip:;">概述</a><span>|</span>
                <a href="javascrip:;">参数</a><span>|</span>
                <a href="javascrip:;">用户评价</a>
                <slot name="buy"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'product-param',
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                isFixed: false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.initHeight)
        },
        methods: {
            initHeight() {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || document.pageYOffset
                this.isFixed = scrollTop > 152 ? true : false
            }
        },
        destroyed() {
            window.removeEventListener('scroll', this.initHeight, false)
        }
    }
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixin.scss';
.nav-bar{
    border-top: 1px solid $colorH;
    height: 70px;
    line-height: 70px;
    background: $colorG;
    z-index: 10;
    &.is_fixed{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        box-shadow: 0 5px 5px $colorH;
    }
    .container{
        @include flex();
        .pro-title{
            font-size: $fontH;
            color: $colorB;
        }
        .pro-param{
            a{
                font-size: $fontJ;
                color: $colorC;
                &:last-of-type{
                    margin-right: 10px;
                }
            }
            span{
                margin: 0 10px;
            }
        }
    }
}
</style>