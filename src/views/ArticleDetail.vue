<template>
    <my-page class="page-detail" title="文章详情" :page="page">
        <div class="detail-box">
            <h1 class="article-title">{{ article.title }}</h1>
            <div class="meta" v-if="article">
                <img class="avatar" :src="article.user.avatar">
                <router-link class="user-name" :to="`/users/${article.user.id}/articles`">
                    {{ article.user.name }}
                </router-link>
                <div class="time" :title="commonTimeFilter(article.updateTime)">更新于 {{ article.updateTime | timeFilter }}</div>
            </div>
            <ui-article class="article" v-html="article.content">
            </ui-article>
            <ul class="tag-list" v-if="article.tags">
                <ui-badge class="tag" v-for="tag, index in article.tags" :key="index" :content="tag" slot="after"/>
            </ul>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    // const marked = window.marked
    import {timeFilter, commonTimeFilter} from '@/util/filter'

    export default {
        data () {
            return {
                article: {},
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
            let id = this.$route.params.id
            this.$http.get(`/articles/${id}?convert=true`).then(
                response => {
                    let data = response.data
                    this.article = data
                    // if (this.article.contentType === 'markdown') {
                    //     console.log('是啊')
                    //     this.article.content = marked(this.article.content)
                    // }
                },
                response => {
                    console.log(response)
                })
            window.addEventListener('keydown', this.keyDown = e => {
                console.log(e.keyCode)
                if (e.keyCode === 69) {
                    this.$router.push('/admin/articles/' + this.article.id)
                }
            })
        },
        destroyed() {
            window.removeEventListener('keydown', this.keyDown)
        },
        methods: {
            commonTimeFilter
        },
        filters: {
            timeFilter
        }
    }
</script>

<style lang="scss" scoped>
.detail-box {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 24px;
    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12);
}
.page-detail {
    height: 100%;
    background-color: #f1f1f1;
}
.article {
    margin-bottom: 40px;
}
.article-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
}
.tag-list {

}
.tag {
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
</style>
