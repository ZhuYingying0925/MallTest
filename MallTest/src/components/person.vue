<template>
  <div class="person">
    <yd-navbar slot="navbar" title="个人中心" fixed>
        <router-link to="/index" slot="left">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
    <yd-cell-group>
        <yd-cell-item arrow  @click.native="gotoPersonData">
            <yd-icon slot="icon" name="ucenter" size=".42rem"></yd-icon>
            <span slot="left">我的资料</span>
            <span slot="right">查看我的资料</span>
        </yd-cell-item>
        <yd-cell-item arrow @click.native="gotoCollection">
            <yd-icon slot="icon" name="star" size=".42rem"></yd-icon>
            <span slot="left">我的收藏</span>
            <span slot="right">查看我的收藏</span>
        </yd-cell-item>
        <yd-cell-item arrow @click.native="gotoOrder">
            <yd-icon slot="icon" name="shopcart" size=".42rem"></yd-icon>
            <span slot="left">我的订单</span>
            <span slot="right">查看我的订单</span>
        </yd-cell-item>
    </yd-cell-group>
    <div>
      <yd-button size="large" type="hollow" @click.native="show1 = true" >登出</yd-button>
      <yd-actionsheet :items="myItems1" v-model="show1" cancel="取消"></yd-actionsheet>
    </div>
    <yd-tabbar slot="tabbar" fixed>
        <yd-tabbar-item title="商城" link="" size="1.5rem" @click.native="gotoMall">
            <yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="" size="1.5rem" active>
            <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar>
  </div>
</template>
<script>
export default {
  name: 'person',
  data () {
    return {
      show1: false,
      username:'this is person.vue',
      myItems1: [
        {
            label: '退出',
            method: () => {
                this.$dialog.toast({mes: '已退出！'});
                // this.username = '';
                // console.log(this.username)
                window.sessionStorage.removeItem('user')
                window.sessionStorage.removeItem('comid')
                this.gotoLoginAndRegister();
            }
        }
      ]
    }
  },
  methods:{
    gotoPersonData(){
         this.$router.push({path:'/personalData'})
    },
    gotoOrder(){
        this.$router.push({path:'/Order'})
    },
    gotoCollection(){
        this.$router.push({path:'/Collection'})
    },
    gotoMall(){
        this.$router.push({path:'/Mall'})
    },
    gotoLoginAndRegister(){
        this.$router.push({path:'/'})
    }
  },
  mounted(){
      this.username = window.sessionStorage.getItem('user');
      console.log('username:',this.username)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
