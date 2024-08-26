<template>
  <div class="container">
    <form action="#" @submit.prevent="onSubmit">
      <div class="content">
        <h1>Login</h1>
        <div class="form-control">
          <input
            class="form-input-text shadow"
            type="text"
            name="email"
            id=""
            placeholder="Email" />
        </div>
        <div class="form-control">
          <input
            class="form-input-text shadow"
            type="password"
            name="password"
            placeholder="Password" />
        </div>
        <div class="form-control">
          <a href="#">Forgot password?</a>
        </div>
        <div class="form-control">
          <button class="btn btn-full" type="submit">Login</button>
        </div>
        <div class="form-control">
          <p class="text-decoration-line">
            <span class="text-decoration-line-content">Or</span>
          </p>
        </div>
        <div class="flex horizontal">
          <a class="third-party" href="#"> <i class="fa-brands fa-google"></i>Login with Google </a>
          <a class="third-party" href="#">
            <i class="fa-brands fa-facebook"></i>Login with Facebook
          </a>
          <a class="third-party" href="#"> <i class="fa-brands fa-apple"></i>Login with Apple </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    onSubmit: function () {
      alert('submitted');
    }
  }
};
</script>
