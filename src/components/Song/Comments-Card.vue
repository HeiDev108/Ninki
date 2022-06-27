<template>
  <!-- Form -->
    <section class="w-full pt-2 text-gray-800 relative px-10 text-left" id="comments">
      <div class="mt-2 shadow-xl rounded-lg bg-gray-50 border border-gray-200
        flex flex-col px-10 py-5">
        <div class="px-6 pb-2 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments ({{ comments.length }})</span>
          <i class="fa fa-comments float-right text-blue-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div class="text-white text-center font-bold p4 mb-4"
            v-if="comment_show_alert"
            :class="comment_alert_variant">
            {{ comment_alert_msg }}
          </div>
          <vee-form v-if="userLoggedIn"
            :validation-schema="comment_schema"
            @submit="addComment">
            <vee-field type="textarea" name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-200 transition
                duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."></vee-field>
            <ErrorMessage class="text-red-600" name="comment" />
            <button type="submit"
              :disabled="comment_in_submission"
              class="py-1.5 px-3 rounded text-gray-100 bg-green-600 block hover:bg-green-700">
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select v-model="sort"
            class="block mt-4 py-1.5 px-3 bg-gray-800 text-gray-100 border hover:bg-gray-700
            border-gray-900 transition duration-100 focus:outline-none focus:border-black rounded">
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
        <!-- Comments -->
    <ul class="w-full text-gray-800 relative text-left">
      <li class="pt-2 shadow-xl rounded-lg bg-gray-50 border border-gray-200
        flex flex-col px-10 py-5"
        v-for="comment in sortedComments"
        :key="comment.docID">
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold text-gray-800 text-xl">{{ comment.name }}</div>
          <time class="text-gray-700 text-xs">{{ comment.datePosted }}</time>
        </div>

        <p> {{ comment.content }} </p>
      </li>
    </ul>
      </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import { commentsCollection, auth } from '@/includes/firebase';

const CommentActionTypes = {
  COMMENT_DEFAULT: 'bg-blue-500',
  COMMENT_FAILURE: 'bg-red-500',
  COMMENT_SUCCESS: 'bg-green-500',
  COMMENT_MSG_DEFAULT: 'Your comment is being submitted. Please wait! ',
  COMMENT_MSG_FAILURE: 'There was an error submitting this comment. Please try again later.',
  COMMENT_MSG_SUCCESS: 'Success! Your comment has been submitted.',
};

export default {
  name: 'CommentsCard',
  data() {
    return {
      comments: [],
      comment_schema: {
        comment: 'required|min:3',
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: CommentActionTypes.COMMENT_DEFAULT,
      comment_alert_msg: CommentActionTypes.COMMENT_MSG_DEFAULT,
      sort: '1',
    };
  },
  props: {
    songID: {
      type: String,
      required: true,
    },
  },
  // can do this on create, but create will show page before data is loaded. Data will pop in
  // when using create, replace 'to' with 'this.$route'
  async mounted() {
    // to ensure props are populated, wait for the first tick after mounting
    this.$nextTick(() => {
      this.getComments();
    });
  },
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
    }),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        switch (this.sort) {
          case '1':
            return new Date(b.datePosted) - new Date(a.datePosted);

          case '2':
            return new Date(a.datePosted) - new Date(b.datePosted);

          default:
            return null;
        }
      });
    },
  },
  methods: {
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = CommentActionTypes.COMMENT_DEFAULT;
      this.comment_alert_msg = CommentActionTypes.COMMENT_MSG_DEFAULT;

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sid: this.songID,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(comment);

      this.getComments();

      this.comment_in_submission = false;
      this.comment_alert_variant = CommentActionTypes.COMMENT_SUCCESS;
      this.comment_alert_msg = CommentActionTypes.COMMENT_MSG_SUCCESS;
      resetForm();
    },
    async getComments() {
      const snapshots = await commentsCollection
        .where('sid', '==', this.songID).get();

      this.comments = [];

      snapshots.forEach((doc) => [
        this.comments.push({
          docID: doc.id,
          ...doc.data(),
        }),
      ]);
    },
  },
  watch: {
    // watch for song ID updates to fetch comments
    // eslint-disable-next-line no-unused-vars
    songID(newVal, oldVal) {
      this.getComments();
    },
  },
};
</script>
