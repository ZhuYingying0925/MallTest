<template>
    <div>
        <yd-navbar slot="navbar" title="物品详情页">
            <router-link to="/Mall" slot="left">
                <yd-navbar-back-icon>返回</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-accordion accordion>
            <yd-list-item>
                <img slot="img" :src="list.img">
                <span slot="title">{{list.title}}</span>
                <yd-list-other slot="other">
                    <div>
                        <span class="list-price"><em>¥</em>{{list.marketprice}}</span>
                        <span class="list-del-price">¥{{list.productprice}}</span>
                    </div>
                    <div>{{list.description}}</div>
                </yd-list-other>
            </yd-list-item>
            <yd-accordion-item title="尺码" open>
                <div style="padding: .24rem;">
                    <yd-button size="large" type="hollow" v-for="item in size">{{item}}</yd-button>
                </div>
            </yd-accordion-item>
            <yd-accordion-item title="库存">
                <div style="padding: .24rem;">
                    {{list.number}}
                </div>
            </yd-accordion-item>
            <yd-accordion-item title="购买数量">
                <div style="padding: .24rem;">
                    <div>
                        <yd-spinner max="10" unit="1" v-model="spinner1"></yd-spinner>
                    </div>
                </div>
            </yd-accordion-item>
        </yd-accordion>     
        <yd-button type="warning" @click.native="openAlert(0)">
            <span><yd-icon name="like" slot="icon" size="0.54rem"></yd-icon></span>收藏
        </yd-button>
        <yd-button type="warning" @click.native="openAlert(1)">
            <span><yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon></span>加入购物车
        </yd-button>
        <yd-tabbar slot="tabbar" fixed>
        <yd-tabbar-item title="商城" link="/Mall" size="1.5rem" active>
            <yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="购物车" link="/shopCar">
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
    name: 'Detail',
    data(){
        return{
            id:'',
            username:'',
            list:{},
            size:[],
            spinner1:1,
            numInShopCart:Number(sessionStorage.getItem('shopcarNum')),
            result:'',
        }
    },
    methods:{
        add(){
            this.numInShopCart += this.spinner1;
            sessionStorage.shopcarNum = this.numInShopCart;
            sessionStorage.orderComid+=(','+this.id)
        },
        openAlert(num){
            var self = this;
            if(num==0){
                this.$dialog.alert({mes: '收藏成功！'});
                this.addToCollection()
            }else{
                this.$dialog.alert({mes: '加入购物车成功！'});
                this.add();
            }   
        },
        addToCollection(){
            this.$http.post('test/getCollection',{name:this.username,id:this.id}).then(
                function(data){
                    self.result = data.body
                    // console.log(self.result.length) 
                    if(self.result.length==0){
                            this.$http.post('test/insertCollection',{name:this.username,id:this.id}).then(
                                function(data){
                                    console.log(data)
                                }
                            )
                    }    
                }
            )  
        }
    },
    mounted(){
        this.id = window.sessionStorage.getItem('comid');
        this.username = window.sessionStorage.getItem('user');
        console.log('id:',this.id)
        console.log('username:',this.username)
        var self = this
        this.$http.post('test/getdetail',{id:this.id}).then(
            function(data){
                // console.log(data.body)
                self.list=(data.body)[0]
                console.log(self.list)
                self.size=(self.list.size).split(',');
                // self.maxnumber = Number(self.list.number);
                // console.log('size:'+self.size)
            }
        )    
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>