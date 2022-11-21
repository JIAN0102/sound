<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { storeToRefs } from 'pinia';
import { auth } from '@/plugins/firebase';
import { useUserStore } from '@/stores/user';
import gsap from 'gsap';
import TheLoading from '@/components/TheLoading.vue';
import TheBackground from '@/components/TheBackground.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheTransition from '@/components/TheTransition.vue';
import SongPlayer from '@/components/SongPlayer.vue';
import AuthModal from '@/components/AuthModal.vue';

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

const isNewPage = ref(false);
const theLoadingRef = ref(null);
const theTransitionRef = ref(null);

function onEnter(el, done) {
  if (!isNewPage.value) return;

  const {
    transitionRef,
    transitionOverlayRef,
    transitionArrowFrontRef,
    transitionArrowBackRef,
  } = theTransitionRef.value;

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(transitionRef, {
        autoAlpha: 0,
      });
      done();
    },
  });

  tl.set(transitionOverlayRef, {
    x: '0',
  })
    .set(transitionArrowFrontRef, {
      x: '100%',
    })
    .set(transitionArrowBackRef, {
      x: '-100%',
    })
    .to([transitionOverlayRef, transitionArrowBackRef], {
      x: '100%',
      duration: 0.85,
    });
}

function onLeave(el, done) {
  isNewPage.value = true;

  const {
    transitionRef,
    transitionOverlayRef,
    transitionArrowFrontRef,
    transitionArrowBackRef,
  } = theTransitionRef.value;

  const tl = gsap.timeline({
    onComplete: () => {
      window.scrollTo(0, 0);
      done();
    },
  });

  tl.set(transitionRef, {
    autoAlpha: 1,
  })
    .set(
      [transitionOverlayRef, transitionArrowFrontRef, transitionArrowBackRef],
      {
        x: '-100%',
      }
    )
    .to(transitionOverlayRef, {
      x: 0,
      duration: 0.85,
    })
    .to(
      transitionArrowFrontRef,
      {
        x: '100%',
        duration: 0.85,
      },
      0
    );
}

onMounted(() => {
  if (auth.currentUser) {
    isLoggedIn.value = true;
  }

  const { loadingRef, loadingOverlayRef, loadingArrowRef } =
    theLoadingRef.value;

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(loadingRef, {
        autoAlpha: 0,
      });
    },
  });

  tl.set(loadingArrowRef, {
    x: '-100%',
  }).to([loadingOverlayRef, loadingArrowRef], {
    x: '100%',
    duration: 1,
    delay: 1,
  });
});
</script>

<template>
  <TheLoading ref="theLoadingRef" />

  <TheBackground />

  <TheHeader />

  <main class="rel">
    <RouterView v-slot="{ Component, route }">
      <Transition mode="out-in" :css="false" @enter="onEnter" @leave="onLeave">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>

  <SongPlayer />

  <AuthModal />

  <TheTransition ref="theTransitionRef" />
</template>
