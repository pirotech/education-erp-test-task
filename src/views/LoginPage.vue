<template>
  <div class="login-page">
    <div class="login-page-card">
      <h2 class="login-page__title">Authorization</h2>
      <UiTextField
        class="login-page__username"
        label="Username"
        :value="username"
        :error="usernameError"
        :onChange="e => onFieldChange('username', e.target.value)"
      />
      <UiTextField
        class="login-page__picture"
        label="Picture"
        :value="picture"
        :error="pictureError"
        :onChange="e => onFieldChange('picture', e.target.value)"
      />
      <button class="login-page__submit" @click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
import UiTextField from '../components/UiTextField';
import LOGIN from '../store';

export default {
  name: 'LoginPage',
  components: {
    UiTextField
  },
  data() {
    return {
      username: '',
      usernameError: '',
      picture: '',
      pictureError: ''
    };
  },
  methods: {
    onFieldChange(name, value) {
      this[name] = value;
      this[name + 'Error'] = '';
    },
    submit() {
      this.usernameError = !!this.username ? '' : 'field is required';
      this.pictureError = !!this.picture ? '' : 'field is required';
      if (!this.usernameError && !this.pictureError) {
        this.$store.commit({
          type: 'LOGIN',
          username: this.username,
          picture: this.picture
        });
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
  background-color: #fafafa;
  &-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 60px;
    margin: 0 50px;
    border-radius: 4px;
    background-color: #fff;
    @media (max-width: 576px) {
      padding: 20px 40px;
    }
  }
  &__title {
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
  }
  &__username,
  &__picture {
    margin-top: 8px;
  }
  &__submit {
    margin-top: 8px;
    align-self: flex-end;
    color: #333333;
  }
}
</style>
