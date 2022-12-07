<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import gsap from 'gsap';
import TheLoading from '@/components/TheLoading.vue';
import TheBackground from '@/components/TheBackground.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheTransition from '@/components/TheTransition.vue';
import SongPlayer from '@/components/SongPlayer.vue';
import AuthModal from '@/components/AuthModal.vue';

const isNewPage = ref(false);
const theLoadingRef = ref(null);
const theTransitionRef = ref(null);
const theBackgorundRef = ref(null);

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
  const { loadingRef, loadingArrowRef, loadingLogoRef } = theLoadingRef.value;
  const { characterRef } = theBackgorundRef.value;

  const tl = gsap.timeline();

  tl.set(loadingArrowRef, {
    x: '-50%',
  })
    .set(loadingLogoRef, {
      opacity: 0,
      y: 60,
    })
    .set(characterRef, {
      y: '100%',
      rotate: 1440,
    })
    .to(loadingLogoRef, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      delay: 0.5,
      ease: 'power3',
    })
    .to(loadingLogoRef, {
      opacity: 0,
      y: -100,
      duration: 1,
      ease: 'power3.in',
    })
    .to(loadingArrowRef, {
      x: '50%',
      duration: 0.75,
      onComplete: () => {
        gsap.set(loadingRef, {
          autoAlpha: 0,
        });
      },
    })
    .to(
      characterRef,
      {
        y: 0,
        rotate: '0',
        duration: 2.5,
        ease: 'power3',
      },
      3
    );
});
</script>

<template>
  <TheLoading ref="theLoadingRef" />

  <TheBackground ref="theBackgorundRef" />

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
