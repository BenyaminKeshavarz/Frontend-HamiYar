<script setup lang="ts">
import { reactive } from "vue";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormViewLayout from "@/components/FormViewLayout.vue";
import { useFormSubmission } from "@/composables/useFormSubmission";
import { getInputSize } from "@/utils/formUtils";
import { siteConfig } from "@/config";
import { Icon } from "@iconify/vue";


// Form data
const formData = reactive({
  header: {
    get university() {
      return siteConfig.university.name;
    },
    get unit() {
      return siteConfig.university.unit;
    },
    date: "1404/10/07",
    number: "14041008-101",
    attachment: "-",
  },
  student: {
    code: "402715830",
    fullName: "",
    fatherName: "",
    idNumber: "",
    birthPlace: "",
    birthYear: "",
    photoUrl: "",
  },
  education: {
    field: "",
    degreeType: "",
    method: "",
    entrySemester: "",
    entryAcademicYear: "",
    currentSemester: "",
    currentAcademicYear: "",
  },
  certificate: {
    recipient: "",
    validityDate: "",
  },
  description: "",
  signature: {
    title: "معاون آموزشی و مهارتی واحد دانشگاهی",
    name: "دکتر فاطمه برناکی",
    imageUrl: ""
  },
});

// Form validation function
function validateForm() {
  const requiredFields = [
    formData.student.fullName,
    formData.student.fatherName,
    formData.student.idNumber,
    formData.student.birthPlace,
    formData.student.birthYear,
    formData.education.field,
    formData.education.degreeType,
    formData.education.method,
    formData.education.entrySemester,
    formData.education.entryAcademicYear,
    formData.education.currentSemester,
    formData.education.currentAcademicYear,
    formData.certificate.recipient,
    formData.certificate.validityDate,
  ];

  return requiredFields.every((field) => {
    const value = String(field || "").trim();
    return value.length > 0;
  });
}

// Use form submission composable
const { isEditMode, isSubmitted, isSubmitting, isFormValid, handleSubmit, printPage, resetForm } =
  useFormSubmission(validateForm);
</script>

