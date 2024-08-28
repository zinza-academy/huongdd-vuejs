<template>
  <h1>{{ user.name }}</h1>
  <button @click="logOut">Logout</button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const axios = require('axios');
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const router = useRouter();
    const user = ref('');
    const logOut = () => {
      localStorage.removeItem('token');
      router.push('/login');
    };
    const getProfile = () => {
      axios
        .get('http://127.0.0.1:8000/api/profile')
        .then(function (response) {
          user.value = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      getProfile();
    }

    return {
      user,
      logOut
    };
  }
});
</script>
