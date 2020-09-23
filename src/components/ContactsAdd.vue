<template>
  <div class="contact">
    <form class="form">
      <div class="form__group">
        <label for class="form__title">Имя абонента</label>
        <!-- Связываем наши введенные данные с значением  contact.name-->
        <input type="text" class="form__text" placeholder="Введите имя" v-model="contact.name" />
      </div>
      <div class="form__group">
        <label for class="form__title">Номер телефона</label>
        <!-- Связываем наши введенные данные с значением  contact.tel-->
        <input type="number" class="form__text" placeholder="Введите номер" v-model="contact.tel" />
      </div>
      <button type="submit" class="btn" @click.prevent="addContact">Сохранить</button>
    </form>
  </div>
</template>
<script>
// Импортируем список контактов из файла list.js

import list from "../list";
export default {
  data() {
    return {
      //Принимаем от родителя Contactlist контакт в формате по умолчанию - Object
      contact: {
        type: Object,
        default() {
          return {};
        },
      },
      //Массив котнактов инициализируем из файла list
      contacts: list.contacts,
    };
  },
  methods: {
    addContact(name, tel) {
//Если массив контактов больше 0 
if (this.contacts.length > 0) {
        // Добавляем в конец  новый контакт с свойствами name te
        // Задаём контакту id 
        // this.contacts[this.contacts.length - 1].id - id последнего элемента в списке котнатков
        // занчение id нового котнакта будет больше на 1 
        this.contacts.push({ name: this.contact.name, tel: this.contact.tel, id: this.contacts[this.contacts.length - 1].id + 1 });
        this.contact.name = ""; //Чистим поля после добавления в массив
        this.contact.tel = "";
      }
      else {
        //Если массив контактов больше 0 
        //Задаём контакту значения id = 1 так как он будет первым в списке контактом
        this.contacts.push({ name: this.contact.name, tel: this.contact.tel, id: 1 });
        this.contact.name = "";
        this.contact.tel = "";
      }
    },
  },
};
</script>
<style lang="scss">
.form {
  &__group {
    margin-bottom: 20px;
  }
  &__title {
    display: block;
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  &__text {
    font-size: 16px;
    height: 50px;
    padding: 0 15px;
    border: 1px solid #cecece;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>
