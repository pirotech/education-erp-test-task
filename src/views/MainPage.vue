<template>
  <div class="main-page">
    <Chat
      class="main-page__chat"
      :owner="user1"
      :chats="chats"
      :onSendMessage="onSendMessage"
      :onSendYourself="onSendYourself"
    />
    <Chat
      class="main-page__chat"
      :owner="user2"
      :chats="chats"
      :onSendMessage="onSendMessage"
      :onSendYourself="onSendYourself"
    />
  </div>
</template>

<script>
import Chat from './Chat';

export default {
  name: 'MainPage',
  components: {
    Chat
  },
  data() {
    return {
      user1: {
        id: 0,
        chat: {
          id: 10,
          messages: []
        }
      },
      user2: {
        id: 1,
        chat: {
          id: 11,
          messages: []
        }
      },
      chats: [
        {
          id: 12,
          name: '',
          members: [],
          messages: []
        }
      ],
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    picture() {
      return this.$store.state.picture;
    }
  },
  methods: {
    onSendMessage(value, fromUserId, toChatId) {
      const message = {
        id: Math.round(Math.random() * 1000),
        authorId: fromUserId,
        text: value
      };
      this.chats.forEach(item => {
        if (item.id === toChatId) {
          item.messages.push(message);
        }
      });
    },
    onSendYourself(value, userId) {
      const message = {
        id: Math.round(Math.random() * 1000),
        authorId: userId,
        text: value
      };
      if (userId === this.user1.id) {
        this.user1.chat.messages.push(message);
      }
      if (userId === this.user2.id) {
        this.user2.chat.messages.push(message);
      }
    }
  },
  mounted() {
    this.chats[0].members.push({
      id: 0,
      name: this.username,
      picture: this.picture
    },
    {
      id: 1,
      name: 'Иван Иванов'
    });
  }
}
</script>

<style scoped lang="scss">
.main-page {
  display: flex;
  width: 100%;
  min-height: 100vh;
  @media (max-width: 992px) {
    flex-direction: column;
  }
  &__chat {
    width: 50%;
    @media (max-width: 992px) {
      width: 100%;
      height: 50vh;
      border-top: 2px solid #eeeeee;
      &:first-child {
        border-top: none;
      }
    }
  }
}
</style>
