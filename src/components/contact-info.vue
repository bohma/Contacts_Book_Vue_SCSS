<template>
  <div class="contact__details" v-if="contact">
    <div class="links">
      <!-- По роуту переходим к компоненту ContactList -->
      <router-link :to="{name: 'home'}" class="btn">К списку контактов</router-link>
      <!-- Если массив состояний больше одного отображаем кнопку "Шаг назад"-->
      <div v-if="this.watchObj.length>1">
        <button @click="GoBack" class="btn">Back</button>
      </div>
    </div>

    <div v-for="(value, prop_name, index) in this.contact" :key="index" class="contact">
      <div class="contact__info">
        <div class="contact__property">
          <b>{{ prop_name }}:</b>
          {{value}}
        </div>

        <div class="contact__info_btn">
          <!-- По нажатию на конпку отобразим поля -->
          <button @click="showDeleteField(index)" class="btn btn_small btn_rm">Удалить</button>
          <!-- По нажатию на конпку отобразим поля -->
          <button
            @click="showEditField(prop_name, value, index)"
            class="btn btn_small"
          >Редактировать</button>
          <!-- Проверяем на истинность два выражения.  index==deleteField.showDeleteConfirm - это выражение отвечает за то чтобы отбражался блок именно под этим свойства. Без него отображаться будет под всеми.-->
          <!-- Булевая переменная deleteField.isShowDelete для отображения всех блоков удалить-->
        </div>

        <div
          v-if="index==deleteField.showDeleteConfirm && deleteField.isShowDelete"
          class="btn__confirm"
        >
          <b>Вы дейсвтительно хотите удалить поле?</b>
          <!-- Скрыть этот блок с выбором -->
          <button
            @click="deleteField.isShowDelete=!deleteField.isShowDelete"
            class="btn btn_small"
          >Нет</button>
          <!-- Удалить это свойство из контакта. Пробрасываем данное имя свойства объекта(контакта) -->
          <button @click="deleteFieldData(prop_name)" class="btn btn_small btn_rm">Да</button>
        </div>
        <!-- Проверяем на истинность два выражения.  index==editField.showEditInputs - это выражение отвечает за то чтобы отбражался блок именно под этим свойства. Без него отображаться будет под всеми.-->
        <!-- Булевая переменная deleteField.isShowDelete для отображения всех блоков изменить-->
        <div
          v-else-if="index==editField.showEditInputs && editField.isEditField"
          class="btn__confirm"
        >
          <!-- Отобразим два поля для ввода.-->
          <!-- editField.nameField - отвечает за название свойства которое мы хотим изменить -->
          <div class="btn__confirm-inputs">
            <input
              type="text"
              class="edit__input"
              placeholder="Field name"
              v-model="editField.nameField"
            />
            <!-- editField.dataField - отвечает за значение свойства которое мы хотим изменить -->
            <input type="text" class="edit__input" placeholder="Data" v-model="editField.dataField" />
            <!-- Если нажмаем на кнопку отмены то проверяем по ошибке ли мы нажали или нет -->
            <!-- editField.isCancel инвертируем значение -->
          </div>
          <button
            @click="editField.isCancel=!editField.isCancel"
            class="btn btn_small btn_rm"
          >Отменить</button>
          <!-- После редактирования данных нажмаем на кнопку сохранения изменений вызываем функцию editFieldData -->
          <button @click="editFieldData(prop_name, value, index)" class="btn btn_small">Сохранить</button>
          <!-- Если значение  editField.isCancel=true то отображем блок-->
          <div v-if="editField.isCancel" class="btn__confirm-cancel">
            <b>Изменения не сохранятся!</b>
            <!-- Если нажимаем на кнопку Отменить изменения редактирование инвертируем значение editField.isEditField  и editField.isCancel скрывается блок с редактированием и потверждением отмены-->
            <button
              @click="editField.isEditField = !editField.isEditField;editField.isCancel=!editField.isCancel"
              class="btn btn_small btn_rm"
            >Сброс</button>
            <!-- Если нажимаем на кнопку Продолжить редактирование инвертируем значение editField.isCancel и скрывается блок с выбором-->
            <button @click="editField.isCancel=!editField.isCancel" class="btn btn_small">Продолжить</button>
          </div>
        </div>
      </div>
    </div>

    <div class="contact_add">
      <div class="contact__add-btn">
        <button class="contact_add-btn btn" @click="showAddForm()">Добавить поле</button>
      </div>
      <div v-if="field.isField">
        <input class="form__text" type="text" placeholder="Имя поля" v-model="field.nameField" />
        <input class="form__text" type="text" placeholder="Значение поля" v-model="field.dataField" />
        <button class="btn contact__add-btn" @click="addField">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import list from "../list";

