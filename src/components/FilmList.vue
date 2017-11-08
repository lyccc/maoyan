<template>
    <div class="movie-list">
        <ul>
            <li v-for='(item, index) in moviesArr' :key='item.id' class='movie-content'>
                <router-link :to="{name:'FilmDetails',params:{id:item.id}}">
                    <div class='movie-cover'>
                        <img :src='item.img' alt="图片">
                    </div>
                    <div class='movie-info'>
                        <div>
                            <span class='movie-name'>{{item.nm}}</span>
                            <span :class='["movie-version", "version", { v3d: is3d, imax: item.imax }]' ></span>                           
                        </div>
                        <p class='movie-type'>{{item.cat}}</p>
                        <p class='movie-star'>主演:{{item.star}}</p>
                        <p class='movie-show'>{{item.showInfo}}</p>
                    </div> 
                    <span class='movie-rating'>{{item.sc}}分</span>
                    <a href="####" class='moive-buy'>购票</a>
                </router-link>                                 
            </li>
        </ul>
    </div>
</template>

<script>
// import { Indicator } from 'mint-ui';
    export default {
        name: 'FilmList',
        data () {
            return {
                filmData: '',
                moviesArr: '',
                is3d: true
            }
        },
        beforeCreate: function() {
            // Indicator.open('加载中...');
        },
        created: function() {
            // console.log(this.$http);
            this.$http({
                baseURL:'/api',
	            url:'movie/list.json?type=hot&offset=0&limit=1000',
	            method: 'get',
	        }).then((res) => {
                //console.log(res) 
                if (res.status == 200) {
                    this.filmData = res.data.data;
                    this.moviesArr = res.data.data.movies;
                    // console.log(this.moviesArr);
                    // Indicator.close();
                }	            
	        }).catch((res) => {
	            console.log('FilmList.vue: ', res);
            });
            
        }
    }
</script>

<style scoped>
.movie-list{
    padding: 0 0.5rem;
}
.movie-content{
    position: relative; 
    border-bottom: 1px solid #ccc;
    padding: 1rem 0;
    width: 100%;
}
.movie-cover{
    width: 2.75rem;
    height: 3.75rem;
}
.movie-cover img{
    width: 100%;
    height: 100%;
    objec-fit: cover;
}
.movie-info{
    position: absolute;
    left: 3rem;
    top: 1rem;
    color: #000;
    /* width: 100%;*/
}
.movie-name{
    font-size: 0.7rem;
}
.movie-info p{
    font-size: 0.6rem;
    line-height: 0.9rem;  
}
.movie-info .movie-show{   
    color: #999;
}
.version.imax:after, .version.v2d:before, .version.v3d:before {
    padding: 1rem;
    font-size: 0.6rem;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
}
.version.v2d:before,{
    color: #fff;
    content: '2D';
    background-color: #8BB7CE;
    border: 1px solid #8BB7CE;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
.version.v3d:before {
    color: #fff;
    content: '3D';
    background-color: #8BB7CE;
    border: 1px solid #8BB7CE;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
.version.imax:after {
    color: #8BB7CE;
    content: 'IMAX';
    border: 1px solid #8BB7CE;
    border-left: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
.version.imax:after, .version.v2d:before, .version.v3d:before {
    padding: 0.05rem 0.1rem;
    font-size: 0.5rem;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
}
.movie-rating{
    display: block;
    font-size: 0.6rem;
    color: #FFB400;
    position: absolute;
    right: 0;
    top: 1.2rem;
}
.moive-buy{
    position: absolute;
    right: 0;
    bottom: .5rem;
    padding: .05rem .5rem;
    font-size: 0.7rem;
    line-height: 1rem;
    color: #fff;
    background: #EF4238;
    border-radius: 0.2rem;
    display: inline-block;
}
</style>
