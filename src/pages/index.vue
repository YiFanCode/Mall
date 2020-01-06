<template>
    <div class="index">
        <div class="container">
            <div class="swiper-box">
                <div class="nav-menu">
                    <ul class="nav-wrap">
                        <li class="nav-item">
                            <a href="javascript:;">手机 电话卡</a>
                            <div class="children">
                                <ul v-for="(item, i) in menuList" :key="i">
                                    <li v-for="(sub, j) in item" :key="j">
                                        <a :href="sub ? '/#/product/'+ sub.id : ''">
                                            <img v-lazy="sub ? sub.img : '/imgs/item-box-1.png'" alt=""><span>{{sub ? sub.name : '小米9'}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:;">电视 盒子</a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:;">笔记本 平板</a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:;">家电 插线板</a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:;">出行 穿戴</a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:;">智能 路由器</a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:;">电源 配件</a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:;">生活 箱包</a>
                        </li>
                    </ul>
                </div>
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item, index) in slideList" :key="index">
                        <a :href="'/#/product/'+ item.id"><img :src="item.img" alt="" /></a>
                    </swiper-slide>
                    <div class="swiper-pagination"  slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
            <div class="ads-box">
                <div class="ads-wrap">
                    <a class="ads-item" v-for="(item,index) in absList" :key="index" :href="'/#/product/'+item.id">
                       <img v-lazy="item.img" alt="">
                    </a>
                </div>
            </div>
            <div class="banner">
                <a :href="'/#/product/'+banner.id"><img v-lazy="banner.img" alt=""></a>
            </div>
        </div>
        <div class="product-box">
            <div class="container">
                <div class="category" v-for="(category, i) in phoneList" :key="i">
                    <h2 class="category-title">{{category.categoryTitle}}</h2>
                    <div class="wrapper">
                        <div class="banner-left">
                            <a href="/#/product/33"><img v-lazy="category.categoryList.bannerLeft" alt=""></a>
                        </div>
                        <div class="list-box">
                            <div class="list-item" v-for="(item, j) in category.categoryList.categoryProduct" :key="j">
                                <span v-if="j % 2 === 0" class="tag prod-new">新品</span>
                                <!-- <span v-else class="tag prod-kill">秒杀</span> -->
                                <div class="product-img">
                                    <img v-lazy="item.mainImage" alt="">
                                </div>
                                <div class="item-info">
                                    <h3 class="prod-title">{{item.name}}</h3>
                                    <p class="prod-desc">{{item.subtitle}}</p>
                                    <p class="prod-price" @click="addCart(item.id)">{{item.price | currency}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal modalType="middle" title="提示" btnType="1" @submit="goToCart" @cancel="showModal=false" sureText="查看购物车" :showModal="showModal">
            <template v-slot:body>
                <p>商品添加成功！</p>
            </template>
        </modal>
        <service-bar></service-bar>
    </div>
</template>

<script>
    import ServiceBar from 'components/ServiceBar'
    import Modal from 'components/Modal'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    export default {
        name: 'index',
        data() {
            return {
                showModal: false,
                swiperOption: {
                    autoplay: {
                        disableOnInteraction: false
                    },
                    loop: true,
                    effect : 'cube',
                    cubeEffect: {
                        shadowOffset: 100,
                        shadowScale: 0.6
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                },
                slideList: [
                    {id: '42', img: '/imgs/slider/slide-1.jpg' },
                    {id: '45', img: '/imgs/slider/slide-2.jpg' },
                    {id: '46', img: '/imgs/slider/slide-3.jpg' },
                    {id: '', img: '/imgs/slider/slide-4.jpg' },
                    {id: '', img: '/imgs/slider/slide-5.jpg' }
                ],
                menuList: [
                    [
                        { id: 30, img: '/imgs/item-box-1.png', name: '小米CC9' },
                        { id: 31, img: '/imgs/item-box-2.png', name: '小米8 青春版' },
                        { id: 33, img: '/imgs/item-box-3.jpg', name: 'Redmi K20 Pro' },
                        { id: 34, img: '/imgs/item-box-4.jpg', name: '移动4G+专区' }
                    ],
                    [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]
                ],
                absList: [
                    {id: 33, img: '/imgs/ads/ads-1.png'},
                    {id: 48, img: '/imgs/ads/ads-2.jpg'},
                    {id: 45, img: '/imgs/ads/ads-3.png'},
                    {id: 47, img: '/imgs/ads/ads-4.jpg'}
                ],
                banner: {id: '', img: '/imgs/banner-1.png'},
                phoneList: [
                    {
                        categoryTitle: '手机',
                        categoryList :{
                            bannerLeft: '/imgs/mix-alpha.jpg',
                            categoryProduct: []
                        }
                    }
                ]
            }
        },
        mounted() {
            this.init()
        },
        components: {
            ServiceBar,
            swiper,
            swiperSlide,
            Modal
        },
        methods: {
            async init() {
                const res = await this.axios.get('/products', {
                    params: {
                        categoryId: '100012',
                        pageSize: 14
                    }
                })
                this.phoneList[0].categoryList.categoryProduct = res.list.slice(6,14);
            },
            addCart(id) {
                this.axios.post('/carts',{
                    productId: id, 
                    selected: true
                }).then(res => {
                    this.$store.dispatch("saveCartCount", res.cartTotalQuantity)
                    this.showModal = true
                }) 
            },
            goToCart() {
                this.$router.push('/cart')
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~assets/scss/base.scss';
@import '~assets/scss/config.scss';
@import '~assets/scss/mixin.scss';

.index{
    .swiper-box{
        position: relative;
        .nav-menu{
            box-sizing: border-box;
            width: 264px;
            height: 451px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 9;
            padding: 26px 0;
            background:rgba(85,88,90,.6);
            .nav-wrap{
                .nav-item{
                    height: 50px;
                    line-height: 50px;
                    padding: 0 30px;
                    font-size: $fontI;
                    &:hover{
                        background-color: $colorA;
                        .children{
                            display: block;
                        }
                    }
                    a{
                        display: block;
                        position: relative;
                        color: $colorG;
                        &:after{
                            content: ' ';
                            position: absolute;
                            top: 17.5px;
                            right: 0;
                            @include bgImg(10px, 15px, '/imgs/icon-arrow.png');
                        }
                    }
                    .children{
                        display: none;
                        position: absolute;
                        top: -1px;
                        left: 100%;
                        width: 962px;
                        height: 451px;
                        background-color: $colorG;
                        border-top: 1px solid $colorH;
                        box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                        ul{
                            height: 16.6%;
                            display: flex;
                            justify-content: space-between;
                            li{
                                display: flex;
                                flex: 1;
                                align-items: center;
                                a{
                                    img{
                                        width: 35px;
                                        height: 42px;
                                        margin-left: 23px;
                                        margin-right: 15px;
                                        vertical-align: middle;
                                    }
                                    span{
                                        font-size: $fontJ;
                                        color: $colorB; 
                                    }
                                }
                                
                            }
                        }
                    }
                }
            }
        }
        .swiper-container{
            height: 451px;
            /deep/ .swiper-pagination-bullet-active{
                background: #FF6600;
            }
            .swiper-button-prev, .swiper-container-rtl .swiper-button-next,
            .swiper-button-next, .swiper-container-rtl .swiper-button-prev{
                background: none;
            }
            .swiper-button-prev, .swiper-container-rtl .swiper-button-next::before,
            .swiper-button-next, .swiper-container-rtl .swiper-button-prev::before{
                content: '';
                display: inline-block;
                width: 30px;
                height: 30px;
                border: 3px solid #FF6600;
                border-right: none;
                border-bottom: none;
            }
            .swiper-button-prev, .swiper-container-rtl .swiper-button-next::before{
                transform: rotate(-45deg);
                left: 284px;
            }
            .swiper-button-next, .swiper-container-rtl .swiper-button-prev::before{
                transform: rotate(135deg);
                right: 20px;
            }

            /deep/ .swiper-pagination-bullets{
                width: 78.5%;
                left: inherit;
                right: 0;
            }
        }
    }
    .ads-box{
        margin-top: 14px;
        .ads-wrap{
            @include flex();
            .ads-item{
                width: 296px;
                height: 167px;
            }
        }
    }
    .banner{
        height: 130px;
        padding: 30px 0 50px 0;
        a{
            display: block;
        }
    }

    .product-box{
        background-color: $colorJ;
        padding: 30px 0;
        .category-title{
            font-size: $fontF;
            height: 21px;
            line-height: 21px;
            color: $colorB;
        }
        .wrapper{
            display: flex;
            padding: 20px 0;
            .banner-left{
                width: 229px;
                height: 619px;
                margin-right: 16px;
            }
            .list-box{
                display: flex;
                flex: 1;
                justify-content: space-between;
                flex-wrap: wrap;
                align-content: space-between;
                .list-item{
                    position: relative;
                    width: 236px;
                    height: 302px;
                    background: #fff;
                    padding-top: 24px;
                    text-align: center;
                    box-sizing: border-box;
                    .tag{
                        position: absolute;
                        top: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 67px;
                        height: 24px;
                        color: #fff;
                        font-size: $fontJ;
                        text-align: center;
                        line-height: 24px;
                        &.prod-new{
                            background-color: #7ECF68;
                        }
                        &.prod-kill{
                            background-color: #E82626;
                        }
                    }
                    .product-img{
                        padding: 0 23px;
                        img{
                            width: 100%;
                            height: 195px;
                        }
                    }
                    .item-info{
                        .prod-title{
                            font-size: $fontJ;
                            line-height: 14px;
                            color: $colorB;
                        }
                        .prod-desc{
                            line-height: 12px;
                            color: $colorD;
                            margin: 6px 0 13px 0;
                        }
                        .prod-price{
                            font-size: $fontJ;
                            line-height: 14px;
                            font-weight: bold;
                            color: #F20A0A;
                            cursor: pointer;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            &::after{
                                content: ' ';
                                @include bgImg(20px, 16px, '/imgs/icon-cart-hover.png');
                                margin-left: 8px;
                            }
                        }
                    }
                }
            }
        }
    }
}

</style>