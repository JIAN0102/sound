<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import {
  query,
  where,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { auth, songsCollection, commentsCollection } from '@/plugins/firebase';
import { useUserStore } from '@/stores/user';
import { usePlayerStore } from '@/stores/player';
import BaseCard from '@/components/BaseCard.vue';

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

const playerStore = usePlayerStore();
const { createSong } = playerStore;

const song = ref({});
const submission = ref(false);
const showAlert = ref(false);
const alertVarient = ref('');
const alertMessage = ref('');

const comments = ref([]);
const sort = ref('1');
const sortedComments = computed(() =>
  comments.value.slice().sort((a, b) => {
    if (sort.value === '1') {
      return new Date(b.datePosted) - new Date(a.datePosted);
    }
    return new Date(a.datePosted) - new Date(b.datePosted);
  })
);

async function getComments() {
  const q = query(commentsCollection, where('songID', '==', route.params.id));
  const snapshots = await getDocs(q);

  comments.value = [];

  snapshots.forEach((document) => {
    comments.value.push({
      ...document.data(),
      docID: document.id,
    });
  });
}

async function deleteComment(docID) {
  await deleteDoc(doc(commentsCollection, docID));

  song.value.commentCount -= 1;

  await updateDoc(doc(songsCollection, route.params.id), {
    commentCount: song.value.commentCount,
  });

  getComments();
}

async function onSubmit(values, { resetForm }) {
  submission.value = true;
  showAlert.value = true;
  alertVarient.value = 'bg:blue';
  alertMessage.value = '送出中，請稍後';

  const comment = {
    content: values.comment,
    datePosted: new Date().toString(),
    songID: route.params.id,
    name: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
  };

  await addDoc(commentsCollection, comment);

  song.value.commentCount += 1;

  await updateDoc(doc(songsCollection, route.params.id), {
    commentCount: song.value.commentCount,
  });

  submission.value = false;
  showAlert.value = true;
  alertVarient.value = 'bg:green';
  alertMessage.value = '已送出評論';

  resetForm();

  getComments();
}

onMounted(async () => {
  const snapshot = await getDoc(doc(songsCollection, route.params.id));

  if (!snapshot.exists()) {
    router.push({
      name: 'home',
    });
    return;
  }

  song.value = snapshot.data();

  getComments();
});
</script>

<template>
  <div class="grid-cols:1 gap:30|40 p:100|0|210 p:180|80|210@md grid-cols:2@lg">
    <div>
      <BaseCard>
        <template #header>
          <h1 class="f:bold f:24 fg:white t:center f:28@md">
            {{ song.modifiedName }}
          </h1>
        </template>

        <template #main>
          <div
            class="rel grid-cols:3 t:center {content:'';abs;top:1/2;left:0;w:3;h:30;bg:#777;translateY(-50%)}>div~div::before"
          >
            <div class="rel">
              <span class="f:12 fg:#777 f:16@md">上傳者</span>
              <h3 class="mt:4 f:bold fg:white f:24@md">
                {{ song.displayName }}
              </h3>
            </div>
            <div class="rel">
              <span class="f:12 fg:#777 f:16@md">曲風</span>
              <h3 class="mt:4 f:bold fg:white f:24@md">{{ song.genre }}</h3>
            </div>
            <div class="rel">
              <span class="f:12 fg:#777 f:16@md">評論數</span>
              <h3 class="mt:4 f:bold fg:white f:24@md">
                {{ song.commentCount }}
              </h3>
            </div>
          </div>
          <button
            class="group rel w:full mt:20 mt:30@md"
            type="button"
            @click.prevent="createSong(song)"
          >
            <div
              class="abs top:1/2 left:1/2 full bg:linear-gradient(to|right,primary,secondary) rounded translate(-50%,-50%) .group:hover_{animation:bounce|1s|infinite}"
            ></div>
            <div class="rel flex center-content h:60">
              <span
                class="abs top:1/2 left:14 w:32 h:32 bg:black rounded translateY(-50%)"
              ></span>
              <span class="f:bold f:18">播放音樂</span>
            </div>
          </button>
        </template>
      </BaseCard>
    </div>

    <div>
      <BaseCard>
        <template #header>
          <h2 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
            撰寫評論
          </h2>
        </template>

        <template #main>
          <div class="rel">
            <select
              v-model="sort"
              class="block w:full h:60 px:30 fg:white bg:black rounded outline:0 appearance:none b:#777:focus"
            >
              <option value="1">評論 (由新到舊)</option>
              <option value="2">評論 (由舊到新)</option>
            </select>
          </div>
          <div class="rel mt:20">
            <div
              v-if="showAlert"
              class="p:16 f:bold fg:white t:center"
              :class="alertVarient"
            >
              {{ alertMessage }}
            </div>
            <VForm v-if="isLoggedIn" @submit="onSubmit">
              <VField
                class="block w:full h:200 p:30 fg:white bg:black r:30 outline:0 resize:none b:#777:focus fg:#777::placeholder"
                placeholder="發表你對這首歌的感受吧！"
                as="textarea"
                name="comment"
                rules="required"
              />
              <ErrorMessage
                v-slot="{ message }"
                class="rel flex ai:center gap-x:6 mt:8"
                as="div"
                name="comment"
              >
                <span
                  class="flex center-content w:16 h:16 f:12 fg:white bg:#ee2828 round"
                  >!</span
                >
                <p class="f:13 fg:#ee2828">{{ message }}</p>
              </ErrorMessage>
              <div
                class="abs bottom:0 left:1/2 flex w:240 h:60 overflow:hidden bg:black b:3|solid|#333 rounded translate(-50%,50%) {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#333;translate(-50%,-50%)}::before"
              >
                <button
                  class="flex center-content w:1/2 h:full fg:white bg:white/.1:hover"
                  type="submit"
                  :disabled="submission"
                >
                  送出
                </button>
                <button
                  class="flex center-content w:1/2 h:full fg:white bg:white/.1:hover"
                  type="reset"
                  :disabled="submission"
                >
                  清空
                </button>
              </div>
            </VForm>
            <div v-else class="fg:white">登入會員才能發表評論</div>
          </div>
          <div class="mt:50>div:first mt:20>div~div">
            <div
              v-for="comment in sortedComments"
              :key="comment.docID"
              class="rel p:30 bg:black r:30"
            >
              <button
                class="abs top:20 right:20 f:12 fg:white"
                type="button"
                @click="deleteComment(comment.docID)"
              >
                刪除
              </button>
              <div class="flex ai:flex-end gap-x:8">
                <h3 class="f:bold fg:white f:18@md">{{ comment.name }}</h3>
                <span class="f:12 fg:#777 f:14@md">
                  {{ comment.datePosted }}
                </span>
              </div>
              <div class="mt:20 f:14 fg:white lh:1.75 f:16@md">
                <p>{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>
