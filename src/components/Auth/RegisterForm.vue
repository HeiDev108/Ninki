<template>
  <!-- Registration Form -->
    <div class="text-white text-center font-bold p-5 mb-4"
    v-if="reg_show_alert" :class="reg_alert_variant">
        {{ reg_alert_msg }}
    </div>
    <!-- use vee-form to allow vee-validate validation -->
    <vee-form :validation-schema="v_schema"
    @submit="register" :initial-values="userData"
    >
    <!-- Name -->
    <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <vee-field type="text" name="name"
        class="block w-full py-1.5 px-3 text-black border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded bg-gray-50"
        placeholder="Enter Name"
        />
        <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <vee-field type="email" name="email"
        class="block w-full py-1.5 px-3 text-black border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded bg-gray-50"
        placeholder="Enter Email" />
        <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
        <label class="inline-block mb-2">Age</label>
        <vee-field type="number" name="age"
        class="block w-full py-1.5 px-3 text-black border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded bg-gray-50" />
        <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input class="block w-full py-1.5 px-3 text-black border
            border-gray-300 transition duration-500 focus:outline-none
            focus:border-black rounded bg-gray-50" type="password"
            placeholder="Password" v-bind="field" />
        <div class="text-red-600" v-for="error in errors" :key="error">
            {{ error }}
        </div>
        </vee-field>

    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
        <label class="inline-block mb-2">Confirm Password</label>
        <vee-field type="password" name="confirm_password"
        class="block w-full py-1.5 px-3 text-black border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded bg-gray-50"
        placeholder="Confirm Password" />
        <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
        <label class="inline-block mb-2">Country</label>
        <vee-field as="select" name="country"
        class="block w-full py-1.5 px-3 text-black border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded bg-gray-50">
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Mars">Mars</option>
        </vee-field>
        <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
        <vee-field type="checkbox" name="tos" value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded inline-block bg-gray-50" />
        <label class="inline-block">Accept terms of service</label>
        <ErrorMessage class="text-red-600 block" name="tos" />
    </div>
    <button type="submit" :disabled="reg_in_submission"
        class="block w-full bg-blue-600 text-white py-1.5 px-3 rounded transition
        hover:bg-blue-700 ">
        Submit
    </button>
    </vee-form>
</template>

<script>
const RegisterActionTypes = {
  REGISTER_DEFAULT: 'bg-blue-500',
  REGISTER_FAILURE: 'bg-red-500',
  REGISTER_SUCCESS: 'bg-green-500',
  REGISTER_MSG_DEFAULT: 'Please wait! Your account is being created.',
  REGISTER_MSG_FAILURE: 'An unexpected error occured. Please try again later',
  REGISTER_MSG_SUCCESS: 'Success! Your account has been created.',
};

export default {
  name: 'RegisterForm',
  data() {
    return {
      v_schema: {
        name: 'required|min:3|max:32|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:150',
        password: 'required|min:3|max:100',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Mars',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: RegisterActionTypes.REGISTER_DEFAULT,
      reg_alert_msg: RegisterActionTypes.REGISTER_MSG_DEFAULT,
    };
  },
  methods: {
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = RegisterActionTypes.REGISTER_DEFAULT;
      this.reg_alert_msg = RegisterActionTypes.REGISTER_MSG_DEFAULT;

      // try create account
      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = RegisterActionTypes.REGISTER_FAILURE;
        this.reg_alert_msg = error.message;
        return;
      }
      this.reg_alert_variant = RegisterActionTypes.REGISTER_SUCCESS;
      this.reg_alert_msg = RegisterActionTypes.REGISTER_MSG_SUCCESS;
    },
  },
};
</script>
