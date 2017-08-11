<template>
  <div class="Collection">
    <yd-navbar slot="navbar" title="我的收藏" fixed>
        <router-link to="/person" slot="left">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
    <yd-list theme="1">
        <yd-list-item v-for="item in list">
            <img slot="img" :src="item.img">
            <span slot="title">{{item.title}}</span>
            <yd-list-other slot="other">
                <div>
                    <span class="list-price"><em>¥</em>{{item.marketprice}}</span>
                    <span class="list-del-price">¥{{item.productprice}}</span>
                </div>
                <div>{{item.description}}</div>
            </yd-list-other>
        </yd-list-item>
    </yd-list>
    <yd-tabbar slot="tabbar" fixed>
        <yd-tabbar-item title="商城" link="" size="1.5rem" @click.native="gotoMall">
            <yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="" size="1.5rem" active @click.native=" gotoPerson">
            <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Collection',
  data() {
    return {
        list: [],
        username:'',
    }
},
    methods:{
        gotoPerson(){
            this.$router.push({path:'/person',query:{name:this.username}})
        },
        gotoMall(){
            this.$router.push({path:'/Mall',query:{name:this.username}})
        }
    },
  mounted(){ 
    this.username = window.sessionStorage.getItem('user');
    console.log(this.username)
    var self = this
    this.$http.post('/test/showCollection',{name:this.username}).then(
        function(data){
            // console.log(data.body)
            self.list = data.body
        }
    )  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>