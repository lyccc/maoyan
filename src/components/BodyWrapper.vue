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
   }
}
</script>

<style scoped>

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
