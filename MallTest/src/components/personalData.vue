<template>
  <div class="personalData">
    <yd-navbar slot="navbar" title="我的资料" fixed>
        <router-link to="/person" slot="left">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
    <yd-cell-group>
        <yd-cell-item>
            <span slot="left">昵称</span>
            <span slot="right">{{nickname}}</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">姓名</span>
            <span slot="right">{{username}}</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">手机</span>
            <span slot="right">{{mobile}}</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">年龄</span>
            <span slot="right">{{age}}</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">用户等级</span>
            <span slot="right">{{level}}</span>
        </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" type="hollow" @click.native="gotoPersonDataChange">编辑</yd-button>
    <yd-tabbar slot="tabbar" fixed>
        <yd-tabbar-item title="商城" link="" size="1.5rem" @click.native="gotoMall">
            <yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="" size="1.5rem" active @click.native="gotoPerson">
            <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar>
  </div>
</template>

<script>
export default {
  name: 'personalData',
  data () {
    return {
      username: 'Welcome to personalData.vue',
      nickname:'哈哈哈',
      mobile:'123456',
      level:'1',
      age:'22'
    }
  },
  methods:{
    gotoPersonDataChange(){
         this.$router.push({path:'/personalDataChange'})
    },
    gotoPerson(){
         this.$router.push({path:'/person'})
    },
    gotoMall(){
        this.$router.push({path:'/Mall'})
    }
  },
 mounted(){
    this.username = window.sessionStorage.getItem('user');
    //   console.log('username:',this.username);
    var self = this;
    this.$http.post('/test/getinfo',{name:this.username}).then(
        function(data){
            console.log(data.body)
            self.nickname = (data.body)[0].nickname;
            self.mobile = (data.body)[0].mobile;
            self.level = (data.body)[0].level;
            self.age = (data.body)[0].age;
        }
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
