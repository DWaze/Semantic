<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      id: 0
    };
  },
  created() {
    this.id = this.$route.params.id;
    console.log(this.id);
  }
};
</script>
