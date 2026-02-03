<script setup lang="ts">
import { computed } from "vue";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import FormViewLayout from "@/components/FormViewLayout.vue";
import { getInputSize } from "@/utils/formUtils";
import type { InternshipFormData } from "@/types/requests/internship";

interface Props {
  isSubmitted: boolean;
  isSubmitting: boolean;
  isFormValid: boolean;
  isPublicView: boolean;
  qrImageSrc?: string;
}

const props = defineProps<Props>();

const localFormData = defineModel<InternshipFormData>("formData", {
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

// Disciplinary status - connected to formData
const disciplinaryCaseValue = computed({
  get: () => (localFormData.value.internship.disciplinarian ? "yes" : "no"),
  set: (value: string) => {
    localFormData.value.internship.disciplinarian = value === "yes";
  },
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
      <header class="flex justify-between items-start mb-16">
        <figure class="w-1/3">
          <img src="@/assets/images/azad-logo.png" alt="Logo" width="50" class="grayscale" />
        </figure>

        <div class="w-1/3 flex flex-col items-center justify-center gap-2">
          <section class="text-center">
            <p class="font-bold text-base mb-1">بنام خدا</p>
            <p class="text-xs">سرمایه گذاری برای تولید</p>
          </section>

          <section class="font-bold text-sm space-y-1 text-center mt-5">
            <h1>{{ localFormData.header.university }} ({{ localFormData.header.city }})</h1>
          </section>
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
    </template>

    <!-- Body Content -->
    <template #body>
      <!-- Recipient and Greeting -->
      <section class="mb-6 text-sm">
        <p class="font-bold mb-3">
          مدیریت محترم
          <!-- Company Name -->
          <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.internship.companyName"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="نام شرکت"
            :size="getInputSize(localFormData.internship.companyName)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          />
          <span v-else class="display-value">{{ localFormData.internship.companyName }}</span>
        </p>

        <p class="font-bold">سلام علیکم</p>
      </section>

      <!-- Body Content -->
      <section class="text-xs font-medium px-2">
        <div :class="!props.isSubmitted ? 'leading-12' : 'leading-10'">
          احتراما بدینوسیله
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
          <span  class="display-value">{{ localFormData.education.field }}</span>

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
          <span  class="display-value">{{ localFormData.education.degreeType }}</span>

          با سیستم آموزش
          <!-- Education System -->
          <!-- <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.education.system"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="تمام وقت"
            :size="getInputSize(localFormData.education.system, 6)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          /> -->
          <span  class="display-value">{{ localFormData.education.system }}</span>

          ورودی
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
          <span  class="display-value">{{ localFormData.education.entryAcademicYear }}</span>

          به شماره دانشجویی
          <!-- Student Code -->
          <span class="display-value">{{ localFormData.student.code }}</span>

          جهت انجام
          <!-- Internship Course -->
          <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.internship.course"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="دوره کارآموزی"
            :size="getInputSize(localFormData.internship.course, 10)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          />
          <span v-else class="display-value">{{ localFormData.internship.course }}</span>

          به مدت
          <!-- Internship Duration -->
          <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.internship.duration"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="زمان به ساعت"
            numeric
            :size="getInputSize(localFormData.internship.duration, 9)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          />
          <span v-else class="display-value">{{ localFormData.internship.duration }}</span>
          ساعت معرفی می نماید.
        </div>

        <div class="leading-10">
          استاد درس کارآموزی ایشان
          <!-- Internship Instructor -->
          <Input
            v-if="!props.isSubmitted"
            v-model="localFormData.internship.instructor"
            required
            :highlight="isEditMode"
            class="input"
            placeholder="نام استاد"
            :size="getInputSize(localFormData.internship.instructor, 6)"
            :disabled="!isEditMode"
            :readonly="!isEditMode"
          />
          <span v-else class="display-value">{{ localFormData.internship.instructor }}</span>

          عضو هیئت علمی این واحد دانشگاهی می باشد.
        </div>

        <section class="leading-10">
          خواهشمند است دستور فرمائید با تعیین سرپرست کارآموزی وی در آن واحد اقدامات مقتضی بعمل آمده
          و در پایان دوره فرم پیوست را تکمیل و در پاکت در بسته به این واحد دانشگاهی ارسال فرمایند.
          در ضمن خاطر نشان می سازد که دانشجوی معرفی شده موظف به اجرای کلیه مقررات انضباطی آن واحد می
          باشد. همکاری ارزنده آن مقام محترم در پذیرش کارآموز و در صورت لزوم اجازه و امکان بازدید
          استاد کارآموزی موجب کمال امتنان و سپاسگزاری است. طبق بخشنامه
          <span class="display-value">47/16000</span>
          مورخ
          <span class="display-value">86/06/15</span>
          کلیه دانشجویان در طول مدت کارآموزی تحت پوشش بیمه حوادث دانشجویی می باشند.
        </section>

        <!-- Internship Location -->
        <div class="border border-neutral-800 p-4 mt-4">
          <section :class="props.isSubmitted ? 'space-y-4' : 'space-y-2'">
            <div>
              آدرس محل کارآموزی:
              <!-- Internship Address -->
              <Textarea
                v-if="!props.isSubmitted"
                v-model="localFormData.internship.address"
                required
                :highlight="isEditMode"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
                class="resize-none font-bold placeholder:font-medium mt-2"
                placeholder="آدرس را اینجا وارد کنید..."
              />
              <span v-else class="display-value">{{ localFormData.internship.address }}</span>
            </div>

            <div>
              کدپستی:
              <!-- Internship Postal Code -->
              <Input
                v-if="!props.isSubmitted"
                v-model="localFormData.internship.postalCode"
                required
                :highlight="isEditMode"
                class="input"
                placeholder="کد پستی"
                numeric
                :size="getInputSize(localFormData.internship.postalCode, 8)"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
              />
              <span v-else class="display-value">{{ localFormData.internship.postalCode }}</span>
            </div>

            <div>
              <!-- Internship Workplace -->
              <Input
                v-if="!props.isSubmitted"
                v-model="localFormData.internship.workplace"
                required
                :highlight="isEditMode"
                class="input"
                placeholder="دپارتمان / واحد"
                :size="getInputSize(localFormData.internship.workplace)"
                :disabled="!isEditMode"
                :readonly="!isEditMode"
              />
              <span v-else class="display-value">{{ localFormData.internship.workplace }}</span>
            </div>
          </section>

          <!-- Disciplinary Status -->
          <section class="flex items-center gap-4 mt-6">
            <span>مورد انضباطی :</span>
            <div v-if="!props.isSubmitted" class="flex items-center gap-4">
              <RadioGroup
                v-model="disciplinaryCaseValue"
                :disabled="!isEditMode"
                class="flex items-center gap-4"
              >
                <div class="flex items-center gap-2">
                  <RadioGroupItem id="disciplinary-yes" value="yes" />
                  <Label for="disciplinary-yes" class="cursor-pointer">دارد</Label>
                </div>
                <div class="flex items-center gap-2">
                  <RadioGroupItem id="disciplinary-no" value="no" />
                  <Label for="disciplinary-no" class="cursor-pointer">ندارد</Label>
                </div>
              </RadioGroup>
            </div>

            <div v-else class="flex items-center gap-4">
              <label
                class="flex items-center gap-2"
                :class="{
                  'bg-neutral-200 py-1 px-2 rounded-md': !localFormData.internship.disciplinarian,
                }"
              >
                <span class="display-value">{{ localFormData.internship.disciplinarian ? "" : "✓" }}</span>
                <span>ندارد</span>
              </label>
              <label
                class="flex items-center gap-2"
                :class="{
                  'bg-neutral-200 py-1 px-2 rounded-md': localFormData.internship.disciplinarian,
                }"
              >
                <span class="display-value">{{ localFormData.internship.disciplinarian ? "✓" : "" }}</span>
                <span>دارد</span>
              </label>
            </div>
          </section>
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
