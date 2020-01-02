<template>
    <div class="service-bar">
        <ul class="container">
            <li class="service-item">
                <i class="icon-setting" />
                <span class="title">预约维修服务</span>
            </li>
            <li class="service-item">
                <i class="icon-7day" />
                <span class="title">7天无理由退货</span>
            </li>
            <li class="service-item">
                <i class="icon-15day" />
                <span class="title">15天免费换货</span>
            </li>
            <li class="service-item">
                <i class="icon-post" />
                <span class="title">满150元包邮</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'service-bar'
    }
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixin.scss';

.service-bar{
    padding: 33px 0;
    background: #fff;
    .container{
        @include flex();
    }
   .service-item{
       height: 34px;
       display: flex;
       flex-direction: row;
       flex: 1;
       justify-content: center;
       align-items: center;
       border-right: 1px solid $colorH;
       .icon-setting{
           @include bgImg(20px, 20px, '/imgs/icon-setting.png')
       }
       .icon-7day{
           @include bgImg(20px, 20px, '/imgs/icon-7day.png')
       }
       .icon-15day{
           @include bgImg(20px, 20px, '/imgs/icon-15day.png')
       }
       .icon-post{
           @include bgImg(20px, 20px, '/imgs/icon-post.png')
       }
       i{
           margin-right: 7px;
       }
       .title{
           font-size: $fontI;
           color: $colorC;
       }
       &:last-child{
           border-right: none;
       }
   }
}
</style>