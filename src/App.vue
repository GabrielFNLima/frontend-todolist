<template>
  <div id="app">
    <router-view />
    <footer>
      <div>
        <a href="https://github.com/GabrielFNLima/frontend-todolist">github</a>
      </div>
    </footer>
  </div>
</template>
<style scoped>
footer {
  position: absolute;
  bottom: 0;
  height: 50px;
  padding: 15px;
  width: 100vw;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
footer a {
  text-decoration: none;
}
footer div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
}
footer div:first-child {
  border-left: none;
}
footer div:last-child {
  border-right: none;
}
</style>
