<template>
    <div class="movie-details-wrapper" v-if="filmData">
        <mt-header title="影片详情">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="movie-fliter">
            <div class="moive-img">
                <img :src="filmData.MovieDetailModel.img" alt="电影图片">
            </div>
            <div class="moive-details">
                <span class="movie-name">{{filmData.MovieDetailModel.nm}}</span>
                <div class="movie-score">
                    <img class="star" :src="urlImg" alt="" v-for='(item, index) in filmScore' :key='index'>
                    <span class="movie-rating">{{filmData.MovieDetailModel.sc}}</span>
                </div>
                <p class="movie-grade">({{filmData.MovieDetailModel.snum}})人评分</p>
                <p class="movie-type">{{filmData.MovieDetailModel.ver}}</p>
                <p class="movie-place">{{filmData.MovieDetailModel.src}}/{{filmData.MovieDetailModel.dur}}分钟<span></span></p>
                <p class="movie-release-time">{{filmData.MovieDetailModel.rt}}</p>
            </div>           
        </div>
        <div class="moive-pay">
            <mt-button type="danger" size="large" @click="login">立即购票</mt-button>
            <div class="movie-description" v-html="filmData.MovieDetailModel.dra"></div>
        </div>
        <div class="movie-comment">
            <h3>短评</h3>
            <ul>
                <li v-for='(item, index) in hcmts' :key='index'>
                    <div class="movie-star">
                        <img class="star" :src="urlImg" alt="" v-for='(num, index) in parseInt(item.score)' :key='index'>
                        <span class="comment-time">{{getDateDiff(item.time)}}</span>
                    </div>                     
                    <p class="movie-comment-content">{{item.content}}</p>
                    <div class="avatar"><img :src="item.avatarurl" alt=""><span class="nickname">{{item.nickName}}</span><span class="tag">购</span></div>
                </li>
            </ul>
            <div class="all-comment">查看全部{{filmData.CommentResponseModel.total}}条评论</div>
        </div>
        <div class="movie-details-footer">
            <mt-button type="danger" size="large">下载猫眼电影，查看更多电影信息</mt-button>
            <div class="about-list"><a href="####">电影</a><a href="####">影院</a><a href="####">我的</a><a href="####">客户端下载</a></div>
            <div class="btn-list">
                <mt-button type="default" size="small" class="mt-button-green">登录</mt-button>
                <mt-button type="default" size="small">注册</mt-button>
                <mt-button type="default" size="small">城市:深圳</mt-button>
            </div>
            <div class="friend-links">
                <span>友情链接:</span><a href="####">猫眼专业版</a><a href="####">美团网</a>
            </div>
            <div class="copy-right"><span>© 猫眼电影 客服电话: </span><a href="tel:10105335">10105335</a></div>
            <div class="footer-misc">
                <p><span>京ICP备16022489号-1</span><span>京公网安备11010502030881号</span></p>
            </div>
        </div>
    </div>
</template>

<script>
// import { Indicator } from 'mint-ui';
import { Button } from 'mint-ui';
import star from './../assets/star-full-new.png'
    export default {
        name:'FilmDetails',
        data () {
            return {
                filmData: '',
                filmScore: 5,
                urlImg: star,
                hcmts: ''
            }
        },
        beforeCreate: function() {
            
        },
        mounted: function() {
            console.log(this.$route.params.id)
            this.$http({
                // baseURL:'/api',
	            url:'http://m.maoyan.com/movie/'+this.$route.params.id+'.json',
	            method: 'get',
	        }).then((res) => {  
                 this.filmData = res.data.data;
                 this.hcmts = this.filmData.CommentResponseModel.hcmts;
                 console.log(this.filmData);                                    	            
	        }).catch((res) => {
	            console.log('FilmDetails.vue: ', res);
            });
        },
        methods: {
            getDateTimeStamp (dateStr) {
                    return Date.parse(dateStr.replace(/-/gi,"/"));
            },
            getDateDiff (dateStr) {
                var publishTime = this.getDateTimeStamp(dateStr)/1000,
                    d_seconds,
                    d_minutes,
                    d_hours,
                    d_days,
                    timeNow = parseInt(new Date().getTime()/1000),
                    d,

                    date = new Date(publishTime*1000),
                    Y = date.getFullYear(),
                    M = date.getMonth() + 1,
                    D = date.getDate(),
                    H = date.getHours(),
                    m = date.getMinutes(),
                    s = date.getSeconds();
                    //小于10的在前面补0
                    if (M < 10) {
                        M = '0' + M;
                    }
                    if (D < 10) {
                        D = '0' + D;
                    }
                    if (H < 10) {
                        H = '0' + H;
                    }
                    if (m < 10) {
                        m = '0' + m;
                    }
                    if (s < 10) {
                        s = '0' + s;
                    }

                d = timeNow - publishTime;
                d_days = parseInt(d/86400);
                d_hours = parseInt(d/3600);
                d_minutes = parseInt(d/60);
                d_seconds = parseInt(d);

                if(d_days > 0 && d_days < 3){
                    return d_days + '天前';
                }else if(d_days <= 0 && d_hours > 0){
                    return d_hours + '小时前';
                }else if(d_hours <= 0 && d_minutes > 0){
                    return d_minutes + '分钟前';
                }else if (d_seconds < 60) {
                    if (d_seconds <= 0) {
                        return '刚刚发表';
                    }else {
                        return d_seconds + '秒前';
                    }
                }else if (d_days >= 3 && d_days < 30){
                    return M + '-' + D + ' ' + H + ':' + m;
                }else if (d_days >= 30) {
                    return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
                }
            },
            login () {
                this.$router.push({name:'Login',params: {}})
            }
        }

    }
