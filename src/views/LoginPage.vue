<template>
  <div class="login-page">
    <div class="login-page-card">
      <h2 class="login-page__title">Authorization</h2>
      <label class="login-page-field">
        <p class="field__label">Username</p>
        <input
          class="field__input"
          type="text"
          v-model="username"
          @input="reset('username')"
        />
        <p class="field__error">{{usernameError}}</p>
      </label>
      <label class="login-page-field">
        <p class="field__label">Picture</p>
        <input
          class="field__input"
          type="text"
          v-model="picture"
          @input="reset('picture')"
        />
        <p class="field__error">{{pictureError}}</p>
      </label>
      <button class="login-page__submit" @click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      usernameError: '',
      picture: '',
      pictureError: ''
    };
  },
  methods: {
    reset(field) {
      this[field + 'Error'] = '';
    },
    submit() {
      this.usernameError = !!this.username ? '' : 'field is required';
      this.pictureError = !!this.picture ? '' : 'field is required';
      if (!this.usernameError && !this.pictureError) {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  &-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid #dddddd;
    padding: 30px 60px;
    border-radius: 2px;
  }
  &__title {
    margin-bottom: 20px;
    width: 100%;
    text-align: center;
  }
  &-field {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    .field {
      &__label {
        font-size: 14px;
      }
      &__input {
        width: 270px;
        margin-top: 4px;
      }
      &__error {
        margin-top: 2px;
        font-size: 12px;
        color: #d45;
        min-height: 14px;
        min-width: 1px;
      }
    }
  }
  &__submit {
    margin-top: 8px;
    align-self: flex-end;
  }
}
</style>
