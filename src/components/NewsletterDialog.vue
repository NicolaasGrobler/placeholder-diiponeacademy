<template>
    <button type="button" @click="openModal"
        class="px-4 py-3 rounded-md shadow-sm text-base font-medium text-white bg-white/30 hover:bg-white/50 duration-200">Newsletter</button>
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
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <template v-if="!subscribed">
                                <div class="flex justify-between">
                                    <DialogTitle as="h3" class="text-lg font-bold leading-6 text-gray-900">
                                        Subscribe to Newsletter
                                    </DialogTitle>
                                    <button type="button" @click="closeModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        We will ensure to provide regular updates regarding our upcoming launch and the
                                        noteworthy developments within our initiative.
                                    </p>
                                </div>

                                <form autocomplete="on" class="mt-4 flex flex-col gap-3">
                                    <input type="text" id="firstName" placeholder="First Name" v-model="firstName"
                                        class="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 duration-200" />
                                    <input type="text" id="lastName" placeholder="Surname" v-model="lastName"
                                        class="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 duration-200" />
                                    <input type="email" id="email" placeholder="Email" v-model="email"
                                        class="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 duration-200" />
                                </form>

                                <div class="mt-4 flex gap-3">
                                    <button type="button" @click="subscribe" :disabled="subscribing"
                                        class="w-full rounded-md border border-transparent bg-secondary/20 px-4 py-3 text-sm text-secondary font-bold hover:bg-secondary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200">
                                        <span v-if="!subscribing">Subscribe Now</span>
                                        <span v-else class="loader"></span>
                                    </button>
                                </div>
                            </template>
                            <template v-else>
                                <div class="flex justify-between">
                                    <DialogTitle as="h3" class="text-lg font-bold leading-6 text-gray-900">
                                        Successfully Subcribed!
                                    </DialogTitle>
                                    <button type="button" @click="closeModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        You will be the first to find out about our
                                        noteworthy developments within our initiative as well as when we launch.
                                    </p>
                                </div>
                                <div class="mt-4 flex gap-3">
                                    <button type="button" @click="closeModal"
                                        class="w-full rounded-md border border-transparent bg-secondary/20 px-4 py-3 text-sm text-secondary font-bold hover:bg-secondary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200">
                                        Awesome!
                                    </button>
                                </div>
                            </template>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { ref } from 'vue'
import axios from 'axios';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(false)
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const subscribing = ref(false);
const subscribed = ref(null);

function closeModal() {
    isOpen.value = false
}

function openModal() {
    if (!subscribing.value) {
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        subscribed.value = null;
    }
    isOpen.value = true
}

async function subscribe() {
    subscribing.value = true;

    await axios.post('/api/sendgrid', {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value
    }).then(() => {
        subscribed.value = true;
    }).catch(() => {
        subscribe.value = false;
    })

    subscribing.value = false;
}
</script>
  
<style>
.loader {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    margin: 5px auto;
    position: relative;
    color: #FFF;
    left: -100px;
    box-sizing: border-box;
    animation: shadowRolling 2s linear infinite;
}

@keyframes shadowRolling {
    0% {
        box-shadow: 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
    }

    12% {
        box-shadow: 100px 0 #F38340, 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
    }

    25% {
        box-shadow: 110px 0 #F38340, 100px 0 #F38340, 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
    }

    36% {
        box-shadow: 120px 0 #F38340, 110px 0 #F38340, 100px 0 #F38340, 0px 0 rgba(255, 255, 255, 0);
    }

    50% {
        box-shadow: 130px 0 #F38340, 120px 0 #F38340, 110px 0 #F38340, 100px 0 #F38340;
    }

    62% {
        box-shadow: 200px 0 rgba(255, 255, 255, 0), 130px 0 #F38340, 120px 0 #F38340, 110px 0 #F38340;
    }

    75% {
        box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 130px 0 #F38340, 120px 0 #F38340;
    }

    87% {
        box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 130px 0 #F38340;
    }

    100% {
        box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0);
    }
}
</style>