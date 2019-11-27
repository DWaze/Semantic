<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button
          class="md-icon-button"
          @click="toggleMenu"
          v-if="!menuVisible"
        >
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">OpenCycle</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text"
              ><router-link to="/">Bicycle Stations</router-link></span
            >
          </md-list-item>

          <md-list-item>
            <md-icon>send </md-icon>
            <span class="md-list-item-text"
              ><router-link to="/">Charging Stations</router-link></span
            >
          </md-list-item>

          <md-list-item>
            <md-icon>delete </md-icon>
            <span class="md-list-item-text"
              ><router-link to="/">Recycle</router-link></span
            >
          </md-list-item>
          <md-list-item>
            <md-icon>error </md-icon>
            <span class="md-list-item-text"
              ><router-link to="/about">About</router-link></span
            >
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<style scoped>
.md-app {
  height: 100vh;
  border: 1px solid transparent;
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.search {
  max-width: 500px;
}

.search_span {
  margin: auto;
}
</style>

<script>
export default {
  name: "md_home",
  data: () => ({
    menuVisible: false,
    selectedEmployee: null
  }),
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    }
  }
};
</script>
