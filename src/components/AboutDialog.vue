<template>
    <button type="button" @click="openModal"
        class="pulse px-4 py-3 rounded-md shadow-sm text-base text-white bg-secondary font-bold duration-200">Learn
        More</button>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/80" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <div class="flex justify-between">
                                <DialogTitle as="h3" class="text-2xl font-bold leading-6 text-gray-900">
                                    What we're all about
                                </DialogTitle>
                                <button type="button" @click="closeModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div class="mt-5 text-gray-700 flex flex-col gap-5">
                                <p>
                                    At Diipone Academy, we believe that education is the beacon that illuminates the path to
                                    a brighter future. Named after the Setswana word for "shining light," Diipone Academy is
                                    on a mission to make quality education accessible and affordable to every child.
                                </p>
                                <p>
                                    Our initial focus is on Grade 8, utilizing the nationally recognized CAPS Curriculum to
                                    ensure a robust foundation for our students. We understand the challenges many families
                                    face in providing education to their children, whether it be due to financial
                                    constraints or geographical barriers. Diipone Academy is here to bridge that gap and
                                    bring the light of knowledge to those who need it the most.
                                </p>
                                <p>
                                    What sets us apart is our commitment to embracing cutting-edge technology in education.
                                    Beyond the innovative AI Chatbuddy that provides personalized support and guidance, we
                                    are actively implementing other breakthrough technologies to enhance the learning
                                    experience for our students.
                                </p>
                                <p>
                                    South Africa, with its rich diversity and potential, is at the heart of our initiative.
                                    By leveraging technology and embracing innovation, we aim to create a learning
                                    environment that transcends limitations and opens doors to endless possibilities for our
                                    students.
                                </p>
                                <p>
                                    Join us in this exciting journey as we prepare to launch Diipone Academy. Together,
                                    let's illuminate minds, inspire dreams, and pave the way for a brighter, more inclusive
                                    future. Stay tuned for updates as we work towards making quality education, enhanced by
                                    cutting-edge technology, a reality for all.
                                </p>
                            </div>

                            <div class="mt-4 flex gap-3">
                                <button type="button" @click="closeModal"
                                    class="w-full rounded-md border border-transparent bg-secondary/20 px-4 py-3 text-sm text-secondary font-bold hover:bg-secondary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 duration-200">
                                    Awesome!
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { ref } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(false)

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}
</script>
  

<style>
.pulse {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 #f3834099;
    }

    70% {
        box-shadow: 0 0 0 10px #f3834000;
    }

    100% {
        box-shadow: 0 0 #f3834000;
    }
}
</style>