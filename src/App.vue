<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  line-height: 1;
}
a {
  color: #2c3e50;
  text-decoration: none;
  transition: 0.2s;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.buttons {
  display: flex;
  .btn {
    margin-right: 20px;
    &:last-of-type {
      margin-right: 0;
    }
  }
}

.btn {
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  padding: 10px 15px;
  background: #4d90fe;
  color: #fff;
  border-radius: 5px;
  border: none;
  transition: 0.2s;
  &:hover {
    background: #43b984;
  }
  &_small {
    margin-right: 20px;
    font-size: 16px;
    padding: 4px 15px;
    &:last-of-type{
        margin-right: 0;
      }
  }
  &_rm {
    background: #c8483c;

    &:hover {
      background: #ff0000;
    }
  }

  &:focus {
    outline: none;
  }
}
@media screen and (max-width: 1280px) {
  .container {
    max-width: 1024px;
  }
}
@media screen and (max-width: 1023px) {
  .container {
    max-width: 768px;
  }
}
@media screen and (max-width: 767px) {
  .container {
    max-width: 375px;
  }
  .btn:hover {
    background: #4d90fe;
    &_rm {
      &:hover {
        background: #c8483c;
      }
    }
  }
}
</style>
