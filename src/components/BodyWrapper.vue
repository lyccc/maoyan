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
            <FilmList></FilmList>                        
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <Cinema></Cinema>                        
        </mt-tab-container-item>
        </mt-tab-container>
        <span class="my-info" @click="login">我的</span>
    </div> 
</template>

<script>
import FilmList from './FilmList'
import Cinema from './Cinema'
export default {
    name: 'BodyWrapper',
    data () {
    return {
        selected: '1'
     }
   },
   components: {
       FilmList,
       Cinema
   },
   methods: {
       login () {
           this.$router.push({name: 'Login'})
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
