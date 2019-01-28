<template>
    <my-page class="page-home" :title="title" :page="page">
        <!-- <div class="slogan">做最好的博客平台</div> -->
        <div class="user-box" v-if="user">
            <img class="avatar" :src="user.avatar">
            <div class="name">{{ user.name }}</div>
            <div class="description">{{ user.description }}</div>
        </div>
        <div class="article-box">
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
                    </div>
                </li>
            </ul>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    const moment = window.moment

    export default {
        data () {
            return {
                title: '作者主页',
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
            this.userId = this.$route.params.id
            this.$http.get('/users/' + this.userId).then(
                response => {
                    let data = response.data
                    this.user = data
                    this.title = this.user.name + '的主页'
                },
                response => {
                    console.log(response)
                })

            this.$http.get('/u/blog/articles').then(
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
.user-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80px;
    .name {
        text-align: center;
        font-weight: bold;
    }
    .avatar {
        display: block;
        width: 80px;
        height: 80px;
        margin-bottom: 8px;
        border-radius: 50%;
    }
    .description {
        color: #999;
    }
}
</style>
