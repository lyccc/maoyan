<template>
    <div>
        <mt-header title="猫眼电影">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="login-box">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">美团账号登录</mt-tab-item>
                <mt-tab-item id="2">手机验证登录</mt-tab-item>
            </mt-navbar>  
            <!-- tab-container -->
            <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div style="margin-top:3px;">
                    <mt-field  placeholder="账户名/手机号/Email"></mt-field>
                    <mt-field  placeholder="请输入您的密码" type="password"></mt-field>
                </div>
                
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div style="margin-top:3px;">
                    <mt-field  placeholder="手机号"></mt-field>
                    <mt-field  placeholder="请输入短信验证码" type="password"></mt-field>                   
                </div>
            </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <div class="login-btn-box">
            <mt-button type="danger" size="large">登录</mt-button>
            <div class="login-operation"><a href="####">立即注册</a><a href="####">找回密码</a></div>
            <div class="copyright"><span class="copyright">© 猫眼电影 客服电话：<a href="tel:4006705335">400-670-5335</a></span></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
            return {
               selected: '1' 
            }
        }
    }
</script>

<style lang="scss" scoped>
.mint-navbar .mint-tab-item {
    padding: 10px 0;
    font-size: 15px;
}
.login-btn-box{
    padding: .5rem .25rem;
    .login-operation{
        padding: .25rem;
        display: flex;
        justify-content: space-between;
        a{
            font-size: 14px;
            color: red;
        }
    }
    .copyright{
        text-align: center;
        font-size: 14px;
        a{
            color: red;
        }
    }
}

</style>