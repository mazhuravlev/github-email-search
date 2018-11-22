<template>
    <div>
        <b-navbar type="light" variant="light">
            <b-nav-form @submit.prevent="search">
                <b-navbar-brand>GitHub email lookup</b-navbar-brand>
                <b-form-input
                    required
                    class="mr-sm-2"
                    type="text"
                    placeholder="GitHub login"
                    v-model="usernameInput"
                ></b-form-input>
                <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
        </b-navbar>
        <b-container class="container">
            <b-alert variant="secondary" :show="loading">Loading...</b-alert>
            <b-alert variant="danger" :show="!!error">Error: {{error}}</b-alert>
            <Result v-if="!error && result" :username="username" :result="result" :avatar="avatar"/>
        </b-container>
    </div>
</template>

<script>
"use strict";
import {getAvatar, getData, Error, Data} from './functions';
import Result from './Result';

export default {
    components: {Result},
    data(){
        return {
            usernameInput: '',
            username: undefined,
            avatar: undefined,
            error: undefined,
            result: undefined,
            loading: false
            };
    },
    methods: {
        async search() {
            this.username = this.usernameInput.trim().toLowerCase();
            this.result = [];
            this.loading = true;
            this.result = undefined;
            this.error = undefined;
            const avatarRequest = getAvatar(this.username);
            const response = await getData(this.username);
            this.avatar = await avatarRequest;
            this.loading = false;
            if(response instanceof Error) {
                this.error = response.error;
                return;
            }
            this.result = response.data;
        }
    }
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