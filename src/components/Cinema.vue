<template>
    <div class="movie-list" v-if="cinemaArr">
        <ul>
            <li v-for="(item, index) in cinemaArr" :key='item.id' class='movie-content' @click="goDetails(item.id)">
                <!-- <router-link :to="{name:'CinemaDetails',params:{id:item.id}}"> -->
                   <div class='cinema-name'>{{item.nm}}<span class='sell-price'>{{item.sellPrice}}</span><sub class='sell-wrod'>元起</sub></div>
                   <div class='cinema-address'>{{item.addr}}</div>
                   <div class='tag-list'>
                       <div class='seat'>座</div>
                       <div class='imax'>IMAX厅</div>
                   </div>
                <!-- </router-link> -->
            </li>
        </ul>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
    export default {
        name: 'FilmList',
        data () {
            return {
                cinemaData: '',
                cinemaArr: []
            }
        },
        beforeCreate: function() {
            
        },
        created: function() {
             // console.log(this.$http);
            this.$http({
                baseURL:'/api',
	            url:'cinemas.json',
	            method: 'get',
	        }).then((res) => {     
                if (res.status == 200) {
                    // console.log(res)
                    this.cinemaData = res.data.data;
                    // this.cinemaBaoAn = res.data.data['宝安区'];
                    for (let i in res.data.data) {
                        //  console.log(res.data.data[i])
                         for (let j = 0; j < res.data.data[i].length; j++) {
                             this.cinemaArr.push(res.data.data[i][j])
                         }
                    }
                    //  console.log(this.cinemaArr)             
                }	            
	        }).catch((res) => {
	            console.log('Cinema.vue: ', res);
            });
            
        },
        mounted: function() {
           
        },
        methods: {
            goDetails(id) {
                console.log(id)
                this.$emit('goDetails','CinemaDetails',id)
            }
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
.cinema-name{
    font-size: 0.7rem;
    color: #000;
}
.cinema-address{
    font-size: 0.6rem;
    color: #999;
    margin-top: 0.25rem;
    line-height: 0.8rem;
}
.sell-price{
    margin-left: 0.5rem;
    font-size: 0.7rem;
    color: #e54847;   
}
.sell-wrod{
    font-size: 0.4rem;
    color: #e54847;
}
.seat,.imax{
    margin-top: .2rem;
    display: inline-block;
    padding: .06rem;
    border: 1px solid #589DAF;
    border-radius: 0.2rem;
    margin-right: .03rem;
    font-size: 0.5rem;
    color: #589DAF;
}
</style>
