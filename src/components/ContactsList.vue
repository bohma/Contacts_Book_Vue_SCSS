<template>
  <div class="contacts__list">
    <h1>Книга контактов</h1>

    <!-- По нажатию на поле Добавить контакт отобразить поле для ввода данных контакта -->
    <a href="#" class="btn" @click="isShowContact = !isShowContact">Добавить контакт</a>
    <!-- Отобразим компонент ContactsAdd если isShowContact - true -->
    <ContactsAdd v-show="isShowContact" />
    <!-- Если длинна массива контактов больше 0 то отобразить их список  -->
    <div v-if="contacts.length > 0" class="contacts__list-wrap">
      <!-- Отобразим циклом список контактов пробросив значение индекса-->
      <div
        v-for="(contact, index) in contacts"
        :key="contact.id"
        :contact="contact"
        class="contacts__item"
      >
        <div class="contacts__name">
          <!-- Сделаем нумерацию контатков по индексу+1-->
          <div class="contacts__index">{{ index+1 }}</div>
          {{ contact.name }}
        </div>
        <!-- Если в контакте есть поле номера телефона -> отобразим его в карточке контакта-->
        <div class="contacts__tel" v-if="contact.tel">
          <a :href="'tel:+' + contact.tel">+{{ contact.tel }}</a>
        </div>
        <div class="buttons">
          <!-- Реализация создания динамичесакого роута на уникальную карточку товара передав id элемента. Передаём в компонент contact-info -->
          <router-link :to="{ name: 'contact-info', params: { id: index } }" class="btn">Подробнее</router-link>
          <!-- По кнопке выполнить метод removeContact передав аргументом id -->
          <button @click.prevent="removeContact(contact.id)" class="btn btn_rm">Удалить</button>
        </div>
      </div>
    </div>
    <!-- Если длинна массива контактов меньше 1 отобразить Книга контактов пуста -->
    <p class="contacts__list-p" v-else>Книга контактов пуста</p>
  </div>
</template>

<script>
import ContactsAdd from "@/components/ContactsAdd";
// Импортируем список контактов из файла list.js
import list from "../list";

export default {
  name: "ContactsList",
  data() {
    return {
      contacts: list.contacts,
      isShowContact: false, //Булевое значение для отображения поля создания контакта
    };
  },
  methods: {
    removeContact() {
      //Удалить 1 элемент(контакт) массива контактов по индексу
      this.contacts.splice(this.index - 1, 1);
    },
  },
  components: {
    ContactsAdd,
  },
};
</script>

<style lang="scss" >
h1 {
  margin: 20px 0;
}
.contacts {
  &__list {
    width: 100%;
    &-wrap {
      display: flex;
      flex-wrap: wrap;
      margin-top: 30px;
    }

    &-p {
      margin-top: 30px;
      font-size: 20px;
    }
  }
  &__item {
    width: calc((100% - 60px) / 3);
    border: 1px solid #cecece;
    border-radius: 10px;
    margin-bottom: 30px;
    padding: 20px;
    box-shadow: 5px 7px 5px rgba(0, 0, 0, 0.3);
    margin-right: 30px;
    &:nth-of-type(3n) {
      margin-right: 0;
    }
    .btn:first-of-type {
      margin-right: 15px;
    }
  }
  &__tel {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  &__name {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 24px;
  }
  &__index {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    flex: 0 0 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background: #4d90fe;
  }
}
@media screen and (max-width: 1023px) {
  .contacts {
    &__item {
      width: calc((100% - 40px) / 2);
      margin-right: 20px;
      &:nth-of-type(3n) {
        margin-right: 20px;
      }
      &:nth-of-type(2n) {
        margin-right: 0;
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .contacts {
    &__list {
      &-wrap {
        display: block;
      }
    }
    &__item{
      width: 100%;
      margin-right: 0;
       &:nth-of-type(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
