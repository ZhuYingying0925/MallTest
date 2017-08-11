<template>
    <div>
        <yd-tab>
            <yd-tab-panel label="登录">
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">用户名：</span>
                        <yd-input slot="right" required v-model="input1" max="20" placeholder="请输入用户名"></yd-input>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">密码：</span>
                        <yd-input slot="right" type="password" v-model="input2" placeholder="请输入密码"></yd-input>
                    </yd-cell-item>
                </yd-cell-group>
                <yd-button size="large" type="primary" @click.native="loginRe">登录</yd-button>
            </yd-tab-panel>
            <yd-tab-panel label="注册">
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">用户名：</span>
                        <yd-input slot="right" required v-model="input1" max="20" placeholder="请输入用户名"></yd-input>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">昵称：</span>
                        <yd-input slot="right" required v-model="input5" max="20" placeholder="请输入昵称"></yd-input>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">年龄：</span>
                        <yd-input slot="right" required v-model="input6" max="2" placeholder="请输入年龄"></yd-input>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">密码：</span>
                        <yd-input slot="right" type="password" v-model="input2" placeholder="请输入密码"></yd-input>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">邮箱：</span>
                        <yd-input slot="right" v-model="input3" :debug="true" regex="email" placeholder="请输入邮箱地址"></yd-input>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">手机号：</span>
                        <yd-input slot="right" v-model="input4" regex="mobile" placeholder="请输入手机号码"></yd-input>
                    </yd-cell-item>
                </yd-cell-group>
                 <yd-button size="large" type="primary"  @click.native="register">注册</yd-button>
            </yd-tab-panel>
        </yd-tab>
    </div>
</template>
<script>
export default {
  name: 'LoginAndRegister',
  data () {
    return {
        input1: '',
        input2: '',
        input3: 'ydui@qq.com',
        input4: '',
        input5:'',
        input6:'',
        message:''
    }
  },
  methods:{
    loginRe(){
        var self = this
        // console.log(this.input1)
        if(!this.input1){
            this.message='用户名不能为空'
            this.toastError();
            return
        }
        if(!this.input2){
            this.message='密码不能为空'
            this.toastError();
            return
        }
        this.$http.get('/test/getinfo?name='+this.input1).then(
            function(data){
                // console.log(data.body)
                if(data.body.length==0){
                    // console.log('用户名不存在')
                    self.message='用户名不存在'
                    self.toastError();
                    return
                }else if((data.body)[0].password!=this.input2){
                    // console.log('密码不正确')
                    self.message='密码不正确'
                    self.toastError();
                    return 
                }
                window.sessionStorage.setItem('user',self.input1)
                self.message="登录成功"
                self.toastSuccess()
                self.$router.push({path:'/index'})  
            }
        )
    },
    register(){
        var self = this;
        if(!this.input1){
            this.message='用户名不能为空'
            this.toastError();
        }else if(!this.input5){
            this.message='昵称不能为空'
            this.toastError();
        }else if(!this.input6){
            this.message='年龄不能为空'
            this.toastError();
        }else if(!this.input2){
            this.message='密码不能为空'
            this.toastError();
        }else if(!this.input4){
            this.message='手机号码不能为空'
            this.toastError();
        }else{
            this.$http.post('/test/getinfo',{name:this.input1}).then(
                function(data){
                    if(data.body.length!=0){
                        self.message='用户名已存在'
                        self.toastError();
                        return
                    }else{
                        this.$http.post('/test/insert',{name:this.input1,password:this.input2,email:this.input3,mobile:this.input4,nickname:this.input5,age:this.input6}).then(
                            function(data){
                                // console.log(data)
                                self.message="注册成功"
                                self.toastSuccess()
                            }
                        )
                    }
                }
            )    
        }
    },
    toastError(){
        var self = this;
        this.$dialog.toast({
                mes: self.message,
                timeout: 1500,
                icon: 'error',
                callback: () => {
                    this.$dialog.alert({mes: '给你一次重来的机会！'});
                }
            });
    },
    toastSuccess() {
        var self = this;
        this.$dialog.toast({
            mes: self.message,
            timeout: 1500,
            icon: 'success'
        });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
