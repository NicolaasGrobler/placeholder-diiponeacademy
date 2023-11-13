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
                            <DialogTitle as="h3" class="text-lg font-bold leading-6 text-gray-900">
                                Subscribe to Newsletter
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    We will ensure to provide regular updates regarding our upcoming launch and the noteworthy developments within our initiative.
                                </p>
                            </div>

                            <form autocomplete="on" class="mt-4 flex flex-col gap-3">
                                <input type="text" id="name" placeholder="First Name" class="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 duration-200"/>
                                <input type="text" id="surname" placeholder="Surname" class="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 duration-200"/>
                                <input type="email" id="email" placeholder="Email" class="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 duration-200"/>
                            </form>

                            <div class="mt-4 flex gap-3">
                                <button type="button"
                                    class="w-full rounded-md border border-transparent bg-secondary/20 px-4 py-3 text-sm text-secondary font-bold hover:bg-secondary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 duration-200">
                                    Subscribe Now
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
  