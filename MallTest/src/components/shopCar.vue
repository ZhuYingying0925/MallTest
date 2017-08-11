<template>
    <div>
        <yd-navbar slot="navbar" title="购物车" fixed>
            <router-link to="/Mall" slot="left">
                <yd-navbar-back-icon>返回</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-list theme="5">
            <yd-list-item v-for="item in comArr">
                <!--<img slot="img" :src="item.img">
                <span slot="title">{{item.title}}</span>-->
                <yd-list-other slot="other">
                    <div>商品id:{{item[0]}}</div>
                    <div>数量：{{item[1]}}</div>
                </yd-list-other>
            </yd-list-item>
        </yd-list>
        <yd-button type="warning" size="large" @click.native="test">
            结算
        </yd-button>
        <div style="height:100px;"></div>
        <yd-tabbar slot="tabbar" fixed>
        <yd-tabbar-item title="商城" link="/Mall" size="1.5rem">
            <yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="购物车" link="/shopCar" active>
                <yd-icon name="shopcart-outline" slot="icon"></yd-icon>
                <yd-badge slot="badge" type="danger">{{numInShopCart}}</yd-badge>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="/person" size="1.5rem">
            <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar> 
    </div>
</template>
<script>
export default {
    name: 'shopCar',
    data(){
        return{
            username:'this is shopCar',
             numInShopCart:sessionStorage.getItem('shopcarNum'),
             orderComid:sessionStorage.getItem('orderComid'),
             com:new Map(),
             list:[],
             title:sessionStorage.getItem('orderTittle'),
             comArr:[],
             orderTitle:[]
        } 
    },
    methods:{
        test(){  
            console.log(this.numInShopCart)
            if(!(this.numInShopCart&&orderTittle&&orderTittle)){
                return;
            }
            // 根据商品id得到商品详情
            for(var i of this.com.keys()){
                this.getDetail(i)
            }
            // console.log(this.list)

            //向数据库插入订单 
            // for(var i of this.com.keys()){
            //     this.insertOrder(this.title,i,this.com.get(i))
            // }
            sessionStorage.setItem('shopcarNum',0)
            sessionStorage.setItem('orderTittle',null)
            sessionStorage.setItem('orderComid',null)
            this.com = new Map();
            this.comArr = []
            
        },
        getDetail(id){
            var self = this;
            this.$http.post('test/getDetail',{id:id}).then(
                function(data){
                    // console.log((data.body)[0])
                    self.list.push(data.body);
                }
            )
        },
        insertOrder(titleid,comid,comnumber){
            var self = this;
            this.$http.post('test/insertOrder',{name:this.username,comid:comid,title:titleid,number:comnumber}).then(
                function(data){
                    console.log(data.body)
                }
            )
            
        },
        getOrder(){
            var self = this;
            var databody;
            this.$http.post('test/showOrder',{name:this.username}).then(
                function(data){
                    // console.log(data.body)
                    databody = data.body
                }
            )
            console.log(databody)
            for(var i of databody){
                this.orderTitle.push(i.title)
            }
            console.log(this.orderTitle)
        }
    },
    mounted(){
        this.username = window.sessionStorage.getItem('user');
        this.getOrder()
        console.log('username:',this.username);
         // 获取商品id并统计该商品的数量，放在com中
            var a = [...(this.orderComid.split(','))];
            a.sort();
            // console.log(a)
            var flag=1;
            for(var i of a){
                this.com.has(i)?this.com.set(i,++flag):this.com.set(i,flag=1);
            }
            // console.log(this.com)
            for(var i of this.com.entries()){
                this.comArr.push(i)
            }
            // console.log(this.comArr)

             // 设置订单id
            // console.log(this.title)
            var title2 = [...(this.title.split(','))];
            // console.log(title2)
            flag = 0;
            for(var i in title2){
                flag++
            }
            this.title=flag;
    }
}
</script>