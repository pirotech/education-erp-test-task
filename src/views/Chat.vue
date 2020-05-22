<template>
  <div class="chat">
    <ul class="chat-contacts">
      <li
        class="chat-contacts-item"
        :class="{'chat-contacts-item_active': ownerChatActive}"
        @click="setActiveChat(owner.chat)"
      >
        <i class="chat-contacts-item__picture"></i>
        <span class="chat-contacts-item__name">Мои сообщения</span>
      </li>
      <li
        v-for="chat in preparedChats"
        :key="chat.id"
        class="chat-contacts-item"
        :class="{'chat-contacts-item_active': activeChat && chat.id === activeChat.id}"
        @click="setActiveChat(chat)"
      >
        <i
          class="chat-contacts-item__picture"
          :style="chat.picture ? {
            background: `no-repeat center center url(${chat.picture})`,
            backgroundColor: '#eee',
            backgroundSize: 'cover'
          } : {}"
        ></i>
        <span class="chat-contacts-item__name">
          {{chat.name}}
        </span>
      </li>
    </ul>
    <div class="chat-dialog">
      <ul class="chat-dialog-messages" v-if="activeChat">
        <li
          v-for="message in activeChat.messages"
          :key="message.id"
          class="chat-dialog-messages__item"
          :class="['chat-dialog-messages__item' + (message.authorId === owner.id ? '_right' : '_left')]"
        >{{message.text}}</li>
      </ul>
      <div class="chat-dialog-message-field" v-if="activeChat">
        <input
          class="message-field__input"
          type="text"
          v-model="message"
          @keyup.enter="sendMessage"
        />
        <button
          class="message-field__button"
          @click="sendMessage"
        >Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  props: {
    owner: Object,
    chats: Array,
    onSendMessage: Function,
    onSendYourself: Function
  },
  data() {
    return {
      activeChat: null,
      message: ''
    };
  },
  computed: {
    ownerChatActive() {
      return this.activeChat && this.owner.chat.id === this.activeChat.id;
    },
    preparedChats() {
      return this.chats && this.chats.map(chat => {
        // take first NO owner user
        // his name is chat name
        const first = chat.members.find(item => item.id !== this.owner.id);
        return {
          ...chat,
          name: first && first.name,
          picture: first && first.picture
        };
      });
    }
  },
  methods: {
    setActiveChat(value) {
      this.activeChat = value;
    },
    sendMessage() {
      if (this.message) {
        if (this.ownerChatActive) {
          this.onSendYourself(this.message, this.owner.id);
        } else {
          this.onSendMessage(this.message, this.owner.id, this.activeChat.id);
        }
        this.message = '';
      }
    }
  }
}
</script>

<style scoped lang="scss">
.chat {
  display: flex;
  align-items: stretch;
  &-contacts {
    width: 40%;
    color: #333333;
    &-item {
      display: flex;
      align-items: center;
      padding: 12px;
      cursor: pointer;
      transition: background-color .3s;
      user-select: none;
      &:hover {
        background-color: #fafafa;
      }
      &_active {
        border-right: 2px solid #cccccc;
        background-color: #fafafa;
      }
      &__picture {
        display: inline-block;
        width: 40px;
        height: 40px;
        background-color: #eee;
        border-radius: 50%;
      }
      &__name {
        margin-left: 10px;
      }
    }
  }
  &-dialog {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
    background-color: #f6f6f6;
    &-messages {
      display: flex;
      flex-direction: column;
      padding: 20px;
      &__item {
        display: inline-block;
        max-width: 80%;
        padding: 8px 12px;
        margin-top: 10px;
        background-color: #ffffff;
        color: #333333;
        border-radius: 2px;
        &:first-child {
          margin-top: 0;
        }
        &_left {
          align-self: flex-start;
          text-align: left;
        }
        &_right {
          align-self: flex-end;
          text-align: right;
        }
      }
    }
    &-message-field {
      position: absolute;
      bottom: 0;
      width: 100%;
      .message-field {
        &__input {
          width: 100%;
          padding: 14px 18px;
          font-size: 16px;
          color: #fff;
          border: none;
          border-radius: 0;
          background-color: #a1a1a1;
        }
        &__button {
          position: absolute;
          right: 0;
          padding: 14px 18px;
          font-size: 16px;
          letter-spacing: 1.2px;
          color: #fff;
          text-transform: uppercase;
          border: none;
          border-radius: 0;
          background-color: #a1a1a1;
          transition: background-color 0.3s;
          &:hover {
            background-color: #878787;
          }
        }
      }
    }
  }
}
</style>