</script>

<style lang="scss" scoped>
.movie-details-wrapper{
    background-color: #f4f4f4;
}
.movie-fliter{
    padding: .5rem;
    background-color: rgba(64,69,77,.5);
    position: relative;   
}
.moive-img{
    width: 5.5rem;
    height: 7.5rem;
    img{
        width: 100%;
        height: 100%;
    }   
}
.star{
    width: .5rem;
    height: .5rem;
    margin: 0 .1rem;
}
.moive-details{
    position: absolute;
    left: 6.5rem;
    top: .5rem;
}
.movie-name{
    font-size: .7rem;
    color: white;
}
.movie-score{
    padding: .2rem 0;
    img{
        width: 1rem;
        height: 1rem;
    }
}
.movie-rating{
    color: #ffc600;
}
.movie-grade,.movie-type,.movie-place,.movie-release-time{
    font-size: .7rem;
    color: #ccc;
    line-height: 1rem;
}
.moive-pay{
    margin-top: .5rem;
    padding: .5rem;
    background-color: #fff;
}
.movie-description{
    margin-top: .5rem;
    font-size: .7rem;
    color: #555;
    line-height: 1rem;
}
.movie-comment{
   background-color: #fff;
   padding: 0 .5rem; 
   margin-top: .5rem;
   li{
       border-bottom: 1px solid #ccc;
   } 
   h3{
       padding: .5rem;
       font-size: .7rem;
       border-bottom: 1px solid #ccc;
       background-color: #fff;
   }
   .movie-star{
       padding: .25rem 0;
       .comment-time{
           font-size: .5rem;
           color: #555;
       }
   }
   .movie-comment-content{
       font-size: .8rem;
       line-height: 1rem;
   }
   .avatar{
       padding: .5rem 0; 
       display: flex;
       align-items: center;
       img{
           width: 1rem;
           height: 1rem;
           border-radius: 50%;
       }
       .nickname{
           margin-left: 1rem;
           font-size: .7rem;
           color: #999;
       }
       .tag{
            color: white;
            font-size: .8rem;
            margin-left: .5rem;
            border-radius: 2px;
            line-height: 1rem;
            background: #ff9900;
            padding: 1px 2px;
            vertical-align: middle;
       }
   }    
   .all-comment{
       padding: .5rem 0;
       text-align: center;
       font-size: .7rem;
       color: red;
   } 

}
.movie-details-footer{
    padding: .25rem;
    .about-list{
        padding: .5rem 0;
        display: flex;
        a{
            flex: auto;
            font-size: .7rem;
            text-align: center;
            color: #555;
            border-right: 1px solid #555;
        }
        a:last-child{
            border-right: none;
        }
    }
    .btn-list{
       margin: .5rem 0 ;
        text-align: center;
        .mint-button{
            margin: 0 .5rem;
        }
        .mt-button-green{
            background-color: #75c60d;
            color: #fff;
        }
    }
    .friend-links,.copy-right,.footer-misc{
        font-size: .6rem;
        text-align: center;
    }
    .friend-links{
        margin: 30px 0 14px;
        a{
            color: red;
            margin: 0 .5rem;
        }
    }
    .footer-misc{
        margin: 1rem 0 0 0;
    }
}
</style>