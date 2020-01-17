<template>
    <div class="order-list">
        <order-header title="订单列表">
            <template v-slot:tip>
                <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="order-box">
                    <loading v-if="loading"></loading>
                    <div class="order" v-for="(order, index) in list" :key="index">
                        <div class="order-title">
                            <div class="item-info fl">
                                {{order.createTime}}
                                <span>|</span>
                                {{order.receiverName}}
                                <span>|</span>
                                订单号：{{order.orderNo}} 
                                <span>|</span>
                                {{order.paymentTypeDesc}}
                            </div>
                            <div class="item-money fr">
                                <span>应付金额：</span>
                                <span class="money">{{order.payment}}</span>
                                <span>元</span>
                            </div>
                        </div>
                        <div class="order-content clearfix">
                            <div class="good-box fl">
                                <div class="good-list" v-for="(item, i) in order.orderItemVoList" :key="i">
                                    <div class="good-img">
                                        <img v-lazy="item.productImage" alt="">
                                    </div>
                                    <div class="good-name">
                                        <div class="p-name">{{item.productName}}</div>
                                        <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                                    </div>
                                </div>
                            </div>
                            <div class="good-state fr" v-if="order.statsus == 20">
                                <a href="javascript:;">{{order.statusDesc}}</a>
                            </div>
                            <div class="good-state fr" v-else>
                                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
                            </div>
                        </div>
                    </div>
                    <el-pagination class="pagination"
                    background
                    layout="prev, pager, next"
                    :pageSize="pageSize"
                    :total="total"
                    @current-change="handleChange">
                    </el-pagination>
                    <div class="load-more" v-if="isLoadMore">
                        <el-button type="primary" v-if="false" :loading="loadButton" @click="loadMore">加载更多</el-button>
                    </div>
                    <div class="scroll-more" v-if="false" v-infinite-scroll="loadScroll" infinite-scroll-disabled="busy" infinite-scroll-distance="444">
                        <img v-show="loadButton" src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="">
                    </div>
                    <no-data v-if="!loading && list.length == 0"></no-data>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Pagination, Button } from 'element-ui';
    import infiniteScroll from 'vue-infinite-scroll'
    import OrderHeader from 'components/OrderHeader'
    import Loading from 'components/Loading'
    import NoData from 'components/NoData'
    export default {
        name: 'order-list',
        data() {
            return {
                loading: true, // 进入页面加载数据前动画
                loadButton: false, // 加载更多数据按钮
                list: [], // 商品的列表
                isLoadMore: true, // 是否有下一页 
                busy: false, // vue-infinite-scroll 是否开启滚动加载
                pageSize: 10, // 每一页的数据条数
                pageNum: 1, // 第几页
                total: 0 // 数据总条数
            }
        },
        components: {
            OrderHeader,
            Loading,
            NoData,
            [Pagination.name]:Pagination,
            [Button.name]: Button
        },
        directives: {infiniteScroll},
        mounted() {
            this.getOrderList()
        },
        methods: {
            async getOrderList() {
                this.busy = true
                const res = await this.axios.get('/orders',{
                    params: {
                        pageSize: this.pageSize,
                        pageNum: this.pageNum
                    }
                })
                this.list = res.list // 分页器数据渲染
                // this.list = this.list.concat(res.list) 滚动加载/点击加载渲染
                this.loading = false
                this.loadButton = false
                this.busy = false
                this.isLoadMore = res.hasNextPage
                this.total = res.total
            },
            goPay(orderNo) {
                this.$router.push({
                    path: '/order/pay',
                    query:{
                        orderNo
                    }
                })
            },
            // 分页器方法
            handleChange(pageNum) {
                this.pageNum = pageNum
                this.getOrderList()
            },
            // 点击加载数据方法
            loadMore() {
                this.pageNum++
                this.loadButton = true
                this.getOrderList()
            },
            // 滚动加载数据
            loadScroll() {
                this.busy = true
                setTimeout(() => {
                    this.pageNum++
                    this.getList()
                }, 1000)
            },
            // 滚动加载数据专用
            async getList() {
                this.loadButton = true
                const res = await this.axios.get('/orders',{
                    params: {
                        pageSize: this.pageSize,
                        pageNum: this.pageNum
                    }
                })
                this.list = this.list.concat(res.list)
                this.loadButton = false
                if (res.hasNextPage) {
                    this.busy = false
                } else {
                    this.busy = true
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixin.scss';
.order-list{
    .wrapper{
        background: $colorJ;
        padding-top: 33px;
        padding-bottom: 110px;
        .order-box{
            .order{
                @include border();
                background: $colorG;
                margin-bottom: 31px;
                &:last-child{
                    margin-bottom: 0;
                }
                .order-title{
                    @include height(74px);
                    background: $colorK;
                    padding: 0 43px;
                    font-size: 16px;
                    color: $colorC;
                    .item-info{
                        span{
                            margin: 0 9px;
                        }
                    }
                    .money{
                        font-size: 26px;
                        color: $colorB;
                    }
                }
                .order-content{
                    padding:0 43px;
                    .good-box{
                        width: 88%;
                        .good-list{
                            height: 145px;
                            display: flex;
                            align-items: center;
                            .good-img{
                                width: 112px;
                                img{
                                    width: 100%;
                                }
                            }
                            .good-name{
                                font-size: 20px;
                                color: $colorB;
                            }
                        }
                    }
                    .good-state{
                        @include height(145px);
                        font-size: 20px;
                        color: $colorA;
                        a{
                            color: $colorA;
                        }
                    }
                }
            }
            .pagination{
                text-align: right;
            }
            /deep/ .el-pagination.is-background 
            .el-pager li:not(.disabled).active{
                background: #ff6600;
            }
            /deep/ .el-button--primary{
                background: #ff6600;
                border-color: #ff6600;
            }
            .load-more,
            .scroll-more{
                text-align: center;
            }
        }
    }
}
</style>