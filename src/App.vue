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

  const { transitionRef, transitionBackgroundRef, transitionArrowRef } =
    theTransitionRef.value;

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(transitionRef, {
        autoAlpha: 0,
      });
      done();
    },
  });

  tl.set(transitionBackgroundRef, {
    opacity: 1,
  })
    .set(transitionArrowRef, {
      x: '-33.33333%',
    })
    .to(transitionArrowRef, {
      x: '33.33333%',
      duration: 0.75,
    })
    .to(
      transitionBackgroundRef,
      {
        opacity: 0,
        duration: 0.5,
      },
      0.25
    );
}

function onLeave(el, done) {
  isNewPage.value = true;

  const { transitionRef, transitionBackgroundRef, transitionArrowRef } =
    theTransitionRef.value;

  const tl = gsap.timeline({
    onComplete: () => {
      window.scrollTo(0, 0);
      done();
    },
  });

  tl.set(transitionRef, {
    autoAlpha: 1,
  })
    .set(transitionBackgroundRef, {
      opacity: 0,
    })
    .set(transitionArrowRef, {
      x: '-100%',
    })
    .to(transitionBackgroundRef, {
      opacity: 1,
      duration: 0.5,
    })
    .to(
      transitionArrowRef,
      {
        x: '-33.33333%',
        duration: 0.75,
      },
      0
    );
}

onMounted(() => {
  if (auth.currentUser) {
    isLoggedIn.value = true;
  }

  const { loadingRef, loadingWaveRef, loadingLogoRef } = theLoadingRef.value;

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(loadingRef, {
        autoAlpha: 0,
      });
    },
  });

  tl.set(loadingWaveRef, {
    attr: {
      d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z',
    },
  })
    .to(loadingLogoRef, {
      y: '-100',
      opacity: 0,
      duration: 0.6,
      delay: 1,
      ease: 'power3.in',
    })
    .to(
      loadingWaveRef,
      {
        duration: 0.6,
        attr: {
          d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z',
        },
        ease: 'power3.in',
      },
      1
    )
    .to(loadingWaveRef, {
      duration: 0.6,
      attr: {
        d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z',
      },
      ease: 'power3',
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
