<template>
    <div class="no-data">
        <img src="/imgs/icon-no-data.png" alt="">
        <p>暂无提交商品的订单记录</p>
    </div>
</template>

<script>
    export default {
        name: 'no-data'
    }
</script>

<style lang="scss" scoped>
.no-data{
    text-align: center;
    font-size: 20px;
    color: #999;
    margin: 50px 0;
    img{
        width: 260px;
        height: 180px;
    }
}
</style>