<template>
    <transition name="slide">
        <div class="modal" v-show="showModal">
            <div class="mask"></div>
            <div class="modal-dialog">
                <div class="modal-header">
                    <div class="modal-title">{{title}}</div>
                    <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <a v-if="btnType == 1" @click="$emit('submit')" href="javascript:;" class="btn">{{sureText}}</a>
                    <a v-if="btnType == 2" @click="$emit('cancel')" href="javascript:;" class="btn">{{cancelText}}</a>
                    <div v-if="btnType == 3" class="btn-group">
                        <a @click="$emit('submit')" href="javascript:;" class="btn">{{sureText}}</a>
                        <a @click="$emit('cancel')" href="javascript:;" class="btn">{{cancelText}}</a>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'modal',
        props: {
            // 模态框类型 小small 中middle 大large 表单form
            modalType: {
                type: String,
                default: 'form'
            },
            title: String,
            // 按钮类型 1:确定 2:取消 3:取消确定
            btnType: {
                type: String,
                default: '3'
            },
            sureText: {
                type: String,
                default: '确定'
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            showModal: Boolean
        }
    }
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/button.scss';
@import '~assets/scss/mixin.scss';

.modal{
    @include position(fixed);
    z-index: 10;
    transition: all .5s;
    &.slide-enter-active,
    &.slide-leave-active{
        top: 0;
    }
    &.slide-enter, 
    &.slide-leave-to{
        top: -100%;
    }
    .mask{
        @include position(fixed);
        background: $colorI;
        opacity: 0.5;
    }
    .modal-dialog{
        @include position(absolute, 50%, 50%, 660px, auto);
        background: $colorG;
        transform: translate(-50%, -50%);
        .modal-header{
            height: 60px;
            line-height: 60px;
            background: $colorJ;
            padding: 0 25px;
            font-size: $fontI;
            .icon-close{
                @include positionImg(absolute, 23px, 25px, 14px, 14px, '/imgs/icon-close.png');
                transition: transform .3s;
                &:hover{
                    transform: scale(1.5);
                }
            }
        }
        .modal-body{
            padding: 42px 40px 54px;
            font-size: $fontJ;
        }
        .modal-footer{
            padding: 20px 0;
            background: $colorJ;
            text-align: center;
        }
    }
}
</style>