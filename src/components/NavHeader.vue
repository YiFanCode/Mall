<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MIUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" @click="login" v-else>登录</a>
                    <a href="javascript:;" v-if="username" @click="logout">退出</a>
                    <a href="javascript:;" v-if="username">我的订单</a>
                    <a href="javascript:;" v-else>注册</a>
                    <a href="javascript:;"  @click="goToCart" class="my-cart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>小米手机</span>
                        <div class="children">
                            <ul class="clearfix">
                                <li v-for="(item, index) in phoneList" :key="index" class="product">
                                    <a :href="'/#/product/'+item.categoryId" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="item.mainImage" alt="">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price | currency}}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>RedMi红米</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children">
                            <ul class="clearfix">
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="">
                                        </div>
                                        <div class="pro-name">小米壁画电视 65英寸</div>
                                        <div class="pro-price">6999元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                                        </div>
                                        <div class="pro-name">小米全面屏电视E55A</div>
                                        <div class="pro-price">1999元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="">
                                        </div>
                                        <div class="pro-name">小米电视4A 32英寸</div>
                                        <div class="pro-price">699元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="">
                                        </div>
                                        <div class="pro-name">小米电视4A 55英寸</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="">
                                        </div>
                                        <div class="pro-name">小米电视4A 65英寸</div>
                                        <div class="pro-price">2699元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt="">
                                        </div>
                                        <div class="pro-name">查看全部</div>
                                        <div class="pro-price">查看全部</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <span class="flex-1"></span>
                <div class="header-search">
                    <div class="wapper">
                        <input class="search-input" type="text" name="keyword">
                        <a class="search-btn" href="javascript:;"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'nav-header',
        data() {
            return {
                phoneList: []
            }
        },
        mounted() {
            this.getProductList()
        },
        computed: {
            ...mapState(['username','cartCount'])
        },
        methods: {
            login() {
                this.$router.push('/login')
            },
            async getProductList() {
                const result = await this.axios.get('/products', {
                    params: {
                        categoryId: '100012'
                    }
                })
                this.phoneList = result.list.length > 6 ? result.list.slice(0, 6): result.list
            },
            goToCart() {
                this.$router.push('/cart')
            },
            logout(){
                this.axios.post('/user/logout').then(()=>{
                    // this.$message.success('退出成功');
                    this.$cookie.set('userId','',{expires:'-1'});
                    this.$store.dispatch('saveUserName','');
                    this.$store.dispatch('saveCartCount','0');
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixin.scss';

.header{
    .nav-topbar{
        height: 39px;
        line-height: 39px;
        background: #333;
        color: #b0b0b0;
        .container{
            @include flex();
            a{
                display: inline-block;
                color: #b0b0b0;
                margin-right: 17px;
            }
            .my-cart{
                width: 110px;
                background: $colorA;
                text-align: center;
                color: #fff;
                margin-right: 0;
                .icon-cart{
                    display: inline-block;
                    width: 16px;
                    height: 12px;
                    background: url('/imgs/icon-cart-checked.png') no-repeat center;
                    background-size: contain;
                    margin-right: 4px;
                }
            }
        }
    }
    .nav-header{
        .container{
            height: 112px;
            @include flex(flex-start, center);
            .header-menu{
                padding-left: 209px;
                .item-menu{
                    display: inline-block;
                    color: $colorB;
                    line-height: 112px;
                    font-weight: bold;
                    font-size: $fontI;
                    padding: 0 10px;
                    span{
                        cursor: pointer;
                    }
                    &:hover{
                        color: $colorA;
                        .children{
                            height: 220px;
                            opacity: 1;
                        }
                    }
                    .children{
                        box-sizing: border-box;
                        width: 1226px;
                        height: 0;
                        opacity: 0;
                        transition: all .5s;
                        position: absolute;
                        top: 112px;
                        left: 0;
                        z-index: 10;
                        border-top: 1px solid $colorH;
                        box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                        overflow: hidden;
                        background: #fff;
                        .product{
                            position: relative;
                            width: 16.6%;
                            height: 220px;
                            box-sizing: border-box;
                            float: left;
                            font-size: 12px;
                            line-height: 12px;
                            text-align: center;
                            a{
                                display: inline-block;
                            }
                            img{
                                width: auto;
                                height: 111px;
                                margin-top: 26px;   
                            }
                            .pro-img{
                                height: 137px;
                            }
                            .pro-name{
                                color: $colorB;
                                font-weight: bold;
                                margin: 19px 0 8px 0;
                            }
                            .pro-price{
                                color: $colorA;
                            }
                            &:before{
                                content: " ";
                                position: absolute;
                                top: 28px;
                                right: 0;
                                height: 99px;
                                border-left: 1px solid $colorF;
                            }
                            &:last-child:before{
                                display: none;
                            }
                        }
                    }
                }
            }
            .header-search{
                width: 319px;
                border: 1px solid #E0E0E0;
                .wapper{
                    height: 50px;
                    @include flex();
                    .search-input{
                        width: 264px;
                        height: 50px;
                        padding-left: 14px;
                        border: none;
                        box-sizing: border-box;
                    }
                    .search-btn{
                        box-sizing: border-box;
                        border-left: 1px solid #E0E0E0;
                        @include bgImg(55px, 50px, '/imgs/icon-search.png', 18px 18px);
                        background-position: center;
                    }
                }
            }
        }
    }
}
</style>