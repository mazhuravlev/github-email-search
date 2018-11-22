<template>
    <div>
        <b-card :title="username">
            <b-container>
                <b-row>
                    <b-col>
                        <b-img :src="avatar" class="avatar"></b-img>
                    </b-col>
                    <b-col>
                        <div style="margin: 12px auto 0 auto;">
                            <b-btn :to="`https://github.com/${username}`">Go to GitHub profile</b-btn>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
        <div class="result">
            <h5>
                Email lookup results for
                <strong>{{username}}</strong>
            </h5>
            <b-alert variant="secondary" :show="result.length === 0">Nothing found..</b-alert>
            <b-list-group>
                <b-list-group-item
                    v-for="rec in result"
                    :key="[rec.name,rec.email].join(':')"
                >{{rec.email}} : {{rec.name}}</b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'avatar',
        'username',
        'result'
    ]
}
</script>

<style>
.avatar {
  height: 300px;
}

.result {
  margin-top: 12px;
}
</style>