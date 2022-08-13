<template>
  <div class="purple">
    <div class="content">
      <h1>{{ $route.params.emailAddress }}</h1>
      <br>
      <h2>That's your burner email address 🔥</h2>
      <br>
      <div class="no-mail" v-if="!mail">
        <p>
          <span class="no-mail-text">📮 It looks like we haven't received any mail yet 📮</span>
        </p>
        <br>
      </div>
      <Mail :key="email.date" v-for="email of mail" :mail="email" />
      <br>
      <br><a href="https://github.com/abcdan/tmpx" class="link" target="_blank">We're on GitHub</a> <span
        class="link">-</span> <a href="https://discord.com/invite/p8uBcSW" class="link" target="_blank">Discord</a> <span
        class="link">-</span> <a href="https://github.com/abcdan/tmpx/blob/main/PRIVACY.md" class="link" target="_blank">Privacy Policy</a> <span
        class="link">-</span> <a href="https://lngzl.nl" class="link" target="_blank">Sponsored by LNGZL</a>
    </div>
  </div>
</template>

<script>
import Mail from "../../components/Mail.vue";
export default {
  name: "IndexPage",
  data: function () {
    return {
      mail: [],
      interval: null,
    };
  },
  fetchOnServer: false,
  async created() {
    const newMail = await this.getMail()
    this.mail = this.mail.concat(newMail);
    if (process.client) {
      this.interval = setInterval(async () => {
        const newMail = await this.getMail()
        this.mail = this.mail.concat(newMail);
        this.mail = this.mail.filter((mail, index, self) => {
          return self.findIndex(m => m.subject === mail.subject && m.sender === mail.sender && m.date === mail.date) === index;
        });
      }, 5000);
    }
  },
  destroyed() {
    if (process.client) {
      clearInterval(this.interval);
    }
  },
  methods: {
    async getMail() {
      const res = await this.$http.get("https://json.tmpx.email/mail/" + this.$route.params.emailAddress);
      const json = await res.json();
      if (process.client) {
        console.log(json);
      }
      return json.mails;
    }
  },
  components: { Mail }
}
</script>

<style lang="postcss" scoped>
.purple {
  background-color: #bf96ed;
  @apply min-h-screen min-w-screen flex;
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
