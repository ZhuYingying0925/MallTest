<template>
    <div class="Order">
    <yd-navbar slot="navbar" title="我的订单" fixed>
        <router-link to="/person" slot="left">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
   <yd-list theme="4">
        <yd-list-item v-for="item in map">
            <span slot="title">订单{{item[0]}}</span>
            <yd-list-other slot="other">
                
                <yd-list theme="4">
                    <yd-list-item v-for="i in item[1]">
                    <yd-list-other slot="other">
                    <div>
                        <span class="list-price">商品id：{{i.comid}}</span>
                    </div>
                    <div>数量:{{i.number}}</div>
                    </yd-list-other>
                    </yd-list-item>
                
                </yd-list>
            <!--<div>总额:{{item.number*item.marketprice}}</div>-->
            </yd-list-other>
        </yd-list-item>
    </yd-list>
    <yd-button @click.native="test">查看所有订单</yd-button>
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
    name: 'Detail',
    data(){
        return{
            username:'',
            list:[],
            order:[],
            comid:new Set(),
            title:new Map(),
            map:[]
        }
    },
    methods:{
        gotoPerson(){
         this.$router.push({path:'/person',query:{name:this.username}})
        },
        gotoMall(){
            this.$router.push({path:'/Mall',query:{name:this.username}})
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
        test(){
            for(var i of this.order){
                this.comid.add(i.comid)
            }
            for(var i of this.comid){
                this.getDetail(i)
            }
            // console.log(this.list)
            var len = this.order.length
            for(var i=0;i<len;i++){
                var a = (this.order)[i].title;
                var b = (this.order)[i];
                (this.title.has(a)) ? (this.title.get(a).push(b)):(this.title.set(a,[b]));
            }
            sessionStorage.orderTittle='';
            for(var item of this.title.entries()){
                console.log(item)
                this.map.push(item)
                sessionStorage.orderTittle += (','+item[0])
            }
            // for(var i in this.list){
            //     console.log(i)
            //     // for(var j of this.map){
            //     //     for(var s of j){
            //     //         if(i.id==s[1].comid){
            //     //             s[1].comtitle=i.title;
            //     //             s[1].commarketprice=i.marketprice;
            //     //             s[1].comimg=i.img;
            //     //         }
            //     //     }
            //     // }
            // }
            console.log(this.map)
        }
    },
    mounted(){
        this.username = window.sessionStorage.getItem('user');
        console.log('username:',this.username);
        var self = this;
        this.$http.post('test/showOrder',{name:this.username}).then(
            function(data){
                self.order = data.body;
                // console.log('order:',self.order);
            }
        )   
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>