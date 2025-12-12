<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import AlertDialog from "@/components/AlertDialog.vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";

// Helper function to calculate input size based on content
const getInputSize = (value: string | number | undefined) => {
  const str = String(value || "");
  // Add some padding (2-3 chars) for better appearance
  return Math.max(str.length);
};

// Edit mode state
const isEditMode = ref(false);

// Submit state
const isSubmitted = ref(false);
const isSubmitting = ref(false);

// Check if all required fields are filled
const isFormValid = computed(() => {
  const requiredFields = [
    formData.student.firstName,
    formData.student.fatherName,
    formData.student.idNumber,
    formData.student.birthPlace,
    formData.student.birthYear,
    formData.education.field,
    formData.education.entry,
    formData.education.degreeType,
    formData.education.semester,
    formData.education.academicYear,
    formData.certificate.recipient,
    formData.certificate.validityDate,
  ];

  return requiredFields.every((field) => {
    const value = String(field || "").trim();
    return value.length > 0;
  });
});

// Form data
const formData = reactive({
  header: {
    university: "دانشگاه آزاد اسلامی",
    unit: "واحد کرج",
    date: "۱۴۰۲/۱۱/۲۳",
    number: "۴۰۲/۱۱۵/۳۰۱",
    attachment: "۱۲۴۷-۳۵۹۳۷",
  },
  student: {
    code: "۴۰۲۷۲۱۸۶۱",
    firstName: "امیرمهدی زارعی نژاد",
    fatherName: "علی",
    idNumber: "۴۸۹۰۵۲۸۲۸۸",
    birthPlace: "ساوجبلاغ",
    birthYear: "۱۳۸۲",
    photoUrl: "https://placehold.co/113x151/333/ccc?text=Photo",
  },
  education: {
    field: "علوم کامپیوتر",
    entry: "نیمسال دوم سال تحصیلی ۱۴۰۳-۱۴۰۲",
    degreeType: "کارشناسی پیوسته",
    semester: "اول",
    academicYear: "۱۴۰۵-۱۴۰۴",
  },
  certificate: {
    recipient: "",
    validityDate: "۱۴۰۴/۱۱/۳۰",
  },
  signature: {
    title: "معاون آموزشی و مهارتی واحد دانشگاهی / رئیس دانشکده",
    name: "دکتر فاطمه برناکی",
  },
});

// Handle form submission
async function handleSubmit() {
  if (!isFormValid.value || isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    // Simulate HTTP request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success
    isSubmitted.value = true;
    isEditMode.value = false;
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    isSubmitting.value = false;
  }
}

function printPage() {
  window.print();
}
</script>

