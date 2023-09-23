<script setup>
import { ref } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

// importing images from the image folder
import bgimage from "../assets/images/bg-main-desktop.png";
import cardfront from "../assets/images/bg-card-front.png";
import cardback from "../assets/images/bg-card-back.png";
import cardlogo from "../assets/images/card-logo.svg";
import mobilebgimage from "../assets/images/bg-main-mobile.png";

let cardholder = ref("");
let cardnumber = ref("");
let exp = ref("");

let formData = ref({});

const saveFormData = () => {
  formData.value = {
    cardholder: cardholder.value,
    cardnumber: cardnumber.value,
    exp: exp.value,
  };
};

const rules = {
  cardholder: { required },
  cardnumber: { required, regex: /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/ },
  exp: { required, regex: /^(0[1-9]|1[0-2])\/\d{2}$/ },
};

const formatCardNumber = () => {
  cardnumber.value = cardnumber.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
};

const v$ = useVuelidate(rules, { cardholder, cardnumber, exp });

const validateForm = () => {
  v$.value.$touch();

  if (!v$.value.$error) {
    // If no errors, submit the form
    saveFormData();
    console.log("Form submitted");
  }
};
</script>

<template>
  
  <div class="h-screen w-full">
    <!-- mobile screen extreme top-side -->

    <div class="h-1/3 md:hidden w-full bg-cover bg-no-repeat" :style="{ backgroundImage: `url(${mobilebgimage})` }">
      <!-- nothingness -->
    </div>

    <div class="flex md:h-screen">
      <!-- Desktop screen extreme left-side -->
      <div class="md:w-1/4" :style="{ backgroundImage: `url(${bgimage})` }">
        <div class="absolute top-10 left-5 md:top-28 lg:left-28">
          <div
            class="mb-8 relative top-[6.7rem] right-[0.7rem] md:static z-[20] w-[320px] h-[180px] lg:w-[380px] lg:h-[220px] rounded-lg md:rounded-xl bg-no-repeat bg-cover"
            :style="{ backgroundImage: `url(${cardfront})` }"
          >
            <img v-bind:src="cardlogo" width="120" alt="cardLogo" class="px-6 py-6" />

            <!-- creating and populating a readonly form -->
            <form class=" lg:mt-7 ">
              <div class="flex items-center justify-center">
                <input
                  class="bg-transparent text-[1.5rem] lg:text-[1.6rem] text-[#ffffff] text-center font-semibold tracking-[.13em]"
                  v-model="formData.cardnumber"
                  readonly
                />
              </div>
              <div class="flex mt-4 mx-6 ">
                <div class="flex-1 px-2">
                  <input
                  type="text"
                  class="bg-transparent uppercase text-[10px] lg:text-xs tracking-wider text-[#ffffff] outline-none w-full h-full"
                  v-model="formData.cardholder"
                  readonly
                />
              </div>
              <div class="flex-1 px-2 flex">
                <input
                  type="text"
                  class="bg-transparent outline-none w-full h-full text-right  tracking-wider text-[10px] lg:text-xs text-[#ffffff]"
                  v-model="formData.exp"
                  readonly
                  />
                </div>
              </div>
            </form>
          </div>
          <div
            class="md:ml-10 lg:ml-20 w-[320px] relative -top-[13rem] left-10 md:static h-[180px] lg:w-[380px] lg:h-[220px] top-[2rem] rounded-lg md:rounded-xl bg-no-repeat bg-cover"
            :style="{ backgroundImage: `url(${cardback})` }"
          >
          <form class="">
            <input
                  type="text"
                  class="bg-transparent relative top-[4.7rem] lg:top-[6rem] right-[-8rem] lg:right-[-13rem] outline-none font-semibold text-right tracking-wider text-[11px] lg:text-xs text-[#ffffff]"
                  v-model="formData.exp"
                  readonly
                  />
          </form>
            
          </div>
        </div>
      </div>

      <!-- extreme centered-side -->
      <div
        class="w-full px-4 h-2/3 md:h-full md:w-3/4 bg-[#ffffff] mx-auto pt-[8rem] lg:pt-0 md:flex items-center justify-center"
      >
        <form
          @submit.prevent="validateForm"
          action=""
          method="post"
          class="w-full md:mx-80"
        >
          <div class="flex flex-col">
            <label
              for="cardholder"
              class="text-[var(--color-button)] tracking-widest uppercase font-bold text-[16px] md:text-[13px] mb-3"
              >cardholder name</label
            >
            <input
              type="text"
              v-model="cardholder"
              maxLength="50"
              placeholder="e.g Flamingo Community"
              class="border py-4 md:py-2 px-3 rounded-md font-bold text-lg md:text-sm outline-none text-[var(--color-button)]"
            />
            <p v-if="v$.cardholder.$error" class="text-xs font-semibold mt-2">
              Cardholder name is required
            </p>
          </div>
          <div class="flex flex-col">
            <label
              for="cardnumber"
              class="text-[var(--color-button)] uppercase font-bold tracking-widest text-[16px] md:text-[13px] mt-6 mb-3"
              >card number</label
            >
            <input
              v-model="cardnumber"
              @input="formatCardNumber"
              @change="$v.cardnumber.$touch()"
              maxLength="19"
              placeholder="e.g 1234 5678 9123 0000"
              class="border py-4 md:py-2 px-3 rounded-md font-bold text-lg md:text-sm outline-none text-[var(--color-button)]"
              />
            <p v-if="v$.cardnumber.$error" class="text-xs font-semibold mt-2">
              Wrong format, number only
            </p>
          </div>
          <div class="flex flex-col">
            <label
              for="cardholder"
              class="text-[var(--color-button)] uppercase font-bold text-[16px] tracking-widest md:text-[13px] mt-6 mb-3"
              >exp.date [mm/yy]</label
            >
            <input
              v-model="exp"
              type="month"
              class="border py-4 md:py-2 px-3 rounded-md font-bold text-lg md:text-sm outline-none text-[var(--color-button)]"
            />
            <p v-if="v$.exp.$error" class="text-xs font-semibold mt-2">
              Can't be blank
            </p>
          </div>
          <button
            type="submit"
            class="my-10 md:mt-12 w-full py-3 rounded-md text-[#ffffff] text-lg md:text-sm tracking-widest capitalize"
            style="background-color: var(--color-button)"
          >
            confirm
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* * {
  border: 1px solid green;
} */
::placeholder {
  color: var(--color-light);
  font-weight: 400;
}
p {
  color: hsl(0, 100%, 66%);
}
</style>
