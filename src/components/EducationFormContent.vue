<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormViewLayout from "@/components/FormViewLayout.vue";
import { getInputSize } from "@/utils/formUtils";
import { Icon } from "@iconify/vue";
import DatePicker from "@/components/DatePicker.vue";
import type { EducationFormData } from "@/types/requests/education";

interface Props {
  isSubmitted: boolean;
  isSubmitting: boolean;
  isFormValid: boolean;
  isPublicView: boolean;
  qrImageSrc?: string;
}

const props = defineProps<Props>();

// Local proxy to allow v-model bindings for form data (required)
const localFormData = defineModel<EducationFormData>("formData", {
  required: true,
});

const emit = defineEmits<{
  submit: [];
  edit: [];
  print: [];
}>();

const isEditMode = defineModel<boolean>("isEditMode", {
  default: false,
});

function handleSubmit() {
  emit("submit");
}

function handleEdit() {
  emit("edit");
}

function handlePrint() {
  emit("print");
}
</script>

<template>
  <FormViewLayout
    v-model:is-edit-mode="isEditMode"
    :is-submitted="props.isSubmitted"
    :is-submitting="props.isSubmitting"
    :is-form-valid="props.isFormValid"
    :show-edit-button="!props.isPublicView"
    :qr-image-src="props.qrImageSrc"
    @submit="handleSubmit"
    @edit="handleEdit"
    @print="handlePrint"
  >
    <!-- Header -->
    <template #header>
      <header class="flex justify-between items-start mb-6">
        <div class="text-right w-1/3 font-bold text-sm space-y-1">
          <h1>{{ localFormData.header.university }}</h1>
          <h2>{{ localFormData.header.city }}</h2>
        </div>

        <div class="w-1/3 flex flex-col items-center justify-center">
          <img src="@/assets/images/azad-logo.png" alt="Logo" width="60" class="grayscale" />
        </div>

        <div class="text-left w-1/3 text-xs space-y-1 *:flex *:justify-end *:gap-2 *:items-center">
          <div>
            <strong>تاریخ:</strong>
            <span>{{ localFormData.header.date }}</span>
          </div>

          <div>
            <strong>شماره:</strong>
            <span dir="ltr">{{ localFormData.header.number }}</span>
          </div>

          <div>
            <strong>پیوست:</strong>
            <span>{{ localFormData.header.attachment }}</span>
          </div>
        </div>
      </header>

      <!-- Student Info Section -->
      <section class="relative w-full flex justify-between items-start">
        <div class="flex items-center gap-2 justify-start w-1/3 text-sm">
          <strong>کد دانشجو :</strong>
          <span>{{ localFormData.student.code }}</span>
        </div>

        <div class="text-center w-1/3">
          <span class="font-bold">باسمه تعالی</span>
        </div>

        <div class="w-1/3 flex justify-end">
          <figure class="border w-[30mm] h-[40mm] border-neutral-400 p-1 bg-white grayscale">
            <!-- <img :src="props.formData.student.photoUrl" alt="Student Photo" class="object-cover w-full h-full" /> -->
            <div class="w-full h-full bg-neutral-700 flex-center">
              <Icon
                icon="material-symbols:person-rounded"
                class="text-white"
                width="60"
                height="60"
              />
            </div>
          </figure>
        </div>
      </section>
    </template>

    <!-- Body Content -->
    <template #body>
      <section class="text-xs font-medium px-2">
        <p class="font-bold text-sm mb-4">گواهی می شود :</p>

        <section :class="'leading-10'">
          آقای / خانم
          <!-- Fullname -->
          <!-- <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.student.fullName"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="نام و نام خانوادگی"
            :size="getInputSize(localFormData.student.fullName)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          /> -->
          <span class="display-value">{{ localFormData.student.fullName }}</span>

          فرزند
          <!-- Father Name -->
          <!-- <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.student.fatherName"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="نام پدر"
            :size="getInputSize(localFormData.student.fatherName, 5)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          /> -->
          <span class="display-value">{{ localFormData.student.fatherName }}</span>

          شماره شناسنامه
          <!-- ID Number -->
          <!-- <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.student.idNumber"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="شماره شناسنامه"
            maxlength="10"
            numeric
            :size="getInputSize(localFormData.student.idNumber, 10)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          /> -->
          <span class="display-value">{{ localFormData.student.idNumber }}</span>

          صادره از
          <!-- Birth Place -->
          <!-- <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.student.birthPlace"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="محل تولد"
            :size="getInputSize(localFormData.student.birthPlace, 5)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          /> -->
          <span class="display-value">{{ localFormData.student.birthPlace }}</span>

          متولد
          <!-- Birth Year -->
          <!-- <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.student.birthDate"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="سال تولد"
            :size="getInputSize(localFormData.student.birthDate, 5)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          /> -->
          <span class="display-value">{{ localFormData.student.birthDate }}</span>

          دانشجوی رشته
          <!-- Education Field -->
          <!-- <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.education.field"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="رشته تحصیلی"
            :size="getInputSize(localFormData.education.field, 10)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          /> -->
          <span class="display-value">{{ localFormData.education.field }}</span>

          ورودی نیمسال
          <!-- Entry Semester -->
          <!-- <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.education.entrySemester"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="اول"
            :size="getInputSize(localFormData.education.entrySemester, 3)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          /> -->
          <span class="display-value">{{ localFormData.education.entrySemester }}</span>

          سال تحصیلی
          <!-- Entry Academic Year -->
          <!-- <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.education.entryAcademicYear"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="1402-1403"
            :size="getInputSize(localFormData.education.entryAcademicYear, 8)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          /> -->
          <span class="display-value">{{ localFormData.education.entryAcademicYear }}</span>

          مقطع
          <!-- Degree Type -->
          <!-- <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.education.degreeType"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="مقطع تحصیلی"
            :size="getInputSize(localFormData.education.degreeType, 10)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          /> -->
          <span class="display-value">{{ localFormData.education.degreeType }}</span>

          شیوه آموزش
          <!-- Education Method -->
          <!-- <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.education.method"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="پاره وقت"
            :size="getInputSize(localFormData.education.method, 6)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          /> -->
          <span class="display-value">{{ localFormData.education.method }}</span>

          در این واحد دانشگاهی می باشد.
        </section>

        <section :class="!props.isSubmitted ? 'leading-12' : 'leading-10'">
          نامبرده در نیمسال
          <!-- Current Semester -->
          <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.education.currentSemester"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="دوم"
            :size="getInputSize(localFormData.education.currentSemester, 3)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          />
          <span v-else class="display-value">{{ localFormData.education.currentSemester }}</span>

          سال تحصیلی
          <!-- Current Academic Year -->
          <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.education.currentAcademicYear"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="1404-1405"
            :size="getInputSize(localFormData.education.currentAcademicYear, 8)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          />
          <span v-else class="display-value">{{
            localFormData.education.currentAcademicYear
          }}</span>

          ثبت نام نموده و اشتغال به تحصیل دارد .
        </section>

        <section :class="!props.isSubmitted ? 'leading-12' : 'leading-10'">
          این گواهی جهت ارائه به
          <!-- Recipient -->
          <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.certificate.recipient"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="نام سازمان"
            :size="getInputSize(localFormData.certificate.recipient)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          />
          <span v-else class="display-value">{{ localFormData.certificate.recipient }}</span>

          صادر شده و ارزش دیگری ندارد.
        </section>

        <section :class="['flex items-center flex-wrap gap-1.5', !props.isSubmitted ? 'leading-12' : 'leading-10']">
          اعتبار این گواهی تا تاریخ
          <!-- Validity Date -->
          <DatePicker
            v-if="!props.isSubmitted"
            v-model:date="localFormData.certificate.validityDate"
            :highlight="isEditMode"
            trigger-class="font-bold rounded-md w-[180px]"
            trigger-placeholder-class="font-medium text-muted-foreground/60"
          />
          <span v-else class="display-value">{{ localFormData.certificate.validityDate }}</span>

          می باشد .
        </section>
      </section>

      <!-- Description -->
      <section class="mt-4">
        <p class="font-bold text-sm">توضیحات :</p>
        <div v-if="!props.isSubmitted" class="mt-2">
          <Textarea
            v-model="localFormData.description"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
            class="min-h-28 resize-none"
            placeholder="توضیحات را اینجا وارد کنید..."
          />
        </div>
        <div v-else class="mt-2 min-h-24">
          <p class="text-xs leading-7">{{ localFormData.description }}</p>
        </div>
      </section>
    </template>

    <!-- Footer Signature -->
    <template #footer>
      <footer class="w-full flex justify-end my-12">
        <div class="text-center">
          <p class="font-medium mb-2 text-sm">{{ localFormData.signature.title }}</p>
          <p class="font-bold mb-4">{{ localFormData.signature.name }}</p>
          <p
            class="text-neutral-400 text-xs border-t border-dashed border-neutral-300 pt-2 w-40 mx-auto"
          >
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
