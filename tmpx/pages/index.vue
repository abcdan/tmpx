<template>
  <div class="purple">
    <div class="content">
      <h1>tmpx.email</h1>
      <br>
      <h2>A stupidly simple to use temporary mail host</h2>
      <br>
      <br>
      <div class="generate-button" @click="randomEmailAddress">Get an inbox</div>
      <br>
      <br><a href="https://github.com/abcdan/tmpx" class="link" target="_blank">We're on GitHub</a> <span
        class="link">-</span> <a href="https://lngzl.nl" class="link" target="_blank">Powered by LNGZL</a>
    </div>
    <p></p>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: function () {
    return {
      mail: ''
    }
  },
  methods: {
    randomEmailAddress() {
      const genRand = (len) => {
        return Math.random().toString(36).substring(2, len + 2);
      }

      const email = genRand(16) + '@tmpx.sa.com';
      this.$router.push("/inbox/" + email);
    }
  }
}
</script>

<style lang="postcss" scoped>
.purple {
  background-color: #bf96ed;
  @apply h-screen flex
}

.content {
  @apply m-auto text-center;
}

.generate-button {
  background-color: #997cbf;
  @apply text-xl text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 hover:text-black transition cursor-pointer;
}

.link {
  color: #e2c9f8;
  @apply text-xl font-semibold hover:text-black transition;
}

h1 {
  @apply text-6xl font-bold text-white;
}

h2 {
  @apply text-3xl text-white
}
</style>