export default {
  name: "contact-info",
  data() {
    return {
      contacts: list.contacts,
      contact: {
        type: Object,
        default() {
          return {};
        },
      },
      contactId: null,
      watchObj: [], //Массив для хранения состояний нашего объекта
      field: {
        nameField: "",
        dataField: "",
        isField: false,
      },
      editField: {
        nameField: "",
        dataField: "",

        showEditInputs: "",
        isEditField: false,
        isCancel: false,
      },
      deleteField: {
        isShowDelete: false,
        showDeleteConfirm: "",
      },
    };
  },
  methods: {
    addField() {
      // Реактивно добавляем свойство в наш контакт и очищаем содержимое полей ввода
      this.$set(this.contact, this.field.nameField, this.field.dataField);
      this.field.nameField = "";
      this.field.dataField = "";
    },
    showAddForm() {
      this.field.isField = !this.field.isField;
    },

    editFieldData(prop_name, value, index) {
      // По скольку мы не можем менять название свойства и оставлять его в том же положении относительно других свойств. Проведем некоторые манипуляции.
      // Создадим массив из свойство:значение данного объекта (контакта)
      // arr = [
      //   {id: 1},
      //   {tel: +380123456789}....
      // ]
      let arr = Object.entries(this.contact).map((entry) => ({
        [entry[0]]: entry[1],
      }));

      //Реактивно удаляем объект из массива по названию свойства в объекте(оно там одно) так как все свойства в разных объектах
      this.$delete(arr[index], prop_name);
      // Реактивно устанавливаем значение в то место в массиве из которого удалили.В качестве названия свойства и значения берём значение из импутов.
      this.$set(arr[index], this.editField.nameField, this.editField.dataField);
      // Очищаем наш основной объект(объект контакта) от всех свойств и значений
      for (let item in this.contact) this.$delete(this.contact, item);
      // И пушим в наш объект свойства по очереди вместе с измененным
      for (let item_arr of arr) {
        Object.assign(this.contact, item_arr);
      }
      // Скрываем наши поля для ввода
      this.editField.isEditField = !this.editField.isEditField;
    },
    showEditField(prop_name, value, index) {
      // Добавляем текущее навзавние свойства в input-ы связаным ранее v-model. Для удобства.
      this.editField.nameField = prop_name;
      // Добавляем текущее значения свойства в input-ы связаным ранее v-model. Для удобства.
      this.editField.dataField = value;
      //Добавляем значения для отображения полей редактирования только под свойством которое находится в данном контексте.
      this.editField.showEditInputs = index;
      this.editField.isEditField = !this.editField.isEditField;
    },

    deleteFieldData(prop_name) {
      //Инвертируем булевое значение для отображения блока проверки (удалить / не удалять)
      this.deleteField.isShowDelete = !this.deleteField.isShowDelete;
      //Реактивно удаляем свойсвто по названию из объекта(контакта)
      this.$delete(this.contact, prop_name);
    },
    showDeleteField(index) {
      //Инициализируем deleteField.showDeleteConfirm к индексу чтобы только под этим свойством отобразился блок
      this.deleteField.showDeleteConfirm = index;
      //Инвертируем булевое значение для отображения блока проверки (удалить / не удалять)
      this.deleteField.isShowDelete = !this.deleteField.isShowDelete;
    },

    GoBack() {
      //Очищаем наш объект-контакт от всех свойств
      for (let item in this.contact) this.$delete(this.contact, item);
      //Добавляем свойства в наш объект-контакт из массива состояний watchObj
      //Добавляем предпоследний элемент
      //-1 это текущее состояние объекта то есть последний элемент массива - так как нумерация в массивах начинается с нуля
      //-2 это предыдущее состояния массива
      this.contact = { ...this.watchObj[this.watchObj.length - 2] };
    },
  },
  watch: {
    // Наблюдаем за изменениями нашего объекта
    contact() {
      // Создаем вспомогательный объект для хранений данных нашиего изменяющегося объекта
      // Не используем его так как в массиве будут реактивно изменяться. И все элементы(объект-контакт) будут одинаковы.
      let test = {};
      //Передаем все свойства объекта contact объекту test
      test = { ...this.contact };
      // Пушим текущее состояние нашего объекта в массив
      this.watchObj.push(test);
      // Чтобы данные сохранились не только в нашем объекте-контакт.
      // Сохраняем наш объект в массив наших контактов
      //Удаляем один элемент с позиции this.contactId - так как генерировался по индексу в массиве.
      //И заменяем его на наш контакт
      this.contacts.splice(this.contactId, 1, { ...this.contact });
    },
  },

  created: function () {
    //Принимаем наше динамически созданое id из компонента ContactList
    this.contactId = this.$route.params.id;
    //Определяем наш контакт по id элемента в массиве так как он привязан к индексу в массиве
    this.contact = this.contacts[this.contactId];
  },
};
</script>

<style lang="scss" >
.contact__details {
  margin: 0 auto;
  max-width: 1200px;
}
.links {
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
}
.contact {
  margin: 20px 0;
  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    &_property {
    }
    &_btn {
      
    }
  }
  &__add {
    &-btn {
      margin: 20px 0;
    }
  }
  .btn__confirm {
    flex: 0 0 100%;
    margin-top: 15px;
    display: flex;
    button {
      padding: 2px 15px;
    }
    b {
      margin-right: 20px;
    }
    &-cancel {
      display: flex;
      margin-top: 15px;
    }
  }
}
.edit__input {
  margin-right: 20px;
  font-size: 14px;
  height: 25px;
  padding: 0 15px;
  border: 1px solid #cecece;
  width: 200px;

  &:focus {
    outline: none;
  }
}
.back {
  display: flex;
  right: 0;
}
@media screen and (max-width: 1023px) {
  .btn__confirm {
    flex-wrap: wrap;
    &-inputs {
      flex: 0 0 100%;
      margin-bottom: 10px;
    }
    &-cancel {
      flex: 0 0 100%;
      align-items: center;

      b {
        order: 2;
      }
      button {
        order: 1;
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .contact {
    &__info {
      display: block;
    }
    &__property {
      margin-bottom: 10px;
    }
    .btn__confirm {
      b {
        margin-bottom: 10px;
        margin-right: 0;
        display: block;
      }
      &-cancel {
        flex: 0 0 100%;
        display: block;
      }
    }
  }
  .edit__input {
    margin-bottom: 10px;
  }
}
</style>
