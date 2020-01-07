<template>
    <div class="login">
        <div class="login-header">
            <div class="container header-wrapper">
                <a href="/#/login">
                    <div class="logo">
                        <h2 class="title">小米商城</h2>
                        <p class="slogan">让每个人都能享受科技的乐趣</p>
                    </div>
                </a>
            </div>
        </div>
        <div class="login-main">
            <div class="container">
                <div class="login-form">
                    <div class="form-header">
                        <h3 class="title checked">账号登录</h3>
                        <span class="sep-line"></span>
                        <h3 class="title">扫码登录</h3>
                    </div>
                    <div class="form-main">
                        <label for="username">
                            <input type="text" id="username" v-model="username" placeholder="请输入帐号">
                        </label>
                        <label for="password">
                            <input type="password" id="password" @keyup.enter="login" v-model="password" placeholder="请输入密码">
                        </label>
                    </div>
                    <div class="form-footer">
                        <div class="btn-box">
                            <button class="btn" @click="login">登录</button>
                        </div>
                        <div class="tips">
                            <div class="sms" @click="register">手机短信登录/注册</div>
                            <div class="reg">立即注册<span>|</span>忘记密码？</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="login-footer">
            <div class="footer-link container">
                <p class="link-wrap">
                    <a href="javascrip:;">简体</a><span>|</span>
                    <a href="javascrip:;">繁体</a><span>|</span>
                    <a href="javascrip:;">English</a><span>|</span>
                    <a href="javascrip:;">常见问题</a><span>|</span>
                    <a href="javascrip:;">隐私政策</a>
                </p>
                <p class="copyright">Copyright ©2019 mi.futurefe.com All Rights Reserved.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: '',
                userId: ''
            }
        },
        methods: {
            ...mapActions(['saveUserName']),
            async login() {
                let {username, password} = this

                const res = await this.axios.post('/user/login', {
                    username,
                    password
                })
        
                this.$cookie.set('userId', res.id, {expires:'Session'})
                this.saveUserName(res.username)
                this.$router.push({
                    name: 'index',
                    params: {
                        from: 'login'
                    }
                })
            },
            async register() {
                // await this.axios.post('/user/register', {
                //     username: 'jery',
                //     password: 'jery',
                //     email: 'jery@163.com'
                // })
                // this.$message.success('注册成功！')
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/base.scss';
@import '~assets/scss/button.scss';

.login{
    .login-header{
        padding: 19px 0 32px 0;
        .logo{
            padding-left: 71px; 
            height: 52px;
            background: url('/imgs/logo-mi.png') no-repeat left center;
            background-size: contain;
            .title{
                color: $colorB;
                font-size: 33px;
                line-height: 33px;
                margin-bottom: 8px;
            }
            .slogan{
                color: $colorB;
                font-size: 10px;
                line-height: 10px;
            }
        }
    }
    .login-main{
        background:url('/imgs/login-bg.jpg') no-repeat center;
        height: 576px;
        .login-form{
            box-sizing: border-box;
            width: 410px;
            height: 510px;
            padding: 40px 32px;
            position: absolute;
            top: 33px;
            right: 0;
            background: #fff;
            .form-header{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 28px;
                .title{
                    font-size: 24px;
                    color: $colorC;
                    font-weight: 100;
                    &.checked{
                        color: $colorA;
                    }
                }
                .sep-line{
                    height: 25px;
                    margin: 0 35px;
                    border-left: 2px solid $colorF;
                }
            }
            .form-main{
                label{
                    display: block;
                    width: 100%;
                    height: 50px;;
                    border: 1px solid $colorH;
                    margin-top: 20px;
                    input{
                        border: none;
                        box-sizing: border-box;
                        width: 100%;
                        height: 100%;
                        padding: 18px;
                    }
                }
            }
            .form-footer{
                .btn-box{
                    margin: 30px 0 14px 0;
                    .btn{
                        width: 100%;
                        height: 50px;
                        line-height: 50px;
                        font-size: $fontI;
                    }
                }
                .tips{
                    display:flex;
                    justify-content:space-between;
                    font-size: $fontJ;
                    cursor:pointer;
                    .sms{
                        color: $colorA;
                    }
                    .reg{
                        color:$colorD;
                        span{
                            margin:0 7px;
                        }
                    }
                }
            }
        }
    }
    .login-footer{
        padding: 100px 0 40px 0;
        .footer-link{
            text-align: center;
            color: $colorB;
            font-size: $fontJ;
            line-height: 14px;
            a{
                color: $colorB;
                font-size: $fontJ;
            }
            span{
                margin: 0 10px;
                color: $colorD;
            }
            
        }
        .copyright{
            margin-top: 20px;
        }
    }
}
</style>