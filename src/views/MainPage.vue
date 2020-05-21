<template>
  <div class="main-page">
    <Chat class="main-page__chat" />
    <Chat class="main-page__chat" />
  </div>
</template>

<script>
import Chat from './Chat';

export default {
  name: 'MainPage',
  components: {
    Chat
  }
}
</script>

<style scoped lang="scss">
.main-page {
  display: flex;
  width: 100%;
  min-height: 100vh;
  &__chat {
    width: 50%;
  }
}
</style>