<template>
  <FormViewLayout v-model:is-edit-mode="isEditMode" :is-submitted="isSubmitted" :is-submitting="isSubmitting"
    :is-form-valid="isFormValid" @submit="handleSubmit" @edit="resetForm" @print="printPage">
    <!-- Header -->
    <template #header>
      <header class="flex justify-between items-start mb-6">
        <div class="text-right w-1/3 font-bold text-sm space-y-1">
          <h1>{{ formData.header.university }}</h1>
          <h2>{{ formData.header.unit }}</h2>
        </div>

        <div class="w-1/3 flex flex-col items-center justify-center">
          <img src="@/assets/images/azad-logo.png" alt="Logo" width="60" class="grayscale" />
        </div>

        <div class="text-left w-1/3 text-xs space-y-1 *:flex *:justify-end *:gap-2 *:items-center">
          <div>
            <strong>تاریخ:</strong>
            <span>{{ formData.header.date }}</span>
          </div>

          <div>
            <strong>شماره:</strong>
            <span dir="ltr">{{ formData.header.number }}</span>
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

        <div class="text-center w-1/3">
          <span class="font-bold">باسمه تعالی</span>
        </div>

        <div class="w-1/3 flex justify-end">
          <figure class="border w-[30mm] h-[40mm] border-neutral-400 p-1 bg-white grayscale">
            <!-- <img :src="formData.student.photoUrl" alt="Student Photo" class="object-cover w-full h-full" /> -->
            <div class="w-full h-full bg-neutral-700 flex-center">
              <Icon icon="material-symbols:person-rounded" class="text-white" width="60" height="60" />
            </div>
          </figure>
        </div>
      </section>
    </template>

    <!-- Body Content -->
    <template #body>
      <section class="text-xs font-medium px-2">
        <p class="font-bold text-sm mb-4">گواهی می شود :</p>

        <section :class="!isSubmitted ? 'leading-12' : 'leading-10'">
          آقای / خانم
          <!-- Fullname -->
          <Input v-if="!isSubmitted" v-model="formData.student.fullName" required :highlight="isEditMode" class="input"
            placeholder="نام و نام خانوادگی" :size="getInputSize(formData.student.fullName)" :disabled="!isEditMode"
            :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.student.fullName }}</span>

          فرزند
          <!-- Father Name -->
          <Input v-if="!isSubmitted" v-model="formData.student.fatherName" required :highlight="isEditMode"
            class="input" placeholder="نام پدر" :size="getInputSize(formData.student.fatherName, 5)"
            :disabled="!isEditMode" :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.student.fatherName }}</span>

          شماره شناسنامه
          <!-- ID Number -->
          <Input v-if="!isSubmitted" v-model="formData.student.idNumber" required :highlight="isEditMode" class="input"
            placeholder="شماره شناسنامه" maxlength="10" numeric :size="getInputSize(formData.student.idNumber, 10)"
            :disabled="!isEditMode" :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.student.idNumber }}</span>

          صادره از
          <!-- Birth Place -->
          <Input v-if="!isSubmitted" v-model="formData.student.birthPlace" required :highlight="isEditMode"
            class="input" placeholder="محل تولد" :size="getInputSize(formData.student.birthPlace, 5)"
            :disabled="!isEditMode" :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.student.birthPlace }}</span>

          متولد
          <!-- Birth Year -->
          <Input v-if="!isSubmitted" v-model="formData.student.birthYear" required :highlight="isEditMode" class="input"
            placeholder="سال تولد" :size="getInputSize(formData.student.birthYear, 5)" :disabled="!isEditMode"
            :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.student.birthYear }}</span>

          دانشجوی رشته
          <!-- Education Field -->
          <Input v-if="!isSubmitted" v-model="formData.education.field" required :highlight="isEditMode" class="input"
            placeholder="رشته تحصیلی" :size="getInputSize(formData.education.field, 10)" :disabled="!isEditMode"
            :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.education.field }}</span>

          ورودی نیمسال
          <!-- Entry Semester -->
          <Input v-if="!isSubmitted" v-model="formData.education.entrySemester" required :highlight="isEditMode"
            class="input" placeholder="اول" :size="getInputSize(formData.education.entrySemester, 3)"
            :disabled="!isEditMode" :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.education.entrySemester }}</span>


          سال تحصیلی
          <!-- Entry Academic Year -->
          <Input v-if="!isSubmitted" v-model="formData.education.entryAcademicYear" required :highlight="isEditMode"
            class="input" placeholder="1402-1403" :size="getInputSize(formData.education.entryAcademicYear, 8)"
            :disabled="!isEditMode" :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.education.entryAcademicYear }}</span>

          مقطع
          <!-- Degree Type -->
          <Input v-if="!isSubmitted" v-model="formData.education.degreeType" required :highlight="isEditMode"
            class="input" placeholder="مقطع تحصیلی" :size="getInputSize(formData.education.degreeType, 10)"
            :disabled="!isEditMode" :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.education.degreeType }}</span>

          شیوه آموزش
          <!-- Education Method -->
          <Input v-if="!isSubmitted" v-model="formData.education.method" required :highlight="isEditMode" class="input"
            placeholder="پاره وقت" :size="getInputSize(formData.education.method, 6)" :disabled="!isEditMode"
            :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.education.method }}</span>

          در این واحد دانشگاهی می باشد.
        </section>

        <section :class="!isSubmitted ? 'leading-12' : 'leading-10'">
          نامبرده در نیمسال
          <!-- Current Semester -->
          <Input v-if="!isSubmitted" v-model="formData.education.currentSemester" required :highlight="isEditMode"
            class="input" placeholder="دوم" :size="getInputSize(formData.education.currentSemester, 3)"
            :disabled="!isEditMode" :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.education.currentSemester }}</span>

          سال تحصیلی
          <!-- Current Academic Year -->
          <Input v-if="!isSubmitted" v-model="formData.education.currentAcademicYear" required :highlight="isEditMode"
            class="input" placeholder="1404-1405" :size="getInputSize(formData.education.currentAcademicYear, 8)"
            :disabled="!isEditMode" :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.education.currentAcademicYear }}</span>

          ثبت نام نموده و اشتغال به تحصیل دارد .
        </section>

        <section :class="!isSubmitted ? 'leading-12' : 'leading-10'">
          این گواهی جهت ارائه به
          <!-- Recipient -->
          <Input v-if="!isSubmitted" v-model="formData.certificate.recipient" required :highlight="isEditMode"
            class="input" placeholder="نام سازمان" :size="getInputSize(formData.certificate.recipient)"
            :disabled="!isEditMode" :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.certificate.recipient }}</span>

          صادر شده و ارزش دیگری ندارد.
        </section>

        <section :class="!isSubmitted ? 'leading-12' : 'leading-10'">
          اعتبار این گواهی تا تاریخ
          <!-- Validity Date -->
          <Input v-if="!isSubmitted" v-model="formData.certificate.validityDate" required :highlight="isEditMode"
            class="input" placeholder="1404/11/30" :size="getInputSize(formData.certificate.validityDate, 8)"
            :disabled="!isEditMode" :readonly="!isEditMode" />
          <span v-else class="display-value">{{ formData.certificate.validityDate }}</span>

          می باشد .
        </section>
      </section>

      <!-- Description -->
      <section class="mt-4">
        <p class="font-bold text-sm">توضیحات :</p>
        <div v-if="!isSubmitted" class="mt-2">
          <Textarea v-model="formData.description" :disabled="!isEditMode" :readonly="!isEditMode"
            class="min-h-28 resize-none" placeholder="توضیحات را اینجا وارد کنید..." />
        </div>
        <div v-else class="mt-2 min-h-24">
          <p class="text-xs leading-7">{{ formData.description }}</p>
        </div>
      </section>
    </template>

    <!-- Footer Signature -->
    <template #footer>
      <footer class="w-full flex justify-end my-12">
        <div class="text-center">
          <p class="font-medium mb-2 text-sm">{{ formData.signature.title }}</p>
          <p class="font-bold mb-4">{{ formData.signature.name }}</p>
          <p class="text-neutral-400 text-xs border-t border-dashed border-neutral-300 pt-2 w-40 mx-auto">
            (محل امضا و مهر)
          </p>
        </div>
      </footer>
    </template>
  </FormViewLayout>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.input {
  @apply w-auto min-w-0 mx-1 font-bold placeholder:font-medium;
}

.display-value {
  @apply font-bold text-sm mx-1;
}
</style>
