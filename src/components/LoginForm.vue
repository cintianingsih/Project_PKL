<template>
  <div class="login-cover d-flex justify-content-center align-items-center">
    <div class="card p-4">
      <img src="https://armydev.khansia.co.id/attachments/khatulistiwa_logo_baru.png" alt="Logo" class="card-img-top mx-auto d-block" style="max-width: 30%;">
      <div class="card-body">
        <h1 class="text-center">Login to your account</h1>
        <h3 class="mb-4 text-muted text-center">Your credentials</h3>
        <form @submit.prevent="submitForm">
          <div class="mb-3 input-group">
            <span class="input-group-text" style="color: #999999;">
              <i class="bi bi-person-fill"></i>
            </span>
            <input id="username" v-model="username" type="text" class="form-control" placeholder="Username">
          </div>
          <div class="mb-3 input-group">
            <span class="input-group-text" style="color: #999999;">
              <i class="bi bi-lock-fill"></i>
            </span>
            <input id="password" v-model="password" type="password" class="form-control" placeholder="Password">
          </div>
          <div class="mb-3 d-flex justify-content-between align-items-center">
            <div class="form-check">
              <input id="remember" v-model="remember" type="checkbox" class="form-check-input">
              <label class="form-check-label" for="remember">Remember</label>
            </div>
            <a href="#" class="text-muted" style="color: #1E88E5 !important;">Forgot password?</a>
          </div>
          <div class="d-grid mb-3">
            <button type="submit" class="btn btn-primary" :disabled="loading" style="background-color: #03A9F4; border-color: #03A9F4; color: #fff;">Login</button>
          </div>
          <div v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      remember: false,
      errorMessage: '',
      loading: false
    }
  },
  mounted() {
    if (localStorage.getItem('username') && localStorage.getItem('password')) {
      this.username = localStorage.getItem('username');
      this.password = localStorage.getItem('password');
      this.remember = true;
    }
  },
  methods: {
    submitForm() {
      if (this.username === 'admin' && this.password === 'pw12345') {
        this.loading = true;
        setTimeout(() => {
          const token = 'dummy_token';
          localStorage.setItem('token', token);
          if (this.remember) {
            localStorage.setItem('username', this.username);
            localStorage.setItem('password', this.password);
          } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
          }
          this.$router.push('/dashboard');
          this.loading = false;
        }, 1000);
      } else {
        this.errorMessage = 'Invalid username or password.';
      }
    }
  }
}
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  /* overflow: hidden; Mengunci scrolling pada body */
}

.login-cover {
  background: url(https://armydev.khansia.co.id/distro/assets/images/login_cover.jpg) no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  max-width: 400px;
}

.card-body h1 {
  font-family: "Roboto", Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 23px;
}

.card-body h3 {
  font-family: "Roboto", Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 17px;
}

.btn-primary {
  background-color: #03A9F4;
  border-color: #03A9F4;
  color: #fff;
}
</style>
