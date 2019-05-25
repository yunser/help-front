<template>
    <my-page class="page-home" :title="title" :page="page">
        <div class="common-container container">
            <div class="article-box">
                <ul class="news-list">
                    <li class="item" v-for="article in articles">
                        <div>
                            <router-link :to="`/articles/${article.id}`">
                                <div class="title">
                                    <ui-badge class="top" content="置顶" v-if="article.top" />
                                    {{ article.title }}
                                </div>
                            </router-link>
                            <div class="meta">
                                <img class="avatar" :src="article.user.avatar">
                                <router-link class="user-name" :to="`/users/${article.user.id}/articles`">
                                    {{ article.user.name }}
                                </router-link>
                                <div class="time" :title="commonTimeFilter(article.createTime)">{{ article.createTime | timeFilter }}</div>
                            </div>
                            <ul v-if="article.tags">
                                <ui-badge class="tag" v-for="tag, index in article.tags" :key="index" :content="tag" />
                            </ul>
                        </div>
                    </li>
                </ul>
                <ui-raised-button class="more" label="加载更多" @click="loadMore" v-if="pagination.page < pagination.totalPage" />
            </div>

        </div>
        <!-- <div class="slogan">做最好的博客平台</div> -->
    </my-page>
</template>

<script>
    /* eslint-disable */
    const moment = window.moment
    import {timeFilter, commonTimeFilter} from '@/util/filter'
    import {cms} from '@/config'

    export default {
        data () {
            return {
                pagination: {
                    page: 1,
                    totalPage: 1
                },
                articles: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com/?',
                            target: '_blank',
                            title: '应用'
                        }
                        // {
                        //     type: 'icon',
                        //     icon: 'help',
                        //     to: '/help'
                        // }
                    ]
                }
            }
        },
        mounted() {
            console.log('cms', cms)
            this.title = document.title = cms.siteName
            this.loadData()

            window.addEventListener('keydown', this.keyDown = e => {
                console.log(e.keyCode)
                if (e.keyCode === 69) {
                    this.$router.push('/admin2')
                }
            })
        },
        destroyed() {
            window.removeEventListener('keydown', this.keyDown)
        },
        methods: {
            loadData() {
                let uid = this.$route.params.id || cms.uid
                this.$http.get(`/u/${uid}/articles?page_size=20&page=${this.pagination.page}`).then(
                    response => {
                        let data = response.data
                        // this.articles = this.articles.concat(data)
                        this.articles = data


                        // for (let item of this.article) {
                        //     item.tags = 'ass'
                        // }
                        console.log(response.headers)
                        console.log('X-Total-Page', response.headers['x-total-page'])
                        this.pagination.totalPage = response.headers['x-total-page']
                    },
                    response => {
                        console.log(response)
                    })
            },
            loadMore() {
                this.pagination.page++
                this.loadData()
            },
            commonTimeFilter
        },
        filters: {
            timeFilter,
        },
        watch:{
            $route(to, from) {
                console.log(to.path)
                this.loadData()
            }
        },
    }
</script>

<style lang="scss" scoped>
.page-home {
    // background-color: #eee;
}
.slogan {
    font-size: 32px;
    margin-bottom: 16px;
}
.article-box {
    background-color: #fff;
}
.news-list {
    .item {
        display: flex;
        align-content: space-between;
        padding: 16px 0;
        // margin-bottom: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, .12);
    }
    .title {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
    }
    .top {
        margin-right: 8px;
    }
    .meta {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }
    .avatar {
        display: block;
        width: 16px;
        height: 16px;
        margin-right: 4px;
        border-radius: 50%;
    }
    .user-name {
        color: #666;
        margin-right: 16px;
    }
    .time {
        color: #999;
    }
    .tag {
        margin-right: 8px;
    }
}
.more {
    margin-top: 16px;
}
</style>
