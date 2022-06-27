<template>
  <!-- Login Form -->
    <div class="text-white text-center font-bold p-4 mb-4 "
        v-if="login_show_alert"
        :class="login_alert_variant">
        {{ login_alert_msg }}
    </div>
    <vee-form :validation-schema="login_schema"
    @submit="login"
    >
    <!-- Email -->
    <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <vee-field type="email" name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded bg-gray-50"
        placeholder="Enter Email" />
        <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field type="password" name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded bg-gray-50"
        placeholder="Password" />
        <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button type="submit" :disabled="login_in_submission"
        class="block w-full bg-blue-600 text-white py-1.5 px-3 rounded transition
        hover:bg-blue-700">
        Submit
    </button>
    </vee-form>
</template>

<script>
const LoginActionTypes = {
  LOGIN_DEFAULT: 'bg-blue-500',
  LOGIN_FAILURE: 'bg-red-500',
  LOGIN_SUCCESS: 'bg-green-500',
  LOGIN_MSG_DEFAULT: 'Please wait! We are logging you in.',
  LOGIN_MSG_FAILURE: 'Invalid login details.',
  LOGIN_MSG_SUCCESS: 'Success!',
};

export default {
  name: 'LoginForm',
  data() {
    return {
      login_schema: {
        email: 'required|email',
        password: 'required|min:3|max:100',
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: LoginActionTypes.LOGIN_DEFAULT,
      login_alert_msg: LoginActionTypes.LOGIN_MSG_DEFAULT,

    };
  },
  methods: {
    async login(values) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = LoginActionTypes.LOGIN_DEFAULT;
      this.login_alert_msg = LoginActionTypes.LOGIN_MSG_DEFAULT;

      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        this.login_in_submission = false;
        this.login_alert_variant = LoginActionTypes.LOGIN_FAILURE;
        this.login_alert_msg = LoginActionTypes.LOGIN_MSG_FAILURE;
        return;
      }

      this.login_alert_variant = LoginActionTypes.LOGIN_SUCCESS;
      this.login_alert_msg = LoginActionTypes.LOGIN_MSG_SUCCESS;

      // successfully logged in. Refresh window to remove modal as it is now unnecessary.
      window.location.reload();
    },
  },
};

</script>
