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
                            <template v-if="!isSubscribed && !isSharing">
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

                                <form autocomplete="on" class="mt-4 flex flex-col gap-3"
                                    @submit.prevent="validateAndSubscribe">
                                    <input type="text" id="firstName" placeholder="First Name" v-model="firstName"
                                        ref="inputRef"
                                        :class="[!isFirstNameValid ? 'border-red-500 border-2' : 'border-slate-300']"
                                        class="w-full border rounded-md px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200" />
                                    <input type="text" id="lastName" placeholder="Surname" v-model="lastName"
                                        :class="[!isLastNameValid ? 'border-red-500 border-2' : 'border-slate-300']"
                                        class="w-full border rounded-md px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200" />
                                    <input type="email" id="email" placeholder="Email" v-model="email"
                                        :class="[!isEmailValid ? 'border-red-500 border-2' : 'border-slate-300']"
                                        class="w-full border rounded-md px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200" />

                                    <div v-if="!isFormValid" class="text-red-500 text-center">Please fill in all fields
                                        correctly.</div>

                                    <div class="mt-4 flex gap-3">
                                        <button type="submit" :disabled="isSubscribing"
                                            class="w-full rounded-md bg-secondary/20 px-4 py-3 text-sm text-secondary font-bold hover:bg-secondary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200">
                                            <span v-if="!isSubscribing">Subscribe Now</span>
                                            <span v-else class="loader"></span>
                                        </button>
                                        <button @click.prevent="isSharing = true"
                                            class="w-full max-w-[60px] rounded-md text-center px-4 py-3 text-sm text-slate-900 bg-gray-300/30 hover:bg-gray-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </template>
                            <template v-else-if="!isSubscribed && isSharing">
                                <div class="flex justify-between">
                                    <DialogTitle as="h3" class="text-lg font-bold leading-6 text-gray-900">
                                        Spread the News!
                                    </DialogTitle>
                                    <button type="button" @click="closeModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="mt-2">
                                    <div class="my-10" v-if="!isQRLoaded"><span class="loader"></span></div>
                                    <img src="../assets/images/qr-code.webp" alt="QR Code" @load="isQRLoaded = true">
                                </div>
                                <div class="mt-4 flex flex-col gap-3">
                                    <button @click="copyLink"
                                        class="w-full rounded-md bg-secondary/20 px-4 py-3 text-sm text-secondary font-bold hover:bg-secondary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200">
                                        <span v-if="!linkCopied" class="flex gap-2 items-center justify-center"><svg
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                            </svg>
                                            Copy Link</span>
                                        <span v-else class="flex gap-2 items-center justify-center"><svg
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            Link Successfully
                                            Copied</span>
                                    </button>
                                    <button type="button" @click="isSharing = false"
                                        class="flex gap-3 items-center justify-center w-full rounded-md px-4 py-3 text-sm font-bold text-slate-900 bg-gray-300/30 hover:bg-gray-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6 -ml-3">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                        </svg>
                                        Back
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
                                        class="w-full rounded-md bg-secondary/20 px-4 py-3 text-sm text-secondary font-bold hover:bg-secondary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200">
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
import { ref, computed, onMounted, nextTick } from 'vue'
import axios from 'axios';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

const props = defineProps(['url'])

onMounted(() => {
    if (props.url.href.split('?')[1] == 'newsletter') {
        isOpen.value = true;
        nextTick(() => {
            inputRef.value.focus()
        })
    }
})

const inputRef = ref(null);
const isOpen = ref(false)
const firstName = ref('')
const lastName = ref('')
const email = ref('')

const linkCopied = ref(false);
const isQRLoaded = ref(false)
const isSharing = ref(false);
const isSubscribing = ref(false);
const isSubscribed = ref(null);
const isFirstNameValid = ref(true);
const isLastNameValid = ref(true);
const isEmailValid = ref(true);
const isFormValid = computed(() => isFirstNameValid.value && isLastNameValid.value && isEmailValid.value);

function validateAndSubscribe() {
    isFirstNameValid.value = !!firstName.value.trim();
    console.log(isFirstNameValid.value)
    isLastNameValid.value = !!lastName.value.trim();
    isEmailValid.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);

    if (isFormValid.value) {
        subscribe();
    }
}

function closeModal() {
    isOpen.value = false
}

function openModal() {
    isSharing.value = false
    isOpen.value = true

    if (!isSubscribing.value) {
        isFirstNameValid.value = true;
        isLastNameValid.value = true;
        isEmailValid.value = true;
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        isSubscribed.value = null;

        nextTick(() => {
            inputRef.value.focus()
        })
    }
}

async function subscribe() {
    isSubscribing.value = true;

    await axios.post('/api/sendgrid', {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value
    }).then(() => {
        isSubscribed.value = true;
    }).catch(() => {
        subscribe.value = false;
    })

    isSubscribing.value = false;
}

function copyLink() {
    linkCopied.value = true;

    navigator.clipboard.writeText('https://www.diiponeacademy.co.za/?newsletter');

    setTimeout(() => {
        linkCopied.value = false;
    }, 3000)
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