<template>
  <div class="Mall">
    <yd-navbar slot="navbar" title="商城" fixed>
        <router-link to="/index" slot="left">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
    <div>
        <yd-infinitescroll :on-infinite="loadList" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">
                <yd-list-item v-for="item in list" @click.native="gotoDetail(item.id)">
                    <img slot="img" :src="item.img">
                    <span slot="title">{{item.title}}</span>
                    <yd-list-other slot="other">
                        <div>
                            <span class="list-price"><em>¥</em>{{item.marketprice}}</span>
                            <span class="list-del-price">¥{{item.productprice}}</span>
                        </div>
                        <div>{{item.dedcription}}</div>
                    </yd-list-other>
                </yd-list-item>
            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll> 
    </div>
    <div style="height:100px"></div>
    <yd-tabbar slot="tabbar" fixed>
        <yd-tabbar-item title="商城" link="" size="1.5rem" active>
            <yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="购物车" link="/shopCar">
                <yd-icon name="shopcart-outline" slot="icon"></yd-icon>
                 <yd-badge slot="badge" type="danger">{{numInShopCart}}</yd-badge>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="" size="1.5rem" @click.native="gotoPerson">
            <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar> 
  </div>
</template>
<script>
export default {
  name: 'Mall',
  data() {
        return {
            username:'',
            page: 1,
            list: [],
            numInShopCart:sessionStorage.getItem('shopcarNum')
        }
    },
    methods: {
        loadList() {
            this.$http.get('/test/show').then(
                function (response) {
                    // console.log(response.body)
                    const _list = response.body;
                    this.list = [...this.list, ..._list];
                    if (this.page == 5) {
                        /* 所有数据加载完毕 */
                        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                        return;
                    }
                    /* 单次请求数据完毕 */
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
                    this.page++;
                }
            );
        },
        gotoDetail(id){
            window.sessionStorage.setItem('comid',id)
            this.$router.push({path:'/Detail'})
        },
        gotoPerson(){
            this.$router.push({path:'/person'})
        }
    },
    mounted(){
        this.username = window.sessionStorage.getItem('user');
        console.log(this.username)
        var self = this
        this.$http.get('test/show').then(
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
