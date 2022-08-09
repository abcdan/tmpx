<template>
  <div>
    <div class="header" @click="clicked = !clicked">
      {{ mail.subject }} - {{ mail.from }} - {{ mail.date }}
    </div>
    <div  v-if="clicked" class="body">
      {{ mail.body }}
    </div>
    <br>
  </div>
</template>

<script>
export default {
  props: {
    mail: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      clicked: false,
    };
  },
}
</script>

<style lang="postcss" scoped>
.header {
  background-color: #e2c9f8;
  color: #401850;
  @apply  rounded-t-xl font-semibold px-2 py-1;
}

.body {
  @apply bg-gray-200 rounded-b-xl px-2 py-1;
}
</style>
