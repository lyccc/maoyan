<template>
    <div>
        <footer class="footer">
            <div class="footer-links">友情链接：<a class="theme-color" href="//m.maoyan.com">猫眼电影</a></div>
            <div class="footer-line footer-copyright">
                <div class="hr"></div>
                <span class="footer-copyright-text">©2017 美团网 <a href="http://www.miibeian.gov.cn/" target="_blank">京ICP证070791号</a></span>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name:'footer',
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
.footer{
    padding: 1rem .5rem 1rem;
    height: 2rem;
    background-color: #f0efed;
    .footer-links {
        font-size: .6rem;
        margin: .3rem .2rem;
        text-align: center;
        a{
            color: red;
        }
    }
    .footer-copyright {
        position: relative;
        font-size: .6rem;
        text-align: center;
        color: #999;
        a{
            color: #999;
        }

    }

}
</style>