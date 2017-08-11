<template>
  <div class="personalDataChange">
    <yd-navbar slot="navbar" title="我的资料" fixed>
        <router-link to="/personalData" slot="left">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
    <yd-cell-group>
            <yd-cell-item style="display:none">
                <span slot="left">id:</span>
                <yd-input slot="right">{{id}}</yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">昵称:</span>
                <yd-input slot="right" required :showSuccessIcon="false" :showErrorIcon="false" v-model="nickname">{{nickname}}</yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">姓名:</span>
                <yd-input slot="right" required :showSuccessIcon="false" :showErrorIcon="false" v-model="username">{{username}}</yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">密码:</span>
                <yd-input slot="right" required :showSuccessIcon="false" :showErrorIcon="false" v-model="password">{{password}}</yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">手机:</span>
                <yd-input slot="right" required :showSuccessIcon="false" :showErrorIcon="false" v-model="mobile">{{mobile}}</yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">年龄:</span>
                <yd-input slot="right" required :showSuccessIcon="false" :showErrorIcon="false" v-model="age">{{age}}</yd-input>
            </yd-cell-item>
        </yd-cell-group>
        <yd-button size="large" type="primary" @click.native="openConfrim">确定</yd-button>
        <!--<yd-button  @click.native="updateInfo">哈哈哈</yd-button>-->
    <yd-tabbar slot="tabbar" fixed>
        <yd-tabbar-item title="商城" link="" size="1.5rem" @click.native="gotoMall">
            <yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="#" size="1.5rem" active @click.native="gotoPerson">
            <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar>
  </div>
</template>

<script>
export default {
  name: 'personalDataChange',
  data () {
    return {
      username: 'Welcome to personalDataChange',
      password:'',
      mobile:'',
      age:'',
      nickname:'',
      id:'',
    }
  },
  methods:{
    openConfrim() {
        this.$dialog.confirm({
            title:'',
            mes: '确定修改当前信息？',
            opts: () => {
                this.$dialog.toast({mes: '保存成功', timeout: 1000});
                this.updateInfo()   
            }     
        });    
    },
    updateInfo(){
        window.sessionStorage.setItem('user',this.username)
        this.$http.post('/test/update',{id:this.id,name:this.username,password:this.password,mobile:this.mobile,age:this.age,nickname:this.nickname}).then(
            function(data){
                console.log(data)
            }
        )   
    },
    backtoPersonlData(){
         this.$router.push({path:'/personalData'})
    },
    gotoMall(){
        this.$router.push({path:'/Mall'})
    },
    gotoPerson(){
         this.$router.push({path:'/person'})
        },
  },
   mounted(){
    this.username = window.sessionStorage.getItem('user');
    //   console.log('username:',this.username);
    var self = this;
    this.$http.post('/test/getinfo',{name:this.username}).then(
        function(data){
            // console.log(data.body)
            self.nickname = (data.body)[0].nickname;
            self.mobile = (data.body)[0].mobile;
            self.password = (data.body)[0].password;
            self.age = (data.body)[0].age;
            self.id = (data.body)[0].id;
        }
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>