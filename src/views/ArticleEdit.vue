<template>
    <my-page class="page-detail" title="文章编辑" :page="page">
        <ui-text-field v-model="article.title" label="标题" />
        <br>
        <textarea class="content" v-model="article.content"></textarea>
        <br>
        <ui-checkbox v-model="article.top" label="置顶" class="demo-checkbox" /> 
        <br/>
        <ui-raised-button label="保存" @click="save" />
        <ui-raised-button label="删除" @click="remove(article)" />

        <!-- <ul class="tag-list" v-if="article.tags">
            <ui-badge class="tag" v-for="tag, index in article.tags" :key="index" :content="tag" slot="after"/>
        </ul> -->
    </my-page>
</template>

<script>
    /* eslint-disable */
    // const marked = window.marked
    import {cms} from '@/config'
    
    export default {
        data () {
            return {
                article: {
                    id: '',
                    title: '',
                    content: '',
                    top: 0
                },
                formType: 'add',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'home',
                            to: '/admin2',
                            title: '管理平台首页'
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
            this.id = this.$route.params.id
            if (!this.id) {
                return
            }
            this.formType = 'update'
            this.$http.get(`/articles/${this.id}`).then(
                response => {
                    let data = response.data
                    this.article = data
                    this.article.top = !!this.article.top
                    // if (this.article.contentType === 'markdown') {
                    //     console.log('是啊')
                    //     this.article.content = marked(this.article.content)
                    // }
                },
                response => {
                    console.log(response)
                })
        },
        methods: {
            save() {
                // console.log(this.article.top)
                // return
                if (this.formType === 'add') {
                    this.$http.post(`/articles`, {
                        title: this.article.title,
                        content: this.article.content,
                        uid: cms.uid,
                        contentType: 'markdown',
                        top: this.article.top ? 1 : 0
                    }).then(
                        response => {
                            let data = response.data
                            // this.article = data
                            this.$message({
                                type: 'success',
                                text: '保存成功'
                            })
                            // if (this.article.contentType === 'markdown') {
                            //     console.log('是啊')
                            //     this.article.content = marked(this.article.content)
                            // }
                        },
                        response => {
                            console.log(response)
                        })
                } else {
                    this.$http.put(`/articles/${this.id}`, {
                        title: this.article.title,
                        content: this.article.content,
                        top: this.article.top ? 1 : 0
                    }).then(
                        response => {
                            let data = response.data
                            // this.article = data
                            this.$message({
                                type: 'success',
                                text: '保存成功'
                            })
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
            remove(article) {
                this.$http.delete(`/articles/` + article.id).then(
                    response => {
                        let data = response.data
                        // this.article = data
                        this.$message({
                            type: 'success',
                            text: '删除成功'
                        })
                        this.$router.push('/admin2')
                        // if (this.article.contentType === 'markdown') {
                        //     console.log('是啊')
                        //     this.article.content = marked(this.article.content)
                        // }
                    },
                    response => {
                        console.log(response)
                    })
            }
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
    // background-color: #f1f1f1;
}
.content {
    width: 300px;
    height: 400px;
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
</style>
