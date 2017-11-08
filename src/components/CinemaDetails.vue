<template>
    <div v-if="cinema">
        <mt-header title="影院详情">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="cinema-info">
            <div class="cinema-name">{{cinema.cinemaDetailModel.nm}}</div>
            <div class="cinema-address">{{cinema.cinemaDetailModel.addr}}</div>
            <div class="cinema-phone"><i></i></div>
        </div>
        <div class="movie-banner">  
            <swiper :options="swiperOption"  ref="mySwiper">  
                <!-- 这部分放你要渲染的那些内容 -->  
                <swiper-slide v-for="(item,index) in cinema.movies" :key="index" class="banner-box">
                    <img :src="item.img" alt="">  
                </swiper-slide>  
                <!-- 这是轮播的小圆点 -->  
                <div class="swiper-pagination" slot="pagination"></div>  
            </swiper>  
        </div>
        <div class="movie-name">
            <span class="movie-nm">{{movieName}}</span><span class="movie-sc">{{movieScore}}分</span>
        </div>
        <div class="time-line">
            <mt-navbar v-model="selected">
        <mt-tab-item id="1">{{cinema.Dates[0].text}}</mt-tab-item>
        <mt-tab-item id="2">明天</mt-tab-item>
        </mt-navbar>  
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
            111
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            222
        </mt-tab-container-item>
        </mt-tab-container>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')    //注意这里
    export default {
        name: 'cinemaDetails',
        data() {
            return {
                cinema:'',
                movieInfo:'',
                index: '',
                movieName:'',
                movieScore:'',
                selected: '1',
                swiperOption: {  
                //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
                notNextTick: true,  
                pagination: '.swiper-pagination',  
                slidesPerView: 'auto',  
                centeredSlides: true,  
                paginationClickable: true,  
                spaceBetween: 0,  
                    onSlideChangeEnd: swiper => {  
                        //这个位置放swiper的回调方法  
                        this.page = swiper.realIndex+1;  
                        this.index = swiper.realIndex; 
                        this.movieName = this.cinema.movies[this.index].nm;
                        this.movieScore = this.cinema.movies[this.index].sc;
                        console.log(this.movieName);

                        this.$http({
                            baseURL:'/api',
                            url:'showtime/wrap.json?cinemaid='+this.$route.params.id+'&movieid='+this.cinema.movies[this.index].id,
                            method: 'get',
                        }).then((res) => {
                            this.movieInfo = res.data.data;//获取电影信息                   
                            // console.log(res);
                        }).catch((res) => {
                            console.log('CinemaDetails.vue: ', res);
                        });
                    }  
                }
            }
        },
        computed: {
            swiper() {  
              return this.$refs.mySwiper.swiper;  
            } 
        },
        created: function() {
            // console.log(this.$route.params.id);
            this.$http({
                baseURL:'/api',
	            url:'showtime/wrap.json?cinemaid='+this.$route.params.id+'&movieid=',
	            method: 'get',
	        }).then((res) => {                   
               this.cinema = res.data.data;
               this.movieName = this.cinema.movies[0].nm;
               this.movieScore = this.cinema.movies[0].sc;
               console.log(this.cinema);                          
               this.swiper.slideTo(0, 0, false);                
	        }).catch((res) => {
	            console.log('CinemaDetails.vue: ', res);
            });
        },
        mounted: function () {
            
            

              
        }
    }
</script>

<style lang="scss" scoped>
.cinema-info{
    position: relative;
    padding: .5rem;
    .cinema-name{
        font-size: .8rem;      
    }
    .cinema-address{
        font-size: .7rem;
        color: #555;
        margin-top: .2rem;
        line-height: 1rem;
    }
    .cinema-phone{
        display: inline-block;
        position: absolute;
        right: .5rem;
        top: 50%;
        transform: translate(0,-50%);
        border-left:1px solid #ccc; 
        i{
            display: block;
            width: 1.2rem;
            height: 1.2rem;
            background-image: url('./../assets/phone.png');
            background-size: 100%;
            margin: .25rem;
        }
    }
}
.movie-banner{
    background-color: #5b5b5b;
    .banner-box{
        text-align: center;
        margin: .5rem 0;
    }
    img{
        width: 6rem;
        height: 7.5rem;
    }
}
.movie-name{
    padding: .5rem 0;
    font-size: .7rem;
    border-bottom: 2px solid #ccc;
    span{
        margin-left: .5rem;
    }
    .movie-sc{
       color: #F07C0A;
    }
}
.mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #e54847;
    color: #e54847;
    margin-bottom: -3px;
}
.mint-navbar .mint-tab-item {
    padding: 10px 0;
    font-size: 15px;
}
</style>