<template>
  <div class="chat">
    <ul class="chat-contacts">
      <li
        v-for="contact in contacts"
        :key="contact.id"
        class="chat-contacts__item"
        :class="{'chat-contacts__item_active': activeContact && contact.id === activeContact.id}"
        @click="setActiveContact(contact)"
      >{{contact.name}}</li>
    </ul>
    <div class="chat-dialog">
      <ul class="chat-dialog-messages" v-if="activeContact">
        <li
          v-for="message in activeContact.messages"
          :key="message.id"
          class="chat-dialog-messages__item"
          :class="['chat-dialog-messages__item' + (message.author === owner.id ? '_right' : '_left')]"
        >{{message.text}}</li>
      </ul>
      <div class="chat-dialog-message-field" v-if="activeContact">
        <input
          class="message-field__input"
          type="text"
          v-model="message"
        />
        <button
          class="message-field__button"
          @click="sendMessage"
        >SEND</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      owner: {
        id: 0
      },
      contacts: [
        {
          id: 0,
          name: 'Написать себе',
          messages: [
            {
              id: 0,
              author: 0,
              text: 'Hello'
            },
            {
              id: 1,
              author: 0,
              text: 'Hello'
            },
            {
              id: 2,
              author: 0,
              text: 'How are you?'
            },
            {
              id: 3,
              author: 0,
              text: 'Cool'
            }
          ]
        },
        {
          id: 1,
          name: 'Иван Иванов',
          messages: [
            {
              id: 0,
              author: 0,
              text: 'Hello'
            },
            {
              id: 1,
              author: 1,
              text: 'Hello'
            },
            {
              id: 2,
              author: 0,
              text: 'How are you?'
            },
            {
              id: 3,
              author: 1,
              text: 'Cool'
            }
          ]
        }
      ],
      activeContact: null,
      message: ''
    };
  },
  methods: {
    setActiveContact(value) {
      this.activeContact = value;
    },
    sendMessage() {
      this.contacts = this.contacts.map(item => {
        if (this.activeContact && item.id === this.activeContact.id) {
          item.messages.push({
            id: Math.round(Math.random() * 1000),
            author: this.owner.id,
            text: this.message
          });
        }
        return item;
      });
      this.message = '';
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
    &__item {
      padding: 16px 24px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color .3s;
      &:hover {
        background-color: #f6f6f6;
      }
      &_active {
        border-right: 2px solid #cccccc;
        background-color: #fafafa;
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
