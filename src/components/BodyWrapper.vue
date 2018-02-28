<template>
    <div>
        <mt-header title="猫眼电影"></mt-header>
        <mt-navbar v-model="selected">
        <mt-tab-item id="1">影片</mt-tab-item>
        <mt-tab-item id="2">影院</mt-tab-item>
        </mt-navbar>  
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
            <FilmList @goDetails="fimlDetails"></FilmList>                        
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <Cinema @goDetails="fimlDetails"></Cinema>                        
        </mt-tab-container-item>
        </mt-tab-container>
        <span class="my-info" @click="login">我的</span>
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>         
        </transition>
    </div> 
</template>

<script>
import FilmList from './FilmList'
import Cinema from './Cinema'
export default {
    name: 'BodyWrapper',
    data () {
    return {
        selected: '1',
        transitionName: 'slide-left'
     }
   },
   components: {
       FilmList,
       Cinema
   },
   watch: {
    '$route' (to, from) {
        console.log(to)
        console.log(from)
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = from.path.split('/')[1].length > 1 ? 'slide-right' : 'slide-left'
        console.log(this.transitionName)
        // if(to.path == '/'){ 
        //     this.transitionName = 'slide-right'; 
        // }else{ 
        //     this.transitionName = 'slide-left'; 
        // } 
    }
   },
   methods: {
       login () {
           this.$router.push({name: 'Login'})
       },
       fimlDetails (pathName,fimlId) {
           this.$router.push({name: pathName,params:{id:fimlId}})
       }

   }
}
</script>

<style scoped>
.my-info{
   display: block;
   width: 2rem;
   height: 2rem;
   line-height: 2rem;
   border-radius: 50%;
   border:1px solid #ccc;
   position: fixed;
   bottom: 2rem;
   right: .5rem;
   color: red;
   font-size: 14px;
   text-align: center;
   background-color: #fff; 
}

</style>
