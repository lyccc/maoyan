<template>
    <div v-if="cinema" class="movie-details-wrapper">
        <mt-header title="影院详情">
            <!-- <router-link to="/" slot="left"> -->
                <mt-button icon="back" slot="left" @click="back"></mt-button>
            <!-- </router-link> -->
        </mt-header>
        <div class="cinema-info">
            <div>
                <p class="cinema-name">{{cinema.cinemaDetailModel.nm}}</p>
                <p class="cinema-address">{{cinema.cinemaDetailModel.addr}}</p>
            </div>            
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
        <div class="time-line" v-if="movieInfo">
            <mt-navbar v-model="selected">  
                <mt-tab-item v-for="(item, index) in movieInfo.Dates" :id="(index+1).toString()" :key="index+1">{{item.text}}</mt-tab-item>
            </mt-navbar>  
            <!-- tab-container -->
            <mt-tab-container v-model="selected">
            <mt-tab-container-item v-for="(DateShow, index) in movieInfo.Dates " :id="(index+1).toString()" :key="index">
                <div class="showtime-list">
                    <ul>
                        <li v-for="(item,index) in movieInfo.DateShow[movieInfo.Dates[index].slug]" :key="index">
                            <div>
                                <strong>{{item.tm}}</strong>
                                <p class="movie-end">{{item.end}}结束</p>
                            </div>
                            <div class="movie-hall">
                                <span>{{item.lang}}{{item.tp}}</span>
                                <p class="screens">{{item.th}}</p>
                            </div>
                            <div class="movie-price">
                                <span ref="aaa">{{getViewingPrice (item.showId, item.showDate, index)}}元</span>
                                <p>折扣卡首单特惠</p>
                            </div>
                            <div class="movie-seat">
                                <a href="####">选座购票</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </mt-tab-container-item>
            <!-- <mt-tab-container-item id="2">
                 <div class="showtime-list">
                    <ul>
                        <li v-for="(item,index) in movieInfo.DateShow[movieInfo.Dates[1].slug]" :key="index">
                            <div>
                                <strong>{{item.tm}}</strong>
                                <p class="movie-end">{{item.end}}结束</p>
                            </div>
                            <div class="movie-hall">
                                <span>{{item.lang}}{{item.tp}}</span>
                                <p>{{item.th}}</p>
                            </div>
                            <div class="movie-price">
                                <span>元</span>
                                <p>折扣卡首单特惠</p>
                            </div>
                            <div class="movie-seat">
                                <a href="####">选座购票</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </mt-tab-container-item> -->
            </mt-tab-container>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Footer from './Footer'
require('swiper/dist/css/swiper.css')    //注意这里
    export default {
        name: 'cinemaDetails',
        data() {
            return {
                cinema:'',
                movieInfo:'',
                swiperIndex: '',
                movieName:'',
                movieScore:'',
                selected: '1',
                price: '',
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
                        this.swiperIndex = swiper.realIndex; 
                        this.movieName = this.cinema.movies[this.swiperIndex].nm;
                        this.movieScore = this.cinema.movies[this.swiperIndex].sc;
                        console.log(this.movieName);

                        this.$http({
                            baseURL:'/api',
                            url:'showtime/wrap.json?cinemaid='+this.$route.params.id+'&movieid='+this.cinema.movies[this.swiperIndex].id,
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
        components: {
            Footer
        }
        ,
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
               setTimeout(() => {
                   this.$http({
                            baseURL:'/api',
                            url:'showtime/wrap.json?cinemaid='+this.$route.params.id+'&movieid='+this.cinema.movies[0].id,
                            method: 'get',
                        }).then((res) => {
                            this.movieInfo = res.data.data;//获取电影信息                   
                            console.log(res);
                        }).catch((res) => {
                            console.log('CinemaDetails.vue: ', res);
                        });       
               },100)                         
               this.swiper.slideTo(0, 0, false);                    
	        }).catch((res) => {
	            console.log('CinemaDetails.vue: ', res);
            });
        },
        mounted: function () {
   
        },
        methods: {
                getViewingPrice (showId, showDate, index) {
                // console.log('http://m.maoyan.com/show/seats?showId='+showId+'&showDate='+showDate)     
                //     this.$http({
                //     baseURL:'/api',
                //     url:'show/seats?showId='+showId+'&showDate='+showDate,
                //     method:'get'
                // }).then((res) => {                                 
                //         console.log(res)
                //         console.log(index)
                //         // this.price =  res.data.showInfo.price
                //         // console.log(me)
                //         if (res.data != '') {
                //             setTimeout(()=>{
                //                 this.$refs.aaa[index].innerHTML = res.data.showInfo.price + '元'
                //             },1000)
                //         }                                   
                       
                // }).catch((res) => {
                //     console.log('CinemaDetails.vue: ', res);
                // });
            },
            back () {
                this.$router.back()
            }
        }
    }
</script>

<style lang="scss" scoped>
.movie-details-wrapper{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #f4f4f4;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
.cinema-info{
    display: flex;
    justify-content: space-between;
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
.showtime-list{
    margin-top: 3px;
    div{
        p{
            margin-top: .25rem;           
        }
    }
    .screens{
        max-width: 3rem;
    }
    li{
       display: flex;
       justify-content: space-between;
       padding: .5rem .25rem;
       border-bottom: 1px solid #ccc;
    }
    .movie-end,.movie-hall{
        font-size: .6rem;
    }
    .movie-hall{
        padding-left: 1rem;
    }
    .movie-price{
        text-align: right;
        span{
            color: red;
        }       
        p{
            font-size: .6rem;
            color: #ccc;
        }
    }
    .movie-seat{       
        a{
            display: block;
            padding: .5rem;
            border: 1px solid red;
            border-radius: 3px;
            font-size: .6rem;
            color: red;
        }
    }   
}

</style>