<template>
  <div class="purple">
    <div class="content">
      <h1>{{ $route.params.emailAddress }}</h1>
      <br>
      <h2>That's your burner email address 🔥</h2>
      <br>
      <div class="no-mail">
        <p>
          <span class="no-mail-text">📮 It looks like we haven't received any mail yet 📮</span>
        </p>
        <br>
      </div>
      <br>
      <br><a href="https://github.com/abcdan/tmpx" class="link" target="_blank">We're on GitHub</a> <span
        class="link">-</span> <a href="https://lngzl.nl" class="link" target="_blank">Powered by LNGZL</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: function () {
    return {
      mail: [],
      interval: null,
    }
  },
  created() {
    this.interval = setInterval(() => {
      this.mail = this.mail.concat(this.getMail())
    }, 5000)
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    async getMail() {
      const res = await this.$http.get('https://json.tmpx.email/mail/' + this.$route.params.emailAddress)
      const json = await res.json()
      console.log(json)
      return json.mails
    }
  }
}
</script>

<style lang="postcss" scoped>
.purple {
  background-color: #bf96ed;
  @apply h-screen flex;
}

.content {
  @apply m-auto text-center;
}

.no-mail-text {
  @apply text-xl pt-5 font-semibold text-white;
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
