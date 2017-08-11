<template>
<div>
    <yd-navbar title="我的主页" fixed></yd-navbar>
    <yd-slider autoplay="3000">
        <yd-slider-item>           
            <img src="../assets/slider/1.jpg">            
        </yd-slider-item>
        <yd-slider-item>          
            <img src="../assets/slider/2.jpg">          
        </yd-slider-item>
        <yd-slider-item> 
            <img src="../assets/slider/3.jpg">    
        </yd-slider-item>
    </yd-slider>
    <yd-grids-group :rows="2">
        <yd-grids-item @click.native="gotoMall">
            <yd-icon slot="icon" name="shopcart" size="1.5rem" color="#FF685D"></yd-icon>
            <span slot="text">商城</span>
        </yd-grids-item> 
        <yd-grids-item   @click.native="gotoPerson">
            <yd-icon slot="icon" name="ucenter" size="1.5rem" color="#FF685D"></yd-icon>
            <span slot="text">个人中心</span>
        </yd-grids-item>
        <yd-grids-item>
            <yd-icon slot="icon" name="warn-outline" size="1.5rem" color="#FFCCFF"></yd-icon>
            <span slot="text">敬请期待</span>
        </yd-grids-item>
        <yd-grids-item>
            <yd-icon slot="icon" name="warn-outline" size="1.5rem" color="#FFCCFF"></yd-icon>
            <span slot="text">敬请期待</span>
        </yd-grids-item>
    </yd-grids-group>
</div>
</template>
<script>
export default {
    name: 'index',
    data () {
        return {
        username: 'Welcome to index.vue',
        name:'',
        pass:''
        }
    },
    methods:{
        gotoPerson(){
            this.$router.push({path:'/person'})
        },
        gotoMall(){
            this.$router.push({path:'/Mall'})
        }
    }
}
</script>
<style scoped>

</style>