<template>
  <div class="relative">
    <AlertDialog />

    <div class="flex justify-center items-center pt-16 print:p-0 pb-10">
      <div
        class="w-[210mm] h-[297mm] bg-white mx-auto p-[4mm] relative shadow-[0_0_10px_rgba(0,0,0,0.1)] flex flex-col print:m-0 print:shadow-none print:w-full print:h-dvh print:p-0"
      >
        <div class="border-2 border-black w-full h-full flex flex-col p-6 relative grow">
          <!-- Header -->
          <header class="flex justify-between items-start mb-6">
            <div class="text-right w-1/3 font-bold text-sm space-y-1">
              <h1>{{ formData.header.university }}</h1>
              <h2>{{ formData.header.unit }}</h2>
            </div>

            <div class="w-1/3 flex flex-col items-center justify-center">
              <img src="@/assets/images/azad-logo.png" alt="Logo" width="60" class="grayscale" />
            </div>

            <div
              class="text-left w-1/3 text-xs space-y-1 *:flex *:justify-end *:gap-2 *:items-center"
            >
              <div>
                <strong>تاریخ:</strong>
                <span>{{ formData.header.date }}</span>
              </div>

              <div>
                <strong>شماره:</strong>
                <span>{{ formData.header.number }}</span>
              </div>

              <div>
                <strong>پیوست:</strong>
                <span>{{ formData.header.attachment }}</span>
              </div>
            </div>
          </header>

          <!-- Student Info Section -->
          <section class="relative w-full flex justify-between items-start">
            <div class="flex items-center gap-2 justify-start w-1/3 text-sm">
              <strong>کد دانشجو :</strong>
              <span>{{ formData.student.code }}</span>
            </div>

            <!-- Basme Ta'ala -->
            <div class="text-center w-1/3">
              <span class="font-bold">باسمه تعالی</span>
            </div>

            <div class="w-1/3 flex justify-end">
              <figure class="border w-[30mm] h-[40mm] border-neutral-400 p-1 bg-white grayscale">
                <img
                  :src="formData.student.photoUrl"
                  alt="Student Photo"
                  class="object-cover w-full h-full"
                />
              </figure>
            </div>
          </section>

          <div v-if="!isSubmitted" class="flex mb-6 -mt-10 relative z-10">
            <div dir="ltr" class="flex items-center space-x-2 border p-2 rounded-md">
              <Switch id="airplane-mode" v-model="isEditMode" />
              <Label for="airplane-mode">فعال کردن حالت قابل ویرایش</Label>
            </div>
          </div>

          <!-- Body Content -->
          <section class="text-xs font-medium px-2">
            <p class="font-bold text-sm mb-4">گواهی می شود :</p>

            <div :class="!isSubmitted ? 'leading-12' : 'leading-10'">
              آقای / خانم
              <Input
                v-if="!isSubmitted"
                v-model="formData.student.firstName"
                required
                class="input"
                :size="getInputSize(formData.student.firstName)"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
              />
              <span v-else class="display-value">{{ formData.student.firstName }}</span>
              فرزند
              <Input
                v-if="!isSubmitted"
                v-model="formData.student.fatherName"
                required
                class="input"
                :size="getInputSize(formData.student.fatherName)"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
              />
              <span v-else class="display-value">{{ formData.student.fatherName }}</span>
              شماره شناسنامه
              <Input
                v-if="!isSubmitted"
                v-model="formData.student.idNumber"
                required
                class="input"
                :size="getInputSize(formData.student.idNumber)"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
              />
              <span v-else class="display-value">{{ formData.student.idNumber }}</span>
              صادره از
              <Input
                v-if="!isSubmitted"
                v-model="formData.student.birthPlace"
                required
                class="input"
                :size="getInputSize(formData.student.birthPlace)"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
              />
              <span v-else class="display-value">{{ formData.student.birthPlace }}</span>
              متولد
              <Input
                v-if="!isSubmitted"
                v-model="formData.student.birthYear"
                required
                class="input"
                :size="getInputSize(formData.student.birthYear)"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
              />
              <span v-else class="display-value">{{ formData.student.birthYear }}</span>
              دانشجوی رشته
              <Input
                v-if="!isSubmitted"
                v-model="formData.education.field"
                required
                class="input"
                :size="getInputSize(formData.education.field)"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
              />
              <span v-else class="display-value">{{ formData.education.field }}</span>
              ورودی
              <Input
                v-if="!isSubmitted"
                v-model="formData.education.entry"
                required
                class="input"
                :size="getInputSize(formData.education.entry)"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
              />
              <span v-else class="display-value">{{ formData.education.entry }}</span>
              مقطع
              <Input
                v-if="!isSubmitted"
                v-model="formData.education.degreeType"
                required
                class="input"
                :size="getInputSize(formData.education.degreeType)"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
              />
              <span v-else class="display-value">{{ formData.education.degreeType }}</span>
              شیوه آموزش ............................... در این واحد دانشگاهی می باشد.
            </div>

            <div :class="!isSubmitted ? 'leading-12' : 'leading-10'">
              نامبرده در نیمسال
              <Input
                v-if="!isSubmitted"
                v-model="formData.education.semester"
                required
                class="input"
                :size="getInputSize(formData.education.semester)"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
              />
              <span v-else class="display-value">{{ formData.education.semester }}</span>
              سال تحصیلی
              <Input
                v-if="!isSubmitted"
                v-model="formData.education.academicYear"
                required
                class="input"
                :size="getInputSize(formData.education.academicYear)"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
              />
              <span v-else class="display-value">{{ formData.education.academicYear }}</span>
              ثبت نام نموده و اشتغال به تحصیل دارد .
            </div>

            <div :class="!isSubmitted ? 'leading-12' : 'leading-10'">
              این گواهی جهت ارائه به

              <Input
                v-if="!isSubmitted"
                v-model="formData.certificate.recipient"
                required
                class="input"
                :class="{
                  'border-brand-primary-500': !formData.certificate.recipient,
                }"
                :size="getInputSize(formData.certificate.recipient)"
              />
              <span v-else class="display-value">{{ formData.certificate.recipient }}</span>

              صادر شده و ارزش دیگری ندارد.
            </div>

            <div :class="!isSubmitted ? 'leading-12' : 'leading-10'">
              اعتبار این گواهی تا تاریخ
              <Input
                v-if="!isSubmitted"
                v-model="formData.certificate.validityDate"
                required
                class="input"
                :size="getInputSize(formData.certificate.validityDate)"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
              />
              <span v-else class="display-value">{{ formData.certificate.validityDate }}</span>
              می باشد .
            </div>
          </section>

          <section class="mt-4">
            <p class="font-bold text-sm">توضیحات :</p>
            <section class="h-28"></section>
          </section>

          <!-- Footer Signature -->
          <footer class="w-full flex justify-end">
            <div class="text-center">
              <p class="font-medium mb-2 text-sm">
                {{ formData.signature.title }}
              </p>
              <p class="font-bold mb-4">{{ formData.signature.name }}</p>
              <p
                class="text-neutral-400 text-xs border-t border-dashed border-neutral-300 pt-2 w-40 mx-auto"
              >
                (محل امضا و مهر)
              </p>
            </div>
          </footer>

          <div class="mt-auto flex gap-3 justify-end print-hidden">
            <!-- Submit Button -->
            <template v-if="!isSubmitted">
              <Button
                variant="default"
                size="lg"
                class="text-base"
                :disabled="!isFormValid || isSubmitting"
                @click="handleSubmit"
              >
                <Icon v-if="!isSubmitting" icon="mynaui:save-solid" class="size-6" />
                <Icon v-else icon="gg:spinner" class="size-6 animate-spin" />
                {{ isSubmitting ? "در حال ثبت..." : "ثبت اطلاعات" }}
              </Button>
            </template>

            <template v-else>
              <!-- Edit Button -->
              <Button
                variant="secondary"
                size="lg"
                class="text-base border-2"
                @click="
                  () => {
                    isSubmitted = false;
                    isEditMode = true;
                  }
                "
              >
                <Icon icon="mdi:pencil" class="size-6" />
                ویرایش
              </Button>

              <!-- Print Button -->
              <Button variant="default" size="lg" class="text-base" @click="printPage">
                <Icon icon="mdi:printer" class="size-6" />
                چاپ
              </Button>
            </template>
          </div>

          <figure class="absolute bottom-5 start-5">
            <img width="150" src="@/assets/images/qr-test.jpg" alt="test qr" />
          </figure>

          <!-- Corner Decorations -->
          <div
            class="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-black opacity-30"
          ></div>
          <div
            class="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-black opacity-30"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

@media print {
  body {
    background: none;
  }
  button {
    display: none !important;
  }
  .print-hidden {
    display: none !important;
  }
}

.input {
  @apply w-auto min-w-0 mx-1 font-bold;
}

.display-value {
  @apply font-bold text-sm mx-1;
}
</style>
