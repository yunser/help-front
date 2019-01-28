<template>
    <my-page title="管理" :page="page">
        <!-- <div class="slogan">做最好的博客平台</div> -->
        <div class="article-box">
            <ui-raised-button label="新增" @click="add" />
            <ul class="news-list">
                <li class="item" v-for="article in articles">
                    <div>
                        <router-link class="title" :to="`/articles/${article.id}`">{{ article.title }}</router-link>
                        <div class="meta">
                            <img class="avatar" :src="article.user.avatar">
                            <div class="user-name">{{ article.user.name }}</div>
                            <div class="time">{{ article.createTime | time }}</div>
                        </div>
                        <ul v-if="article.tags">
                            <ui-badge class="tag" v-for="tag, index in article.tags" :key="index" :content="tag" slot="after"/>
                        </ul>
                        <ui-raised-button label="删除" @click="remove(article)" />
                        <ui-raised-button label="编辑" @click="edit(article)" />
                    </div>
                </li>
            </ul>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    const moment = window.moment
    import {cms} from '@/config'

    export default {
        data () {
            return {
                articles: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'home',
                            to: '/',
                            title: '首页'
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
            this.$http.get(`/u/${cms.uid}/articles`).then(
                response => {
                    let data = response.data
                    this.articles = data
                    // for (let item of this.article) {
                    //     item.tags = 'ass'
                    // }
                },
                response => {
                    console.log(response)
                })
        },
        methods: {
            add() {
                this.$router.push('/admin/article/add')
            },
            edit(article) {
                this.$router.push('/admin/articles/' + article.id)
            },
            remove(article) {
                this.$http.delete(`/articles/` + article.id).then(
                        response => {
                            let data = response.data
                            // this.article = data
                            this.$message({
                                type: 'success',
                                text: '删除成功'
                            })
                            this.$router.go(0)
                            // if (this.article.contentType === 'markdown') {
                            //     console.log('是啊')
                            //     this.article.content = marked(this.article.content)
                            // }
                        },
                        response => {
                            console.log(response)
                        })
            }
        },
        filters: {
            time(value) {
                let m = moment(value)
                let now = new Date()
                console.log('m.year()', m.year())
                if (m.year() === now.getFullYear()) {
                    return m.format('MM-DD HH:mm')
                }
                return m.format('YYYY-MM-DD HH:mm')
            }
        }
    }
</script>

<style lang="scss" scoped>
.page-home {
    background-color: #eee;
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
        display: block;
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
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
        margin-right: 16px;
    }
    .time {
        color: #999;
    }
    .tag {
        margin-right: 8px;
    }
}
</style>
